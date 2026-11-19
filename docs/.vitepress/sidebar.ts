import fs from 'node:fs'
import path from 'node:path'
import type { DefaultTheme } from 'vitepress'
import { COURSE_PARTS, OTHER_PART } from './parts'

export interface LessonFile {
  num: number
  filename: string
  slug: string
  title: string
}

const LESSON_NAME = /^(\d+)-(.+)\.md$/

export function lessonsDir(): string {
  const dir = path.resolve(process.cwd(), 'docs/lessons')
  if (!fs.existsSync(dir)) {
    throw new Error(
      `找不到 ${dir}。請在倉庫根目錄執行 npm run docs:dev 或 npm run docs:build。`
    )
  }
  return dir
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function titleFromMarkdown(raw: string, fallback: string): string {
  const withoutFrontmatter = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
  const frontmatter = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  const frontmatterTitle = frontmatter?.[1].match(/^title:\s*(.+)\s*$/m)?.[1]
  const rawTitle = frontmatterTitle
    ? frontmatterTitle.replace(/^['"]|['"]$/g, '').trim()
    : withoutFrontmatter.match(/^#\s+(.+)\s*$/m)?.[1]?.trim()
  return escapeHtml(rawTitle || fallback)
}

export function readLessons(): LessonFile[] {
  return fs
    .readdirSync(lessonsDir())
    .map((filename) => {
      const match = filename.match(LESSON_NAME)
      if (!match) return null
      const num = Number(match[1])
      if (!Number.isInteger(num)) return null
      const raw = fs.readFileSync(path.join(lessonsDir(), filename), 'utf8')
      const slug = match[2]
      return {
        num,
        filename,
        slug,
        title: titleFromMarkdown(raw, `第 ${num} 堂`)
      }
    })
    .filter((lesson): lesson is LessonFile => lesson !== null)
    .sort((a, b) => a.num - b.num || a.filename.localeCompare(b.filename))
}

function toItem(lesson: LessonFile): DefaultTheme.SidebarItem {
  return {
    text: lesson.title,
    link: `/lessons/${lesson.filename.replace(/\.md$/, '')}`
  }
}

export function lessonSidebar(): DefaultTheme.SidebarItem[] {
  const lessons = readLessons()
  const groups: DefaultTheme.SidebarItem[] = COURSE_PARTS.map((part) => {
    const items = lessons
      .filter((lesson) => lesson.num >= part.min && lesson.num <= part.max)
      .map(toItem)
    return {
      text: part.text,
      collapsed: items.length === 0,
      items
    }
  })

  const extras = lessons
    .filter((lesson) => !COURSE_PARTS.some((part) => lesson.num >= part.min && lesson.num <= part.max))
    .map(toItem)
  if (extras.length > 0) {
    groups.push({ text: OTHER_PART, collapsed: false, items: extras })
  }
  return groups
}
