# 底層電腦系統

六十堂繁體中文課的靜態文件站，由下而上講低階電腦系統：作業系統、網路通訊、資料庫系統、共識層、平行運算應用層。用 VitePress 產生，版面是三欄：左邊課程目錄、中間課文、右邊本頁大綱。

網站：https://zhijian090195.github.io/system-lesssons/

## 本機預覽

需要 Node.js 20 以上。在倉庫根目錄執行：

```bash
npm install
npm run docs:dev
```

瀏覽器打開 http://localhost:5173/system-lesssons/

建置並預覽成品：

```bash
npm run docs:build
npm run docs:preview
```

預覽位址是 http://localhost:4173/system-lesssons/

## 新增一堂課

側邊欄依 `docs/lessons/` 裡的檔案自動產生，不用改設定檔。

1. 新增 `docs/lessons/NN-短名.md`。`NN` 是課號，建議兩位數，例如 `docs/lessons/03-memory.md`。短名用英文或拼音，單字之間用連字號，不要空白，副檔名是 `.md`。一位數也可以，例如 `3-memory.md`，排序仍照數字。
2. 課號決定順序，也決定放進哪一組：
   - 01–12：作業系統
   - 13–22：網路通訊
   - 23–36：資料庫系統
   - 37–48：共識層
   - 49–60：平行運算應用層
3. 檔案開頭用一個一級標題當課名，側邊欄會顯示它。例如：`# 第 3 堂：記憶體`。若要覆寫，可在檔案最前面加 frontmatter 的 `title`。
4. 二級標題（`##`）和三級標題（`###`）會出現在右側「本頁大綱」。
5. 圖用 Mermaid 的程式碼區塊（開頭寫 `mermaid`）。表格用 Markdown 表格。程式碼區塊標上語言，Go 寫 `go`，C# 寫 `csharp`、`cs` 或 `c#`。參考答案用：

```html
<details><summary>參考答案</summary>

1. 第一題的答案。

</details>
```

6. 存檔即可。開發伺服器在新增或刪除課文檔時會自己重開並更新目錄。若只改了一級標題的文字，重跑 `npm run docs:dev` 後側邊欄才會換字。推上 `main` 或 `master` 後，GitHub Actions 會建置並發佈。

課號不在 1 到 60 的檔案會出現在目錄最下面的「其他」。檔名不是「數字-短名.md」的不會進目錄。某一組還沒有檔案時，目錄仍會列出該組，只是收合起來。

## 發佈

推送到 `main` 或 `master` 時，`.github/workflows/deploy.yml` 會建置網站並部署到 GitHub Pages。這是專案站，路徑是 `/system-lesssons/`（倉庫名稱就是三個 s）。

倉庫的 Pages 來源要設成 GitHub Actions：Settings → Pages → Build and deployment → Source 選 GitHub Actions。只設一次。
