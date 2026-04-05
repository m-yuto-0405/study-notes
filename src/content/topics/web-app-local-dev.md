# ローカルWebアプリの仕組み（React + TypeScript）

作成: 2026-04-05

## 全体の流れ

```
あなたのコード（React + TypeScript）
        ↓
   【ビルドツール】（Vite, webpack等）
        ↓
  ブラウザが読める形（HTML + JS + CSS）
        ↓
   【開発用サーバー】
        ↓
  localhost:5173 などでブラウザに表示
```

## 登場人物

| 役割 | 何者か | 具体例 |
|------|--------|--------|
| ランタイム | JSをブラウザ外で動かす環境 | Node.js |
| パッケージ管理 | ライブラリの管理 | npm / pnpm / yarn |
| ビルドツール | コードを変換・バンドル | Vite / webpack |
| トランスパイラ | TSやJSXをブラウザ用JSに変換 | esbuild / tsc |
| バンドラー | 複数ファイルを1つにまとめる | Rollup（Viteが内部で使用） |

## なぜ変換が必要？

ブラウザはTypeScriptもJSXも直接読めない。
`App.tsx → (変換) → App.js → ブラウザが読める`

## ViteとWebpackの違い

- webpack: 全ファイルをまとめてから起動 → 遅い
- Vite: ブラウザが要求したときだけ変換 → 速い（ESモジュールベース）

## `npm run dev` で起きていること

1. `package.json` の `scripts.dev` を実行
2. Viteの開発サーバーが起動
3. localhost:5173 でリクエスト待ち受け
4. ブラウザからアクセス → ファイルを変換して返す
5. ファイルを保存 → HMR（ホットリロード）でブラウザ即更新
