# VercelとGitHubでWebアプリを公開する

## 概要
ローカルで開発したVite + ReactアプリをVercel経由でスマホ含む全デバイスから見れるようにする。

## 前提知識

### GitHubとは
- コードをクラウドで管理するサービス
- ローカルのgitリポジトリをリモート（インターネット上）に置ける場所
- 無料で使える

### Vercelとは
- Webアプリのホスティングサービス
- GitHubと連携してワンクリックでデプロイできる
- 個人利用（Hobby plan）は無料

## リポジトリ作成時の設定

| 項目 | 設定 | 理由 |
|------|------|------|
| Visibility | Public | Vercel無料枠で使うため |
| .gitignore | None | ローカルに既にある場合は不要 |
| ライセンス | None | 個人の学習用途なら不要 |
| README | どちらでもOK | 後から追加も可能 |

## デプロイ手順

1. GitHubでリポジトリ作成
2. ローカルにリモートを登録: `git remote add origin <URL>`
3. pushする: `git push -u origin main`
4. Vercel（vercel.com）にGitHubアカウントでログイン
5. "New Project" → GitHubリポジトリを選択
6. そのままDeployボタン（Viteは自動検出される）

## ポイント
-費用はゼロ（GitHubもVercelも無料）
- pushするたびに自動で再デプロイされる
- カスタムドメインも無料で設定可能
