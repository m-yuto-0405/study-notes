# Gitコマンド まとめ

## 基本の流れ

```
編集 → add → commit → push
```

## よく使うコマンド

### 状態確認
```bash
git status          # 変更されたファイルを確認
git log --oneline   # コミット履歴を確認
git branch          # 現在のブランチを確認
```

### 変更を記録する
```bash
git add .                        # すべての変更をステージング
git add ファイル名                # 特定のファイルだけステージング
git commit -m "メッセージ"       # コミット（変更を記録）
```

### GitHubと同期する
```bash
git push                         # GitHubにアップロード
git pull                         # GitHubから最新を取得
```

### リモートの設定
```bash
git remote -v                    # リモートURLを確認
git remote add origin <URL>      # リモートを登録
```

## 初回セットアップの流れ

```bash
git init                                      # リポジトリを作成
git remote add origin https://github.com/... # GitHubと紐付け
git add .
git commit -m "Initial commit"
git push -u origin master
```

## よくあるミス

| エラー | 原因 | 解決 |
|--------|------|------|
| `src refspec main does not match` | ブランチ名が違う | `git branch` で確認して `git push origin master` |
| `remote already exists` | すでにリモート登録済み | `git remote -v` で確認 |

## Vercelとの連携

- `git push` するだけで自動デプロイされる
- 数分待つと反映される
