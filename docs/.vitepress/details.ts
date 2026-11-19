/**
 * 把課文裡的 <details> 轉成 VitePress 的 ::: details 容器，
 * 讓裡面的清單、表格和程式碼照常被解析，外觀沿用主題樣式。
 * 圍欄程式碼區塊裡的 <details> 不會被改寫。
 */
export function transformDetails(src: string): string {
  const lines = src.split('\n')
  const out: string[] = []
  let fence: string | null = null

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const fenceMark = line.match(/^\s*(`{3,}|~{3,})/)
    if (fenceMark) {
      const marker = fenceMark[1][0]
      fence = fence === marker ? null : fence ?? marker
      out.push(line)
      continue
    }
    if (fence || !/^\s*<details[\s>]/.test(line)) {
      out.push(line)
      continue
    }

    const block: string[] = [line]
    let closed = /<\/details>/.test(line)
    while (!closed && i + 1 < lines.length) {
      i++
      block.push(lines[i])
      if (/<\/details>/.test(lines[i])) closed = true
    }
    if (!closed) {
      out.push(...block)
      continue
    }

    const raw = block.join('\n')
    const summary = raw.match(/<summary>([\s\S]*?)<\/summary>/)?.[1]?.trim() ?? '詳細'
    const body = raw.match(/<\/summary>([\s\S]*?)<\/details>/)?.[1] ?? ''
    out.push(`::: details ${summary}`, '', body.trim(), '', ':::')
  }

  return out.join('\n')
}
