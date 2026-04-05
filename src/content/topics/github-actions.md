# GitHub Actions まとめ

## GitHub Actionsとは
GitHubが提供する自動化サービス。コードのpushや定時実行など、決まったタイミングで処理を自動実行できる。**パブリックリポジトリは無料で使い放題。**

## 基本構成

```
.github/
  workflows/
    fetch-news.yml   ← ここにワークフローを書く
```

## ワークフローの書き方

```yaml
name: ワークフロー名

on:
  schedule:
    - cron: '0 0 * * *'  # 定時実行（毎日UTC 0:00 = JST 9:00）
  workflow_dispatch:       # 手動実行ボタンを追加

jobs:
  job名:
    runs-on: ubuntu-latest  # 実行環境

    steps:
      - uses: actions/checkout@v4       # リポジトリをチェックアウト
      - uses: actions/setup-python@v5   # Pythonをセットアップ
      - run: pip install feedparser     # パッケージインストール
      - run: python scripts/fetch.py   # スクリプト実行
```

## cron記法

```
分 時 日 月 曜日
0  0  *  *  *   → 毎日 0:00 (UTC)
```

- JSTはUTC+9なので、JST 9:00 = UTC 0:00

## Actionsからgit pushする方法

```yaml
- name: コミット&プッシュ
  run: |
    git config user.name "github-actions[bot]"
    git config user.email "github-actions[bot]@users.noreply.github.com"
    git add .
    git diff --cached --quiet || git commit -m "自動コミット"
    git push
```

## 権限設定（重要）

デフォルトではActionsにpush権限がない。以下で許可する：

`Settings → Actions → General → Workflow permissions → Read and write permissions`

## 手動実行

`workflow_dispatch:` を書いておくと、GitHubのActionsタブから手動実行できる。

## 今回の使い方

毎朝9時(JST)にPythonスクリプトを実行してRSSからニュースを収集し、mdファイルとして自動コミット→Vercelが自動デプロイ。
