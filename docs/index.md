---
layout: home

hero:
  name: 電腦系統底層
  text: 從作業系統、網路、資料庫、共識到平行運算
  tagline: 由下往上的 60 堂課。先把下面一層弄清楚，再往上走。
  image:
    light: /stack-light.svg
    dark: /stack-dark.svg
    alt: 五層由下往上：作業系統、網路通訊、資料庫系統、共識、平行運算
  actions:
    - theme: brand
      text: 開始第 1 堂
      link: /lessons/01-process-thread
    - theme: alt
      text: GitHub
      link: https://github.com/zhijian090195/system-lesssons
      target: _blank

features:
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="4" width="18" height="4" rx="1"/><rect x="3" y="10" width="18" height="4" rx="1"/><rect x="3" y="16" width="18" height="4" rx="1"/></svg>'
    title: 作業系統
    details: 第 1–12 堂。程序、執行緒與排程，後面每一層都靠它才跑得起來。
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="6" cy="12" r="2.2"/><circle cx="18" cy="7" r="2.2"/><circle cx="18" cy="17" r="2.2"/><path d="M8 12h8M8 12 16 8.2M8 12l8 3.6"/></svg>'
    title: 網路通訊
    details: 第 13–22 堂。封包怎麼走、連線怎麼建立、服務怎麼互相找到。
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><ellipse cx="12" cy="6" rx="7" ry="2.6"/><path d="M5 6v12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6"/><path d="M5 12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6"/></svg>'
    title: 資料庫系統
    details: 第 23–36 堂。資料怎麼落盤、怎麼查，交易又怎麼保住。
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="5.5" r="2"/><circle cx="5.5" cy="17.5" r="2"/><circle cx="18.5" cy="17.5" r="2"/><path d="M12 7.5 6.8 15.5M12 7.5l5.2 8"/></svg>'
    title: 共識
    details: 第 37–48 堂。多台機器要對同一件事說出同一個答案。
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M6 19V10M12 19V5M18 19v-7"/></svg>'
    title: 平行運算
    details: 第 49–60 堂。很多核心、很多機器同時做事時，工作怎麼拆、怎麼合。
---

<script setup>
import { withBase } from 'vitepress'
import { data as lessons } from './lessons.data'
</script>

## 由下往上

<div class="layer-stack" aria-label="五層由下往上堆疊，最底下是作業系統">
  <div class="layer layer-5"><span>平行運算</span><span>49–60</span></div>
  <div class="layer layer-4"><span>共識</span><span>37–48</span></div>
  <div class="layer layer-3"><span>資料庫系統</span><span>23–36</span></div>
  <div class="layer layer-2"><span>網路通訊</span><span>13–22</span></div>
  <div class="layer layer-1"><span>作業系統</span><span>1–12</span></div>
</div>

<p class="stack-note">上面的層用到下面的層。閱讀從最底下開始。</p>

## 已發佈的課

<ul class="published">
  <li v-for="lesson in lessons" :key="lesson.url">
    <a :href="withBase(lesson.url)">
      <span class="num">{{ String(lesson.num).padStart(2, '0') }}</span>
      <span>{{ lesson.title }}</span>
    </a>
  </li>
</ul>
