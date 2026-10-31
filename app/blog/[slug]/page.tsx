import { getPostData, getSortedPostsData } from "@/lib/blog";
import { blogInfo, profileInfo, studioNav } from "@/data/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Clock,
  Sparkles,
  User,
} from "lucide-react";

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const postData = await getPostData(resolvedParams.slug);

  if (!postData) {
    return {
      title: "Article introuvable",
    };
  }

  return {
    title: `${postData.title} | ${profileInfo.fullName}`,
    description: postData.description,
  };
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const postData = await getPostData(resolvedParams.slug);

  if (!postData) {
    notFound();
  }

  const otherPosts = getSortedPostsData()
    .filter((post) => post.slug !== postData.slug)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-[#f4eee4] text-[#2c2822] [font-family:var(--font-urbanist),sans-serif] selection:bg-[#ff8a1e]/40">
      {/* Navigation Flottante Studio */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 bg-[#f4eee4]/90 px-4 py-3 backdrop-blur-md md:bg-transparent md:px-8 md:pt-5 md:backdrop-blur-none">
        <div className="mx-auto flex max-w-295 flex-wrap items-center justify-between gap-2">
          <Link
            href="/blog"
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-[#e2d6c1] bg-[#efe6d6]/95 px-4 py-2 text-xs font-extrabold text-[#2c2822] shadow-xs backdrop-blur-md transition hover:bg-[#e4d8c4] focus-visible:ring-2 focus-visible:ring-[#2c2822] focus-visible:ring-offset-2 md:text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{blogInfo.backToBlogLabel}</span>
          </Link>

          <nav
            aria-label="Navigation principale"
            className="pointer-events-auto order-3 basis-full overflow-x-auto rounded-full border border-[#e2d6c1] bg-[#efe6d6]/95 p-1 shadow-xs backdrop-blur-md scrollbar-none [&::-webkit-scrollbar]:hidden md:order-0 md:basis-auto"
          >
            <ul className="flex items-center justify-between gap-0.5 sm:gap-1 md:justify-center">
              {studioNav.map((item) => (
                <li key={item.id} className="shrink-0 flex-1 md:flex-initial">
                  <Link
                    href={`/#${item.id}`}
                    className="block w-full whitespace-nowrap rounded-full px-2.5 py-1.5 text-center text-xs font-bold tracking-wide text-[#2c2822] transition hover:bg-[#e4d8c4] focus-visible:ring-2 focus-visible:ring-[#2c2822] focus-visible:ring-offset-2 sm:px-3.5 sm:text-[13px] md:px-4 md:py-2 md:text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="shrink-0 flex-1 md:flex-initial">
                <Link
                  href="/blog"
                  aria-current="page"
                  className="block w-full whitespace-nowrap rounded-full bg-[#12356e] px-2.5 py-1.5 text-center text-xs font-bold tracking-wide text-[#f4eee4] transition focus-visible:ring-2 focus-visible:ring-[#2c2822] focus-visible:ring-offset-2 sm:px-3.5 sm:text-[13px] md:px-4 md:py-2 md:text-sm"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </nav>

          <Link
            href="/#contact"
            className="pointer-events-auto ml-auto rounded-full bg-[#ff8a1e] px-4 py-2 text-xs font-extrabold text-[#2c2822] shadow-xs transition hover:bg-[#ff9d42] focus-visible:ring-2 focus-visible:ring-[#2c2822] focus-visible:ring-offset-2 md:ml-0 md:px-5 md:py-2.5 md:text-sm"
          >
            {profileInfo.ctaLabel}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-230 px-5 pb-20 pt-32 md:px-10 md:pt-36">
        <article>
          {/* En-tête de l'article */}
          <header className="border-b border-[#d9cdb8] pb-10">
            {postData.tags && postData.tags.length > 0 && (
              <div className="mb-5 flex flex-wrap gap-2">
                {postData.tags.map((tag, index) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className={`rounded-full px-3.5 py-1 text-xs font-extrabold tracking-wide transition ${
                      index === 0
                        ? "bg-[#12356e] text-[#f4eee4]"
                        : "border border-[#dfd3be] bg-[#efe6d6] text-[#5c5348] hover:bg-[#e4d8c4]"
                    }`}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            <h1 className="text-[clamp(2.2rem,5vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-[#2c2822]">
              {postData.title}
            </h1>

            {postData.description && (
              <p className="mt-4 max-w-[62ch] text-lg font-medium leading-relaxed text-[#5c5348] md:text-xl">
                {postData.description}
              </p>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-[#e2d6c1] bg-[#efe6d6]/70 px-5 py-3.5 text-xs font-bold text-[#5c5348] md:text-sm">
              <div className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#12356e]" />
                <time dateTime={postData.date}>
                  {new Date(postData.date).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </div>

              {postData.readingTime && (
                <div className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#12356e]" />
                  <span>{postData.readingTime}</span>
                </div>
              )}

              <div className="inline-flex items-center gap-2">
                <User className="h-4 w-4 text-[#12356e]" />
                <span>{postData.author || profileInfo.fullName}</span>
              </div>
            </div>
          </header>

          {/* Contenu Markdown stylé Studio Papier */}
          <div
            className="prose prose-lg mt-10 max-w-none
              prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-[#2c2822]
              prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:text-[#12356e]
              prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-xl md:prose-h3:text-2xl
              prose-p:leading-relaxed prose-p:text-[#2c2822]/90 prose-p:font-medium
              prose-strong:font-extrabold prose-strong:text-[#2c2822]
              prose-a:font-bold prose-a:text-[#12356e] prose-a:underline prose-a:decoration-[#ff8a1e] prose-a:decoration-2 prose-a:underline-offset-4 hover:prose-a:text-[#0c244d]
              prose-code:rounded-md prose-code:bg-[#efe6d6] prose-code:px-1.5 prose-code:py-0.5 prose-code:font-bold prose-code:text-[#12356e] prose-code:before:content-none prose-code:after:content-none
              prose-pre:rounded-[22px] prose-pre:border prose-pre:border-[#0c244d] prose-pre:bg-[#0c244d] prose-pre:p-6 prose-pre:text-[#e7eef8] [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:font-normal [&_pre_code]:text-[#e7eef8]
              prose-blockquote:rounded-2xl prose-blockquote:border prose-blockquote:border-[#dfd3be] prose-blockquote:bg-[#efe6d6]/80 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:font-semibold prose-blockquote:not-italic prose-blockquote:text-[#2c2822]
              prose-li:font-medium prose-li:text-[#2c2822]/90 prose-li:marker:text-[#12356e]
              prose-hr:border-[#d9cdb8]
              prose-img:rounded-3xl"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml || "" }}
          />
        </article>

        {/* CTA Scène Navy en bas d'article */}
        <section className="mt-16 overflow-hidden rounded-4xl bg-[#12356e] p-7 text-[#e7eef8] md:p-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#ff8a1e] text-[#2c2822]">
                <Sparkles className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-[#f4eee4] md:text-3xl">
                {blogInfo.ctaTitle}
              </h2>
              <p className="mt-1.5 max-w-[46ch] text-sm font-medium text-[#c5d6ee] md:text-base">
                {blogInfo.ctaSubtitle}
              </p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[#ff8a1e] px-6 py-3.5 text-sm font-extrabold text-[#2c2822] transition hover:bg-[#ff9d42] md:self-center"
            >
              <span>{profileInfo.projectCtaTitle}</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Autres articles */}
        {otherPosts.length > 0 && (
          <section className="mt-16 border-t border-[#d9cdb8] pt-12">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-extrabold tracking-tight">
                Continuer la lecture
              </h2>
              <Link
                href="/blog"
                className="text-sm font-extrabold text-[#12356e] underline decoration-[#ff8a1e] decoration-2 underline-offset-4"
              >
                {blogInfo.backToBlogLabel}
              </Link>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {otherPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col justify-between rounded-3xl border border-[#e2d6c1] bg-[#efe6d6]/75 p-6 transition hover:-translate-y-0.5 hover:bg-[#efe6d6]"
                >
                  <div>
                    <p className="text-xs font-bold text-[#5c5348]">
                      {post.readingTime}
                    </p>
                    <h3 className="mt-2 text-lg font-extrabold leading-snug text-[#2c2822] group-hover:text-[#12356e]">
                      {post.title}
                    </h3>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-extrabold text-[#12356e]">
                    <span>Lire</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="px-5 pb-10 md:px-10">
        <div className="mx-auto flex max-w-295 flex-col items-start justify-between gap-4 border-t border-[#d9cdb8] pt-6 sm:flex-row sm:items-center">
          <p className="text-sm font-semibold text-[#5c5348]">
            © {new Date().getFullYear()} {profileInfo.fullName} ·{" "}
            {profileInfo.location}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/blog"
              className="text-sm font-extrabold underline-offset-4 hover:underline"
            >
              {blogInfo.backToBlogLabel}
            </Link>
            <Link
              href="/"
              className="rounded-full bg-[#efe6d6] px-4 py-2 text-xs font-extrabold text-[#2c2822] transition hover:bg-[#e4d8c4]"
            >
              {blogInfo.backToHomeLabel}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
