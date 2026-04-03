# 出前授業申し込みポータル 引き継ぎドキュメント

## プロジェクト概要

**サイト名：** PUZZLE 出前授業申し込みポータル  
**クライアント：** 一般社団法人 北海道建築士会 札幌支部  
**公開URL：** https://puzzle-outreach-program.netlify.app/  
**GitHub：** https://github.com/pixelworkskobayashi-wq/puzzle-outreach-program  
**最終更新：** 2026-04-03

---

## 技術スタック

| 項目 | 内容 |
|---|---|
| フレームワーク | Astro 6.x |
| 言語 | TypeScript |
| スタイル | CSS（スコープドスタイル） |
| フォーム | Web3Forms |
| ホスティング | Netlify |
| バージョン管理 | GitHub |

---

## ファイル構成

```
puzzle-outreach-program/
├── src/
│   ├── components/
│   │   ├── Header.astro        固定ナビ（スムーズスクロール）
│   │   ├── Hero.astro          HEROセクション（YouTube動画背景）
│   │   ├── About.astro         ABOUTセクション
│   │   ├── Gallery.astro       写真ギャラリー（4×2グリッド・拡大モーダル）
│   │   ├── Theme.astro         THEMEセクション（衣食「住」を知る）
│   │   ├── Program.astro       PROGRAMセクション（授業内容・タイムテーブル）
│   │   ├── Example.astro       EXAMPLEセクション（専用アプリ紹介・4枚サムネ）
│   │   ├── Results.astro       RESULTSセクション（実績・声）
│   │   ├── Apply.astro         申し込みフォーム（Web3Forms）
│   │   ├── Footer.astro        フッター（住所・連絡先）
│   │   ├── Divider.astro       セクション間ボーダーライン
│   │   └── BackToTop.astro     トップへ戻るボタン
│   ├── data/
│   │   └── results.ts          実績データ（数字・コメント）
│   ├── layouts/
│   │   └── Layout.astro        共通HTMLシェル（フェードインJS含む）
│   ├── pages/
│   │   └── index.astro         トップページ（全セクション組み立て）
│   └── styles/
│       └── global.css          デザイントークン・共通スタイル
├── public/
│   └── images/
│       ├── hero.jpg            Heroセクション背景画像
│       ├── theme.jpg           THEMEセクション画像
│       ├── line2.png           セクション間ボーダーライン素材
│       ├── gallery/            ギャラリー写真（01〜08.jpg）
│       └── example/            専用アプリ画像（ex01〜ex04.png）
├── astro.config.mjs
├── netlify.toml
├── package.json
└── tsconfig.json
```

---

## セクション構成（ページ上から順）

1. **HERO** — YouTube動画背景・キャッチコピー・CTAボタン
2. **ABOUT** — プログラム概要説明
3. **GALLERY** — 授業風景写真（4×2グリッド・クリックで拡大）
4. **THEME** — 衣食「住」を知る（テーマ説明・画像）
5. **PROGRAM** — 授業プログラム詳細・タイムテーブル
6. **EXAMPLE** — 専用アプリ紹介（4枚サムネ・クリックで拡大）
7. **RESULTS** — 実績数値・参加者の声
8. **APPLY** — 申し込みフォーム（Web3Forms）
9. **FOOTER** — 住所・連絡先

※各セクションの間に `line2.png` を使ったボーダーラインを配置（Divider.astro）

---

## デザイン仕様

| 項目 | 値 |
|---|---|
| アクセントカラー | `#2e7d5e`（グリーン） |
| フォント | M PLUS Rounded 1c（丸ゴシック）/ Hero見出しのみ Noto Sans JP |
| Applyグラデーション | `#2e7d5e` → `#1a6eb5` |
| セクション背景 | 白 `#ffffff` と薄グレー `#fafafa` 交互 |

---

## フォーム設定（Web3Forms）

- **アクセスキー：** `4110fb94-6c7b-4fc4-9753-c58f6a3241aa`
- **件名：** 【出前授業】お申し込みがありました
- 申し込み内容はWeb3Formsに登録したメールアドレスに届く

---

## デプロイ手順

GitHub に push すると Netlify が自動でビルド・デプロイします。

```bash
git add .
git commit -m "変更内容"
git push origin main
```

手動デプロイが必要な場合は Netlify 管理画面（app.netlify.com）から「Trigger deploy」を実行。

---

## 連絡先情報（フッター掲載内容）

一般社団法人 北海道建築士会札幌支部  
〒060-0042 札幌市中央区大通西5丁目11番地 大五ビル6F  
TEL: 011-232-1843 ／ FAX: 011-222-0924 ／ hksj@h-ab.com
