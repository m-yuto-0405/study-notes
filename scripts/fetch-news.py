#!/usr/bin/env python3
"""毎朝9時(JST)に実行されるニュース収集スクリプト"""

import feedparser
import datetime
import os
import re
from deep_translator import GoogleTranslator

# JST = UTC+9
today = datetime.datetime.utcnow() + datetime.timedelta(hours=9)
date_str = today.strftime('%Y-%m-%d')

OUTPUT_PATH = f"src/content/news/{date_str}.md"

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

translator = GoogleTranslator(source='auto', target='ja')

def translate(text: str) -> str:
    if not text:
        return ''
    try:
        return translator.translate(text[:500])
    except Exception:
        return text

def clean_text(text: str) -> str:
    text = re.sub(r'<[^>]+>', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text[:300]

articles_by_category: dict[str, list[str]] = {}

for feed_info in FEEDS:
    try:
        feed = feedparser.parse(feed_info["url"])
        category = feed_info["category"]
        if category not in articles_by_category:
            articles_by_category[category] = []

        for entry in feed.entries[:3]:
            title_raw = clean_text(entry.get('title', ''))
            summary_raw = clean_text(entry.get('summary', entry.get('description', '')))
            link = entry.get('link', '')
            source = feed_info["label"]

            title_ja = translate(title_raw)
            summary_ja = translate(summary_raw) if summary_raw else ''

            block = f"**[{title_ja}]({link})**\n{summary_ja}\n\n<small>ソース: {source} - {link}</small>"
            articles_by_category[category].append(block)

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
        for article in articles:
            lines.append(article)
            lines.append("---")
        lines.append("")

os.makedirs("src/content/news", exist_ok=True)
with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print(f"Created: {OUTPUT_PATH}")
