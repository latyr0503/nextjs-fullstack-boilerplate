import Link from "next/link";
import { getSortedPostsData } from "@/lib/blog";
import { blogInfo, profileInfo, studioNav } from "@/data/data";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: `${blogInfo.title} | ${profileInfo.fullName}`,
  description: blogInfo.description,
};

export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const selectedTag =
    typeof resolvedSearchParams.tag === "string"
      ? resolvedSearchParams.tag
      : undefined;
  const itemsPerPage = 12;

  const allPostsData = getSortedPostsData();

  const allTags = Array.from(
    new Set(allPostsData.flatMap((post) => post.tags ?? [])),
  );

  const filteredPosts = selectedTag
    ? allPostsData.filter((post) => post.tags?.includes(selectedTag))
    : allPostsData;

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage) || 1;
  const validPage = Math.max(1, Math.min(currentPage, totalPages));

  const currentPosts = filteredPosts.slice(
    (validPage - 1) * itemsPerPage,
    validPage * itemsPerPage,
  );

  const showFeatured = validPage === 1 && !selectedTag;
  const featuredPost = showFeatured ? (currentPosts[0] ?? null) : null;
  const gridPosts = showFeatured ? currentPosts.slice(1) : currentPosts;

  return (
    <div className="min-h-screen bg-[#f4eee4] text-[#2c2822] [font-family:var(--font-urbanist),sans-serif] selection:bg-[#ff8a1e]/40">
      {/* Navigation Flottante Studio */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 bg-[#f4eee4]/90 px-4 py-3 backdrop-blur-md md:bg-transparent md:px-8 md:pt-5 md:backdrop-blur-none">
        <div className="mx-auto flex max-w-295 flex-wrap items-center justify-between gap-2">
          <Link
            href="/"
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-[#e2d6c1] bg-[#efe6d6]/95 px-4 py-2 text-xs font-extrabold text-[#2c2822] shadow-xs backdrop-blur-md transition hover:bg-[#e4d8c4] focus-visible:ring-2 focus-visible:ring-[#2c2822] focus-visible:ring-offset-2 md:text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{blogInfo.backToHomeLabel}</span>
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

      <main className="mx-auto max-w-295 px-5 pb-20 pt-32 md:px-10 md:pt-36">
        {/* En-tête du blog */}
        <div className="flex flex-col justify-between gap-6 border-b border-[#d9cdb8] pb-10 md:flex-row md:items-end">
          <div>
            <p className="inline-block -rotate-2 rounded-md bg-[#12356e] px-2.5 py-1 text-xs font-extrabold tracking-[0.14em] text-[#f4eee4]">
              {blogInfo.badge}
            </p>
            <h1 className="mt-4 text-[clamp(2.8rem,6vw,5.2rem)] font-extrabold leading-[0.92] tracking-[-0.035em]">
              {blogInfo.title}
            </h1>
          </div>
          <p className="max-w-[44ch] text-base font-medium leading-relaxed text-[#5c5348] md:text-lg">
            {blogInfo.description}
          </p>
        </div>

        {/* Filtres par tag */}
        {allTags.length > 0 && (
          <div
            aria-label="Filtrer par sujet"
            className="mt-8 flex flex-wrap items-center gap-2"
          >
            <Link
              href="/blog"
              className={`rounded-full px-4 py-2 text-xs font-extrabold transition focus-visible:ring-2 focus-visible:ring-[#2c2822] focus-visible:ring-offset-2 md:text-sm ${
                !selectedTag
                  ? "bg-[#12356e] text-[#f4eee4]"
                  : "bg-[#efe6d6] text-[#2c2822] hover:bg-[#e4d8c4]"
              }`}
            >
              Tous ({allPostsData.length})
            </Link>
            {allTags.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <Link
                  key={tag}
                  href={
                    isSelected
                      ? "/blog"
                      : `/blog?tag=${encodeURIComponent(tag)}`
                  }
                  className={`rounded-full px-4 py-2 text-xs font-extrabold transition focus-visible:ring-2 focus-visible:ring-[#2c2822] focus-visible:ring-offset-2 md:text-sm ${
                    isSelected
                      ? "bg-[#12356e] text-[#f4eee4]"
                      : "bg-[#efe6d6] text-[#2c2822] hover:bg-[#e4d8c4]"
                  }`}
                >
                  {tag}
                </Link>
              );
            })}
          </div>
        )}

        {/* Article à la une (scène navy comme la section À propos) */}
        {featuredPost && (
          <section className="mt-10">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block overflow-hidden rounded-4xl bg-[#12356e] p-7 text-[#e7eef8] transition hover:bg-[#0c244d] focus-visible:ring-2 focus-visible:ring-[#2c2822] focus-visible:ring-offset-4 md:p-11"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="inline-block -rotate-2 rounded-md bg-[#ff8a1e] px-2.5 py-1 text-xs font-extrabold tracking-[0.14em] text-[#2c2822]">
                  DERNIER ARTICLE
                </span>
                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[#c5d6ee]">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <time dateTime={featuredPost.date}>
                      {new Date(featuredPost.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                  </span>
                  {featuredPost.readingTime && (
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{featuredPost.readingTime}</span>
                    </span>
                  )}
                </div>
              </div>

              <h2 className="mt-5 max-w-[32ch] text-[clamp(1.8rem,3.4vw,2.9rem)] font-extrabold leading-[1.08] tracking-tight text-[#f4eee4]">
                {featuredPost.title}
              </h2>

              <p className="mt-3 max-w-[66ch] text-base font-medium leading-relaxed text-[#d5e2f4] md:text-lg">
                {featuredPost.description}
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                <div className="flex flex-wrap gap-2">
                  {featuredPost.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#0c244d] px-3 py-1 text-xs font-bold text-[#e7eef8]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#ff8a1e] px-4 py-2 text-xs font-extrabold text-[#2c2822] transition group-hover:bg-[#ff9d42] md:text-sm">
                  <span>Lire l&apos;article</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </section>
        )}

        {/* Grille des autres articles */}
        {gridPosts.length > 0 && (
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {gridPosts.map(
              ({ slug, title, description, date, tags, readingTime }) => (
                <Link
                  href={`/blog/${slug}`}
                  key={slug}
                  className="group block h-full rounded-[28px] focus-visible:ring-2 focus-visible:ring-[#2c2822] focus-visible:ring-offset-4"
                >
                  <article className="flex h-full flex-col justify-between rounded-[28px] border border-[#e2d6c1] bg-[#efe6d6]/75 p-7 transition hover:-translate-y-0.5 hover:border-[#2c2822]/40 hover:bg-[#efe6d6] md:p-8">
                    <div>
                      <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[#5c5348]">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          <time dateTime={date}>
                            {new Date(date).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </time>
                        </span>
                        {readingTime && (
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{readingTime}</span>
                          </span>
                        )}
                      </div>

                      <h2 className="mt-4 text-2xl font-extrabold leading-snug tracking-tight text-[#2c2822] transition-colors group-hover:text-[#12356e]">
                        {title}
                      </h2>

                      <p className="mt-2.5 line-clamp-3 text-sm font-medium leading-relaxed text-[#5c5348] md:text-base">
                        {description}
                      </p>
                    </div>

                    <div className="mt-7 flex items-center justify-between gap-3 border-t border-[#dfd3be] pt-5">
                      <div className="flex flex-wrap gap-1.5">
                        {tags?.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-[#dfd3be] bg-[#f4eee4] px-3 py-1 text-xs font-bold text-[#5c5348]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f4eee4] text-[#2c2822] transition group-hover:bg-[#12356e] group-hover:text-[#f4eee4]">
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </article>
                </Link>
              ),
            )}

            {/* Carte CTA Contact dans la grille */}
            <Link
              href="/#contact"
              className="group flex min-h-65 flex-col justify-between rounded-[28px] bg-[#12356e] p-7 text-left text-[#f4eee4] transition hover:bg-[#0c244d] focus-visible:ring-2 focus-visible:ring-[#2c2822] focus-visible:ring-offset-4 md:p-8"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#ff8a1e] text-[#2c2822] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <Sparkles className="h-5 w-5" />
              </span>
              <div className="mt-6">
                <span className="block text-2xl font-extrabold tracking-tight md:text-3xl">
                  {blogInfo.ctaTitle}
                </span>
                <span className="mt-2 block max-w-[34ch] text-sm font-semibold text-[#c5d6ee]">
                  {blogInfo.ctaSubtitle}
                </span>
              </div>
            </Link>
          </div>
        )}

        {filteredPosts.length === 0 && (
          <div className="mt-12 rounded-[28px] border border-dashed border-[#d9cdb8] bg-[#efe6d6]/50 py-20 text-center">
            <p className="text-base font-bold text-[#5c5348]">
              {blogInfo.emptyMessage}
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-14 flex items-center justify-center gap-2">
            {validPage > 1 ? (
              <Link
                href={`/blog?page=${validPage - 1}${selectedTag ? `&tag=${encodeURIComponent(selectedTag)}` : ""}`}
                className="grid h-10 w-10 place-items-center rounded-full bg-[#efe6d6] text-[#2c2822] transition hover:bg-[#e4d8c4]"
                aria-label="Page précédente"
              >
                <ChevronLeft className="h-5 w-5" />
              </Link>
            ) : (
              <div className="grid h-10 w-10 cursor-not-allowed place-items-center rounded-full bg-[#efe6d6]/40 text-[#5c5348]/40">
                <ChevronLeft className="h-5 w-5" />
              </div>
            )}

            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                const isActivePage = validPage === pageNum;
                return (
                  <Link
                    key={pageNum}
                    href={`/blog?page=${pageNum}${selectedTag ? `&tag=${encodeURIComponent(selectedTag)}` : ""}`}
                    className={`grid h-10 w-10 place-items-center rounded-full text-sm font-extrabold transition ${
                      isActivePage
                        ? "bg-[#12356e] text-[#f4eee4]"
                        : "bg-[#efe6d6] text-[#2c2822] hover:bg-[#e4d8c4]"
                    }`}
                  >
                    {pageNum}
                  </Link>
                );
              })}
            </div>

            {validPage < totalPages ? (
              <Link
                href={`/blog?page=${validPage + 1}${selectedTag ? `&tag=${encodeURIComponent(selectedTag)}` : ""}`}
                className="grid h-10 w-10 place-items-center rounded-full bg-[#efe6d6] text-[#2c2822] transition hover:bg-[#e4d8c4]"
                aria-label="Page suivante"
              >
                <ChevronRight className="h-5 w-5" />
              </Link>
            ) : (
              <div className="grid h-10 w-10 cursor-not-allowed place-items-center rounded-full bg-[#efe6d6]/40 text-[#5c5348]/40">
                <ChevronRight className="h-5 w-5" />
              </div>
            )}
          </div>
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
              href="/"
              className="text-sm font-extrabold underline-offset-4 hover:underline"
            >
              {blogInfo.backToHomeLabel}
            </Link>
            <Link
              href="/#contact"
              className="rounded-full bg-[#efe6d6] px-4 py-2 text-xs font-extrabold text-[#2c2822] transition hover:bg-[#e4d8c4]"
            >
              {profileInfo.ctaLabel}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
