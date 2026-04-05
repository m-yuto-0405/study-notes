#!/usr/bin/env python3
"""毎朝9時(JST)に実行されるニュース収集スクリプト"""

import feedparser
import datetime
import os
import re

# JST = UTC+9
today = datetime.datetime.utcnow() + datetime.timedelta(hours=9)
date_str = today.strftime('%Y-%m-%d')

OUTPUT_PATH = f"src/content/news/{date_str}.md"

# すでに今日のファイルがあればスキップ
if os.path.exists(OUTPUT_PATH):
    print(f"Already exists: {OUTPUT_PATH}")
    exit(0)

FEEDS = [
    {
        "label": "Anthropic Blog",
        "url": "https://www.anthropic.com/rss.xml",
        "category": "Claude / Anthropic",
    },
    {
        "label": "Hacker News (AI)",
        "url": "https://hnrss.org/newest?q=claude+OR+anthropic+OR+LLM&points=20",
        "category": "Claude / Anthropic",
    },
    {
        "label": "The Verge AI",
        "url": "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",
        "category": "AI・Tech ニュース",
    },
    {
        "label": "TechCrunch AI",
        "url": "https://techcrunch.com/category/artificial-intelligence/feed/",
        "category": "AI・Tech ニュース",
    },
]

def clean_text(text: str) -> str:
    text = re.sub(r'<[^>]+>', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text[:120] + '...' if len(text) > 120 else text

articles_by_category: dict[str, list[str]] = {}

for feed_info in FEEDS:
    try:
        feed = feedparser.parse(feed_info["url"])
        category = feed_info["category"]
        if category not in articles_by_category:
            articles_by_category[category] = []

        for entry in feed.entries[:3]:
            title = clean_text(entry.get('title', 'タイトルなし'))
            link = entry.get('link', '')
            summary = clean_text(entry.get('summary', entry.get('description', '')))
            source = feed_info["label"]

            line = f"- **[{title}]({link})**"
            if summary:
                line += f" - {summary}"
            line += f"\n  *ソース: {source}*"
            articles_by_category[category].append(line)

        print(f"OK: {feed_info['label']} ({len(feed.entries)} entries)")
    except Exception as e:
        print(f"SKIP: {feed_info['label']} - {e}")

if not any(articles_by_category.values()):
    print("No articles fetched, skipping file creation.")
    exit(0)

lines = [f"# ニュース - {date_str}\n"]

for category, articles in articles_by_category.items():
    if articles:
        lines.append(f"## {category}\n")
        lines.extend(articles)
        lines.append("")

os.makedirs("src/content/news", exist_ok=True)
with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print(f"Created: {OUTPUT_PATH}")
