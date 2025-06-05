# 📈 Day Trading Intelligence Tool 🧠💵  
> Real-Time Market Bias Prediction Engine for Futures Traders | Built with 💻 React • Node.js • Puppeteer • Tailwind • LLMs

![status](https://img.shields.io/badge/build-success-brightgreen) ![AI Powered](https://img.shields.io/badge/LLM-Integrated-blueviolet) ![Made With Love](https://img.shields.io/badge/Made%20with-%E2%9D%A4-red)

## 🚀 Project Overview

Welcome to the **Day Trading Intelligence Tool**, your personalized market oracle. This AI-powered platform synthesizes **macroeconomic news**, **price action**, and **LLM-generated market bias** to help futures traders make **informed, confident, and timely** trading decisions across the **NY and London sessions**.

Whether you're a seasoned scalper or a macro-driven swing trader, this tool’s goal is to **turn chaos into confluence** 📊⚡.

---

## 🧠 Key Features

| Feature | Description |
|--------|-------------|
| 📰 **News Intelligence** | Real-time high-impact news scraped from [ForexFactory](https://www.forexfactory.com/), parsed via Puppeteer |
| 🕰️ **Session Bias Generation** | AI model identifies NY & London session market structure, sweeps, and likely trend continuation |
| 🤖 **LLM Confluence Engine** | Uses OpenAI’s GPT-4 to combine economic data + price action + trend indicators to deliver bias confidence |
| 📊 **Dashboard Frontend** | Beautiful UI in **React + Tailwind**, designed like a Bloomberg terminal (but for people who like light mode) |
| 🧮 **Confidence Score** | Weighted confidence indicator generated using heuristics and trend validation patterns |
| 🌐 **API Ready** | Easily extendable Node.js backend with Express for RESTful consumption |

---

## 🛠️ Stack Breakdown

| Layer | Tech |
|-------|------|
| Frontend | React.js, Tailwind CSS, Vite |
| Backend | Node.js, Express.js |
| Scraping | Puppeteer |
| AI/NLP | OpenAI GPT-4 (OpenAPI Integrated) |
| Data Processing | Python (for model prototyping) |
| Hosting | Vercel (frontend), Render or Railway (backend APIs) |
| Pipeline | JSON output formatting for easy downstream ML compatibility |

---

## 🧪 How It Works

1. **Scrape**: Puppeteer scrapes real-time high-impact economic news from ForexFactory.
2. **Parse**: Events are filtered by impact level, currency relevance, and scheduled timing.
3. **Analyze**: Pre-trained LLM takes event descriptions + previous price action to estimate directional bias.
4. **Score**: Generates a confidence score (0–100) and directional bias (Bullish / Bearish / Neutral).
5. **Visualize**: Trader sees confluence in a dashboard with clear calls-to-action before NY open.

---

## 🔍 Real-World Use Case

Imagine you’re trading ES futures. It’s 8:00 AM EST. You open the tool:

- **Fed Chair Powell speaks at 10:00AM**
- **London session swept hourly high**
- **AI says: Bearish bias with 82% confidence. Wait for NY sweep before shorting.**

And boom — confluence + caution = smarter trades.

---

## 🧠 LLM Prompt Engineering Preview

```text
“You are a market analyst. Based on this news: [news text], and this session structure: [PA data], what is the likely short-term market bias? Provide a directional answer with confidence (0-100) and explain briefly.”
