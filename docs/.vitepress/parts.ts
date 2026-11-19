export interface CoursePart {
  text: string
  min: number
  max: number
}

/** 課號區間決定側邊欄分組。改範圍時請同步 README 的「新增一堂課」。 */
export const COURSE_PARTS: CoursePart[] = [
  { text: '作業系統', min: 1, max: 12 },
  { text: '網路通訊', min: 13, max: 22 },
  { text: '資料庫系統', min: 23, max: 36 },
  { text: '共識層', min: 37, max: 48 },
  { text: '平行運算應用層', min: 49, max: 60 }
]

export const OTHER_PART = '其他'
