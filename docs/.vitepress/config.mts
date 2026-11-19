import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { lessonSidebar, lessonsDir } from './sidebar'
import { transformDetails } from './details'

const fontFamily =
  '"PingFang TC", "Noto Sans TC", "Noto Sans CJK TC", "Microsoft JhengHei", sans-serif'

export default withMermaid(
  defineConfig({
    lang: 'zh-TW',
    title: '電腦系統底層',
    description: '從作業系統、網路、資料庫、共識到平行運算，由下往上的 60 堂課。',
    base: '/system-lesssons/',
    cleanUrls: true,
    lastUpdated: false,
    mermaid: {
      fontFamily,
      securityLevel: 'strict'
    },
    markdown: {
      config(md) {
        md.core.ruler.before('normalize', 'lesson_details', (state) => {
          state.src = transformDetails(state.src)
        })
      }
    },
    themeConfig: {
      nav: [{ text: '課程', link: '/lessons/01-process-thread' }],
      sidebar: lessonSidebar(),
      outline: {
        label: '本頁大綱',
        level: [2, 3]
      },
      docFooter: {
        prev: '上一堂',
        next: '下一堂'
      },
      sidebarMenuLabel: '課程目錄',
      returnToTopLabel: '回到頂部',
      darkModeSwitchLabel: '外觀',
      lightModeSwitchTitle: '切換到淺色',
      darkModeSwitchTitle: '切換到深色',
      codeCopyButtonTitle: '複製程式碼',
      search: {
        provider: 'local',
        options: {
          translations: {
            button: {
              buttonText: '搜尋',
              buttonAriaLabel: '搜尋'
            },
            modal: {
              noResultsText: '沒有符合的結果',
              resetButtonTitle: '清除搜尋',
              footer: {
                selectText: '選擇',
                navigateText: '移動',
                closeText: '關閉'
              }
            }
          }
        }
      },
      socialLinks: [
        { icon: 'github', link: 'https://github.com/zhijian090195/system-lesssons' }
      ]
    },
    vite: {
      plugins: [
        {
          name: 'reload-on-lesson-files',
          configureServer(server) {
            const dir = lessonsDir()
            server.watcher.add(dir)
            const restart = (file: string) => {
              if (file.startsWith(dir) && file.endsWith('.md')) server.restart()
            }
            server.watcher.on('add', restart)
            server.watcher.on('unlink', restart)
          }
        }
      ]
    }
  })
)
