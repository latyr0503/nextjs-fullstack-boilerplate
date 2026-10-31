import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'data/blog');

export interface BlogPostData {
  slug: string;
  title: string;
  description: string;
  date: string;
  author?: string;
  tags?: string[];
  contentHtml?: string;
  readingTime?: string;
}

function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const noOfWords = text.split(/\s/g).length;
  const minutes = Math.ceil(noOfWords / wordsPerMinute);
  return `${minutes} min de lecture`;
}

export function getSortedPostsData(): BlogPostData[] {
  // Get file names under /data/blog
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      // Remove ".md" from file name to get slug
      // If the file specifies a slug in its frontmatter, we'll use that instead
      const fileSlug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the slug
      return {
        slug: matterResult.data.slug || fileSlug,
        readingTime: calculateReadingTime(matterResult.content),
        ...(matterResult.data as { title: string; description: string; date: string; author?: string; tags?: string[] })
      };
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(slug: string): Promise<BlogPostData | null> {
  // Try to find the file matching the slug
  // We need to read all files since the slug might be defined in the frontmatter instead of the filename
  const fileNames = fs.readdirSync(postsDirectory);
  let targetFileName = `${slug}.md`;
  
  // First try direct filename match
  if (!fileNames.includes(targetFileName)) {
    // If not found, check frontmatter of all files
    const matchedFile = fileNames.find(fileName => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      return matterResult.data.slug === slug;
    });
    
    if (matchedFile) {
      targetFileName = matchedFile;
    } else {
      return null;
    }
  }

  const fullPath = path.join(postsDirectory, targetFileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string with sanitization
  const processedContent = await remark()
    .use(html, { sanitize: true })
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the slug and contentHtml
  return {
    slug: matterResult.data.slug || slug,
    contentHtml,
    readingTime: calculateReadingTime(matterResult.content),
    ...(matterResult.data as { title: string; description: string; date: string; author?: string; tags?: string[] })
  };
}
