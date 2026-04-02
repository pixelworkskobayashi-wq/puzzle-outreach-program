# Puzzle 出前授業ポータル 実装計画

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 北海道建築士会札幌支部の出前授業申し込みポータルサイトのプロトタイプを構築する

**Architecture:** Astroによるワンページ静的サイト。全セクション（HERO/ABOUT/PROGRAM/RESULTS/APPLY）をindex.astroに縦積みし、固定ナビからスムーズスクロールで各セクションへ遷移。フォームはWeb3Formsで処理。

**Tech Stack:** Astro 6.x / TypeScript / Netlify / Web3Forms

---

## ファイル構成

```
C:\Users\root_\puzzle-outreach-program\
├── src/
│   ├── components/
│   │   ├── Header.astro        固定ナビ（スムーズスクロールリンク）
│   │   ├── Hero.astro          HEROセクション
│   │   ├── About.astro         ABOUTセクション
│   │   ├── Program.astro       PROGRAMセクション
│   │   ├── Results.astro       RESULTSセクション
│   │   ├── Apply.astro         申し込みフォーム（Web3Forms）
│   │   ├── Footer.astro        フッター
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
│   └── images/                 画像素材置き場
├── astro.config.mjs
├── netlify.toml
├── package.json
├── tsconfig.json
└── .gitignore
```

---

## Task 1: プロジェクト初期化

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `.gitignore`
- Create: `netlify.toml`
- Create: `public/images/.gitkeep`

- [ ] **Step 1: package.json を作成**

```json
{
  "name": "puzzle-outreach-program",
  "type": "module",
  "version": "0.0.1",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^6.1.2"
  },
  "engines": {
    "node": ">=22.12.0"
  }
}
```

- [ ] **Step 2: astro.config.mjs を作成**

```js
// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  devToolbar: { enabled: false },
});
```

- [ ] **Step 3: tsconfig.json を作成**

```json
{
  "extends": "astro/tsconfigs/strict"
}
```

- [ ] **Step 4: .gitignore を作成**

```
node_modules/
dist/
.astro/
.env
.env.local
.DS_Store
```

- [ ] **Step 5: netlify.toml を作成**

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

- [ ] **Step 6: public/images ディレクトリを作成**

```bash
mkdir -p public/images
echo "" > public/images/.gitkeep
```

- [ ] **Step 7: 依存パッケージをインストール**

```bash
cd C:/Users/root_/puzzle-outreach-program
npm install
```

Expected: `node_modules/` が作成される

- [ ] **Step 8: src ディレクトリ構造を作成**

```bash
mkdir -p src/components src/data src/layouts src/pages src/styles
```

- [ ] **Step 9: ビルド確認用の最小ページを作成してビルドが通ることを確認**

`src/pages/index.astro` に以下を仮置き：
```astro
---
---
<html lang="ja"><body><h1>OK</h1></body></html>
```

```bash
npm run build
```

Expected: `dist/` が生成される、エラーなし

- [ ] **Step 10: git 初期化とコミット**

```bash
git init
git add .
git commit -m "chore: プロジェクト初期化"
```

---

## Task 2: グローバルスタイル

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: global.css を作成**

company-hp のトークンをベースに、アクセントカラーのみ変更（緑系でPixel WorksのネイビーブルーとHPを区別する）

```css
/* Design Tokens */
:root {
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
  --color-text-sub: #888888;
  --color-border: #eeeeee;
  --color-accent: #2e7d5e; /* 1行変更で全体に反映 */

  --font-sans: 'Noto Sans JP', 'Helvetica Neue', Arial, sans-serif;
  --letter-spacing-wide: 0.15em;
  --letter-spacing-wider: 0.25em;

  --transition-base: 0.3s ease;
  --transition-slow: 0.6s ease;

  --header-height: 64px;
}

/* Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  overflow-y: scroll;
}

body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}

img {
  display: block;
  max-width: 100%;
}

/* Utility */
.section-label {
  font-size: 10px;
  letter-spacing: var(--letter-spacing-wider);
  color: var(--color-text-sub);
  text-transform: uppercase;
  margin-bottom: 24px;
}

.text-link {
  font-size: 11px;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-text);
  text-transform: uppercase;
  text-decoration: none;
  border-bottom: 1px solid var(--color-text);
  padding-bottom: 2px;
  transition: opacity var(--transition-base);
}

.text-link:hover { opacity: 0.5; }

/* Fade-in */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity var(--transition-slow), transform var(--transition-slow);
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

@media (max-width: 768px) {
  .container { padding: 0 20px; }
}
```

- [ ] **Step 2: コミット**

```bash
git add src/styles/global.css
git commit -m "style: グローバルスタイル・デザイントークン追加"
```

---

## Task 3: Layout.astro

**Files:**
- Create: `src/layouts/Layout.astro`

- [ ] **Step 1: Layout.astro を作成**

```astro
---
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
}

const {
  title = '出前授業 | 北海道建築士会札幌支部',
  description = '北海道建築士会札幌支部による小中学校向け出前授業。間取り作成アプリを使って住まいについて考え学びます。',
} = Astro.props;
---
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;600;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <slot />
    <script>
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
          });
        },
        { threshold: 0.1 }
      );
      document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    </script>
  </body>
</html>
```

- [ ] **Step 2: コミット**

```bash
git add src/layouts/Layout.astro
git commit -m "feat: Layout.astro 追加"
```

---

## Task 4: Header.astro（固定ナビ）

**Files:**
- Create: `src/components/Header.astro`

- [ ] **Step 1: Header.astro を作成**

ナビリンクはすべて同一ページ内セクションへのスムーズスクロール（`href="#section-id"`）

```astro
---
---
<header class="site-header" id="top">
  <div class="container header-inner">
    <a href="#hero" class="logo">PUZZLE</a>
    <nav class="nav">
      <a href="#about"   class="nav-link">ABOUT</a>
      <a href="#program" class="nav-link">PROGRAM</a>
      <a href="#results" class="nav-link">RESULTS</a>
      <a href="#apply"   class="nav-link apply-btn">申し込む</a>
    </nav>
  </div>
</header>

<style>
.site-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-border);
  height: var(--header-height);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}
.logo {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: var(--letter-spacing-wider);
  color: var(--color-accent);
  text-decoration: none;
}
.nav {
  display: flex;
  align-items: center;
  gap: 40px;
}
.nav-link {
  font-size: 11px;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-text);
  text-decoration: none;
  text-transform: uppercase;
  transition: opacity var(--transition-base);
}
.nav-link:hover { opacity: 0.5; }
.apply-btn {
  color: #fff;
  background: var(--color-accent);
  padding: 8px 18px;
  border-radius: 2px;
  letter-spacing: 0.1em;
  transition: opacity var(--transition-base);
}
.apply-btn:hover { opacity: 0.8; }
@media (max-width: 768px) {
  .nav { gap: 16px; }
  .nav-link { font-size: 10px; }
  .apply-btn { padding: 6px 12px; }
}
</style>
```

- [ ] **Step 2: コミット**

```bash
git add src/components/Header.astro
git commit -m "feat: Header 固定ナビ追加"
```

---

## Task 5: Hero.astro

**Files:**
- Create: `src/components/Hero.astro`

- [ ] **Step 1: Hero.astro を作成**

背景画像は後で差し替え可能なように Unsplash の仮画像を使用。

```astro
---
---
<section class="hero" id="hero">
  <div class="hero-bg"></div>
  <div class="hero-overlay"></div>
  <div class="container hero-content">
    <p class="hero-label fade-in">PUZZLE OUTREACH PROGRAM</p>
    <h1 class="hero-title fade-in">
      建築のプロが学校へ。<br />
      子どもたちに空間を<br />
      デザインする体験を。
    </h1>
    <p class="hero-sub fade-in">
      北海道建築士会札幌支部による小中学校向け出前授業
    </p>
    <div class="hero-cta fade-in">
      <a href="#apply" class="cta-primary">出前授業を申し込む →</a>
      <a href="#program" class="cta-secondary">授業内容を見る</a>
    </div>
  </div>
</section>

<style>
.hero {
  position: relative;
  height: 100svh;
  min-height: 600px;
  display: flex;
  align-items: center;
}
.hero-bg {
  position: absolute;
  inset: 0;
  background: url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80') center/cover no-repeat;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 100%);
}
.hero-content {
  position: relative;
  z-index: 1;
  color: #fff;
}
.hero-label {
  font-size: 10px;
  letter-spacing: var(--letter-spacing-wider);
  opacity: 0.8;
  margin-bottom: 24px;
}
.hero-title {
  font-size: clamp(28px, 5vw, 56px);
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 20px;
}
.hero-sub {
  font-size: clamp(13px, 1.5vw, 16px);
  opacity: 0.85;
  margin-bottom: 40px;
  letter-spacing: 0.05em;
}
.hero-cta {
  display: flex;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
}
.cta-primary {
  font-size: 12px;
  letter-spacing: var(--letter-spacing-wide);
  text-decoration: none;
  text-transform: uppercase;
  background: var(--color-accent);
  color: #fff;
  padding: 14px 28px;
  border-radius: 2px;
  transition: opacity var(--transition-base);
}
.cta-primary:hover { opacity: 0.85; }
.cta-secondary {
  font-size: 11px;
  letter-spacing: var(--letter-spacing-wide);
  text-decoration: none;
  text-transform: uppercase;
  color: #fff;
  border-bottom: 1px solid rgba(255,255,255,0.6);
  padding-bottom: 2px;
  transition: border-color var(--transition-base);
}
.cta-secondary:hover { border-color: #fff; }
</style>
```

- [ ] **Step 2: コミット**

```bash
git add src/components/Hero.astro
git commit -m "feat: Hero セクション追加"
```

---

## Task 6: About.astro

**Files:**
- Create: `src/components/About.astro`

- [ ] **Step 1: About.astro を作成**

```astro
---
---
<section class="about" id="about">
  <div class="container">
    <p class="section-label fade-in">ABOUT</p>
    <div class="about-grid fade-in">
      <div class="about-main">
        <h2 class="about-title">出前授業とは</h2>
        <p class="about-text">
          「住まいを自分でデザインしてみよう」をテーマに、間取り作成アプリを使いながら
          住まいの空間構成・部屋の役割・家族の暮らしについて楽しく学ぶ授業です。
        </p>
        <p class="about-text">
          建築のプロフェッショナルが直接学校へ出向き、設計の考え方や建築の魅力を
          子どもたちにわかりやすく伝えます。
        </p>
      </div>
      <div class="about-sub">
        <p class="about-org-label">主催</p>
        <p class="about-org">北海道建築士会<br />札幌支部</p>
      </div>
    </div>
  </div>
</section>

<style>
.about {
  padding: 120px 0;
  background: #fafafa;
}
.about-grid {
  display: grid;
  grid-template-columns: 1fr 200px;
  gap: 80px;
  align-items: start;
}
.about-title {
  font-size: clamp(20px, 3vw, 30px);
  font-weight: 700;
  margin-bottom: 28px;
  line-height: 1.4;
}
.about-text {
  font-size: 14px;
  color: var(--color-text-sub);
  line-height: 1.9;
  margin-bottom: 16px;
  max-width: 600px;
}
.about-org-label {
  font-size: 10px;
  letter-spacing: var(--letter-spacing-wider);
  color: var(--color-text-sub);
  text-transform: uppercase;
  margin-bottom: 12px;
}
.about-org {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.7;
  color: var(--color-text);
}
@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>
```

- [ ] **Step 2: コミット**

```bash
git add src/components/About.astro
git commit -m "feat: About セクション追加"
```

---

## Task 7: Program.astro

**Files:**
- Create: `src/components/Program.astro`

- [ ] **Step 1: Program.astro を作成**

```astro
---
---
<section class="program" id="program">
  <div class="container">
    <p class="section-label fade-in">PROGRAM</p>
    <h2 class="program-heading fade-in">授業プログラム</h2>

    <div class="program-detail fade-in">
      <div class="program-main">
        <h3 class="program-title">住まいをデザインしよう</h3>
        <p class="program-subtitle">— 間取り作成アプリで学ぶ建築と暮らし —</p>
        <p class="program-desc">
          専用の間取り作成アプリを操作しながら、部屋の配置・広さ・動線を
          自分で考えてオリジナルの住まいをデザインします。
          建築士が設計の考え方をわかりやすく解説し、空間を「つくる」楽しさを体験します。
        </p>

        <dl class="program-specs">
          <div class="spec-row">
            <dt>対象</dt>
            <dd>小学校・中学校（学年は相談可）</dd>
          </div>
          <div class="spec-row">
            <dt>授業時間</dt>
            <dd>45〜90分（学校のカリキュラムに合わせて調整可能）</dd>
          </div>
          <div class="spec-row">
            <dt>定員</dt>
            <dd>1クラス単位（約30〜40名）</dd>
          </div>
          <div class="spec-row">
            <dt>費用</dt>
            <dd>無料</dd>
          </div>
        </dl>
      </div>

      <div class="program-notice">
        <p class="notice-title">⚠ 実施にあたっての必須条件</p>
        <p class="notice-text">
          授業で使用するアプリはインターネット接続が必要です。
          実施場所（教室・体育館など）に安定したWi-Fi環境が必須となります。
          ネットワーク環境についてはお申し込み時にご記入ください。
        </p>
      </div>
    </div>
  </div>
</section>

<style>
.program {
  padding: 120px 0;
}
.program-heading {
  font-size: clamp(20px, 3vw, 30px);
  font-weight: 700;
  margin-bottom: 56px;
}
.program-main {
  margin-bottom: 40px;
}
.program-title {
  font-size: clamp(18px, 2.5vw, 24px);
  font-weight: 700;
  margin-bottom: 8px;
}
.program-subtitle {
  font-size: 13px;
  color: var(--color-text-sub);
  margin-bottom: 24px;
  letter-spacing: 0.05em;
}
.program-desc {
  font-size: 14px;
  color: var(--color-text-sub);
  line-height: 1.9;
  max-width: 680px;
  margin-bottom: 40px;
}
.program-specs {
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 560px;
}
.spec-row {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 24px;
  padding: 16px 0;
  border-bottom: 1px solid var(--color-border);
  font-size: 13px;
}
.spec-row dt { color: var(--color-text-sub); }
.spec-row dd { color: var(--color-text); }
.program-notice {
  background: #fff8f0;
  border-left: 3px solid #e07b39;
  padding: 24px 28px;
  max-width: 680px;
  border-radius: 0 4px 4px 0;
}
.notice-title {
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #c0622a;
}
.notice-text {
  font-size: 13px;
  line-height: 1.8;
  color: var(--color-text-sub);
}
@media (max-width: 640px) {
  .spec-row { grid-template-columns: 1fr; gap: 4px; }
}
</style>
```

- [ ] **Step 2: コミット**

```bash
git add src/components/Program.astro
git commit -m "feat: Program セクション追加"
```

---

## Task 8: Results データ + Results.astro

**Files:**
- Create: `src/data/results.ts`
- Create: `src/components/Results.astro`

- [ ] **Step 1: results.ts を作成（仮データ）**

```typescript
export interface Stat {
  value: string;
  label: string;
}

export interface Testimonial {
  id: string;
  school: string;
  role: string;
  comment: string;
}

export const stats: Stat[] = [
  { value: '25+', label: '実施校数' },
  { value: '1,200+', label: '累計参加人数' },
  { value: '7', label: '活動年数' },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    school: '札幌市立〇〇小学校',
    role: '担任教諭',
    comment: '子どもたちが夢中になってアプリを操作していました。自分の部屋を設計するという体験が、空間への興味につながったと思います。',
  },
  {
    id: 't2',
    school: '札幌市立〇〇中学校',
    role: '技術家庭科担当',
    comment: '専門家の方から直接話を聞けることで、建築という仕事への理解が深まりました。キャリア教育の観点からも大変有意義でした。',
  },
  {
    id: 't3',
    school: '〇〇市立〇〇小学校',
    role: '校長',
    comment: '費用もかからず、準備もサポートしていただけたので学校側の負担がほとんどありませんでした。ぜひ継続して実施したいと思います。',
  },
];
```

- [ ] **Step 2: Results.astro を作成**

```astro
---
import { stats, testimonials } from '../data/results';
---
<section class="results" id="results">
  <div class="container">
    <p class="section-label fade-in">RESULTS</p>
    <h2 class="results-heading fade-in">実績</h2>

    <div class="stats-grid fade-in">
      {stats.map((stat) => (
        <div class="stat-item">
          <p class="stat-value">{stat.value}</p>
          <p class="stat-label">{stat.label}</p>
        </div>
      ))}
    </div>

    <div class="testimonials fade-in">
      <p class="section-label">VOICE</p>
      <div class="testimonials-grid">
        {testimonials.map((t) => (
          <div class="testimonial-card">
            <p class="testimonial-comment">「{t.comment}」</p>
            <p class="testimonial-source">{t.school} / {t.role}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

<style>
.results {
  padding: 120px 0;
  background: #fafafa;
}
.results-heading {
  font-size: clamp(20px, 3vw, 30px);
  font-weight: 700;
  margin-bottom: 56px;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  margin-bottom: 80px;
  background: var(--color-border);
}
.stat-item {
  background: #fff;
  padding: 48px 32px;
  text-align: center;
}
.stat-value {
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 700;
  color: var(--color-accent);
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}
.stat-label {
  font-size: 12px;
  color: var(--color-text-sub);
  letter-spacing: 0.05em;
}
.testimonials { margin-top: 0; }
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 24px;
}
.testimonial-card {
  padding: 28px;
  border: 1px solid var(--color-border);
  background: #fff;
}
.testimonial-comment {
  font-size: 13px;
  line-height: 1.9;
  color: var(--color-text);
  margin-bottom: 16px;
}
.testimonial-source {
  font-size: 11px;
  color: var(--color-text-sub);
  letter-spacing: 0.03em;
}
@media (max-width: 1024px) {
  .testimonials-grid { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .stats-grid { grid-template-columns: 1fr; }
  .testimonials-grid { grid-template-columns: 1fr; }
}
</style>
```

- [ ] **Step 3: コミット**

```bash
git add src/data/results.ts src/components/Results.astro
git commit -m "feat: Results セクション・実績データ追加"
```

---

## Task 9: Apply.astro（申し込みフォーム）

**Files:**
- Create: `src/components/Apply.astro`

- [ ] **Step 1: Apply.astro を作成**

Web3Forms のアクセスキーは company-hp と同じキーを使用。

```astro
---
---
<section class="apply" id="apply">
  <div class="container">
    <p class="section-label fade-in">APPLY</p>
    <h2 class="apply-heading fade-in">出前授業の申し込み</h2>
    <p class="apply-lead fade-in">
      下記フォームにご記入の上、送信してください。<br />
      担当者より2営業日以内にご連絡いたします。
    </p>

    <div id="apply-wrap" class="fade-in">
      <form id="apply-form" action="https://api.web3forms.com/submit" method="POST" class="apply-form">
        <input type="hidden" name="access_key" value="4110fb94-6c7b-4fc4-9753-c58f6a3241aa" />
        <input type="hidden" name="subject" value="【出前授業】お申し込みがありました" />
        <input type="checkbox" name="botcheck" style="display:none;" />

        <div class="form-row">
          <label class="form-label" for="school">学校名 <span class="required">*</span></label>
          <input id="school" type="text" name="school" required class="form-input" placeholder="〇〇市立〇〇小学校" />
        </div>
        <div class="form-row">
          <label class="form-label" for="name">担当者名 <span class="required">*</span></label>
          <input id="name" type="text" name="name" required class="form-input" placeholder="山田 太郎" />
        </div>
        <div class="form-row">
          <label class="form-label" for="email">メールアドレス <span class="required">*</span></label>
          <input id="email" type="email" name="email" required class="form-input" placeholder="your@email.com" />
        </div>
        <div class="form-row">
          <label class="form-label" for="tel">電話番号 <span class="required">*</span></label>
          <input id="tel" type="tel" name="tel" required class="form-input" placeholder="011-000-0000" />
        </div>
        <div class="form-row">
          <label class="form-label" for="date1">希望日程 第1候補 <span class="required">*</span></label>
          <input id="date1" type="date" name="date1" required class="form-input" />
        </div>
        <div class="form-row">
          <label class="form-label" for="date2">希望日程 第2候補 <span class="required">*</span></label>
          <input id="date2" type="date" name="date2" required class="form-input" />
        </div>
        <div class="form-row">
          <label class="form-label" for="grade">対象学年 <span class="required">*</span></label>
          <select id="grade" name="grade" required class="form-input form-select">
            <option value="">選択してください</option>
            <option value="小学校低学年（1〜2年）">小学校低学年（1〜2年）</option>
            <option value="小学校中学年（3〜4年）">小学校中学年（3〜4年）</option>
            <option value="小学校高学年（5〜6年）">小学校高学年（5〜6年）</option>
            <option value="中学校（1年）">中学校（1年）</option>
            <option value="中学校（2年）">中学校（2年）</option>
            <option value="中学校（3年）">中学校（3年）</option>
            <option value="複数学年">複数学年（備考欄に記載）</option>
          </select>
        </div>
        <div class="form-row">
          <label class="form-label" for="count">参加人数 <span class="required">*</span></label>
          <input id="count" type="number" name="count" required min="1" class="form-input" placeholder="30" />
        </div>
        <div class="form-row">
          <label class="form-label" for="venue">実施場所 <span class="required">*</span></label>
          <input id="venue" type="text" name="venue" required class="form-input" placeholder="例：各教室、体育館、多目的室" />
        </div>
        <div class="form-row">
          <label class="form-label" for="network">ネットワーク環境 <span class="required">*</span></label>
          <input id="network" type="text" name="network" required class="form-input" placeholder="例：各教室にWi-Fi有り（学校LAN）" />
          <p class="form-hint">アプリの動作にはインターネット接続が必須です。実施場所の通信環境をご記入ください。</p>
        </div>
        <div class="form-row">
          <label class="form-label" for="notes">その他ご要望・備考</label>
          <textarea id="notes" name="notes" rows="4" class="form-input form-textarea" placeholder="ご不明な点やご要望があればご記入ください。"></textarea>
        </div>

        <div class="form-submit">
          <button type="submit" class="submit-btn">申し込みを送信する →</button>
        </div>
      </form>

      <div id="apply-success" class="apply-success" style="display:none;">
        <p class="success-title">お申し込みありがとうございます。</p>
        <p class="success-body">担当者より2営業日以内にご連絡いたします。</p>
        <a href="#hero" class="text-link" style="display:inline-block;margin-top:32px;">ページトップへ戻る →</a>
      </div>
    </div>
  </div>
</section>

<style>
.apply { padding: 120px 0; }
.apply-heading {
  font-size: clamp(20px, 3vw, 30px);
  font-weight: 700;
  margin-bottom: 16px;
}
.apply-lead {
  font-size: 14px;
  color: var(--color-text-sub);
  line-height: 1.9;
  margin-bottom: 56px;
}
.apply-form { max-width: 640px; }
.form-row { margin-bottom: 36px; }
.form-label {
  display: block;
  font-size: 11px;
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  color: var(--color-text-sub);
  margin-bottom: 10px;
}
.required { color: var(--color-accent); }
.form-input {
  width: 100%;
  background: none;
  border: none;
  border-bottom: 1px solid var(--color-border);
  padding: 10px 0;
  font-size: 14px;
  color: var(--color-text);
  font-family: var(--font-sans);
  outline: none;
  transition: border-color var(--transition-base);
}
.form-input:focus { border-bottom-color: var(--color-text); }
.form-select { cursor: pointer; }
.form-textarea { resize: vertical; min-height: 100px; line-height: 1.7; }
.form-hint { font-size: 11px; color: var(--color-text-sub); margin-top: 6px; }
.form-submit { margin-top: 48px; }
.submit-btn {
  font-size: 12px;
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  background: var(--color-accent);
  color: #fff;
  border: none;
  padding: 16px 36px;
  border-radius: 2px;
  cursor: pointer;
  transition: opacity var(--transition-base);
  font-family: var(--font-sans);
}
.submit-btn:hover { opacity: 0.85; }
.submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.apply-success {
  max-width: 640px;
  opacity: 0;
  transition: opacity 0.6s ease;
}
.apply-success.visible { opacity: 1; }
.success-title {
  font-size: clamp(16px, 2vw, 20px);
  font-weight: 700;
  margin-bottom: 16px;
}
.success-body {
  font-size: 14px;
  color: var(--color-text-sub);
  line-height: 1.9;
}
</style>

<script>
  const form = document.getElementById('apply-form') as HTMLFormElement;
  const success = document.getElementById('apply-success')!;
  const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    btn.textContent = '送信中...';
    btn.disabled = true;

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: new FormData(form),
    });

    if (res.ok) {
      form.style.transition = 'opacity 0.4s ease';
      form.style.opacity = '0';
      setTimeout(() => {
        form.style.display = 'none';
        success.style.display = 'block';
        requestAnimationFrame(() => success.classList.add('visible'));
      }, 400);
    } else {
      btn.textContent = '申し込みを送信する →';
      btn.disabled = false;
      alert('送信に失敗しました。時間をおいて再度お試しください。');
    }
  });
</script>
```

- [ ] **Step 2: コミット**

```bash
git add src/components/Apply.astro
git commit -m "feat: Apply 申し込みフォーム追加（Web3Forms）"
```

---

## Task 10: Footer.astro + BackToTop.astro

**Files:**
- Create: `src/components/Footer.astro`
- Create: `src/components/BackToTop.astro`

- [ ] **Step 1: Footer.astro を作成**

```astro
---
---
<footer class="site-footer">
  <div class="container footer-inner">
    <span class="footer-org">北海道建築士会 札幌支部</span>
    <span class="footer-copy">© 2026 Hokkaido Architects Association Sapporo Branch. All rights reserved.</span>
  </div>
</footer>

<style>
.site-footer {
  padding: 32px 0;
  border-top: 1px solid var(--color-border);
}
.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
.footer-org {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--color-text);
}
.footer-copy {
  font-size: 11px;
  color: var(--color-text-sub);
  letter-spacing: 0.03em;
}
</style>
```

- [ ] **Step 2: BackToTop.astro を作成**

```astro
---
---
<button id="back-to-top" class="back-to-top" aria-label="トップへ戻る">↑</button>

<style>
.back-to-top {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 150;
  width: 44px;
  height: 44px;
  background: var(--color-text);
  color: #fff;
  border: none;
  border-radius: 2px;
  font-size: 18px;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
.back-to-top.visible {
  opacity: 0.7;
  pointer-events: all;
}
.back-to-top:hover { opacity: 1; }
@media (max-width: 640px) {
  .back-to-top { bottom: 20px; right: 20px; }
}
</style>

<script>
  const btn = document.getElementById('back-to-top')!;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
</script>
```

- [ ] **Step 3: コミット**

```bash
git add src/components/Footer.astro src/components/BackToTop.astro
git commit -m "feat: Footer・BackToTopボタン追加"
```

---

## Task 11: index.astro（全セクション組み立て）

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: index.astro を完成形に書き換え**

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
import About from '../components/About.astro';
import Program from '../components/Program.astro';
import Results from '../components/Results.astro';
import Apply from '../components/Apply.astro';
import Footer from '../components/Footer.astro';
import BackToTop from '../components/BackToTop.astro';
---
<Layout>
  <Header />
  <main style="padding-top: var(--header-height);">
    <Hero />
    <About />
    <Program />
    <Results />
    <Apply />
  </main>
  <Footer />
  <BackToTop />
</Layout>
```

- [ ] **Step 2: ビルド確認**

```bash
npm run build
```

Expected: エラーなし、`dist/index.html` が生成される

- [ ] **Step 3: 開発サーバーで目視確認**

```bash
npm run dev
```

ブラウザで `http://localhost:4321` を開いて確認：
- 固定ナビが常に表示されること
- 各ナビリンククリックで対応セクションへスムーズスクロールされること
- スクロールダウンで各セクションがフェードインすること
- 400px スクロールで「↑」ボタンが出現すること
- フォーム送信でサンクスメッセージに切り替わること

- [ ] **Step 4: コミット**

```bash
git add src/pages/index.astro
git commit -m "feat: index.astro 全セクション組み立て完了"
```

---

## Task 12: GitHub・Netlify デプロイ

**Files:**
- なし（設定作業のみ）

- [ ] **Step 1: GitHubにリポジトリを作成してpush**

```bash
git remote add origin https://github.com/pixelworkskobayashi-wq/puzzle-outreach-program.git
git branch -M main
git push -u origin main
```

- [ ] **Step 2: Netlifyで新サイトとして追加**

1. app.netlify.com → 「Add new site」→「Import an existing project」→ GitHub
2. `puzzle-outreach-program` を選択
3. ビルド設定は netlify.toml が自動読み込み
4. 「Deploy site」

- [ ] **Step 3: デプロイ確認**

Netlify発行のURLでサイトが表示されることを確認

- [ ] **Step 4: Web3Forms 通知先確認**

テスト送信を行い、申し込みメールが届くことを確認
