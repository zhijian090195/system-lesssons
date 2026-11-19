import { createContentLoader } from 'vitepress'

export interface PublishedLesson {
  num: number
  title: string
  url: string
}

function lessonTitle(
  src: string | undefined,
  frontmatter: Record<string, unknown>,
  fallback: string
): string {
  const fromFrontmatter = frontmatter.title
  if (typeof fromFrontmatter === 'string' && fromFrontmatter.trim()) {
    return fromFrontmatter.trim().replace(/^['"]|['"]$/g, '')
  }
  const heading = src?.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').match(/^#\s+(.+)\s*$/m)
  return heading?.[1]?.trim() || fallback
}

export default createContentLoader('lessons/*.md', {
  includeSrc: true,
  render: false,
  transform(raw): PublishedLesson[] {
    return raw
      .map((page) => {
        const slug = page.url.split('/').filter(Boolean).pop() ?? ''
        const num = Number(slug.match(/^(\d+)/)?.[1])
        return {
          num,
          title: lessonTitle(page.src, page.frontmatter, slug),
          url: page.url
        }
      })
      .filter((lesson) => Number.isInteger(lesson.num))
      .sort((a, b) => a.num - b.num || a.url.localeCompare(b.url))
  }
})
