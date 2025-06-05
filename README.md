# Day Trading Intelligence Tool  
Real-Time Market Bias Prediction Engine for Futures Traders  
Built with React • Node.js • Puppeteer • Tailwind • LLMs

![Tech - Python](https://img.shields.io/badge/Python-3.10-blue)  
![Tech - Node.js](https://img.shields.io/badge/Node.js-LTS-green)  
![Tech - React](https://img.shields.io/badge/React-18-blue)  
![Tech - MongoDB](https://img.shields.io/badge/MongoDB-NoSQL-brightgreen)  
![Tech - Selenium](https://img.shields.io/badge/Selenium-Automation-lightgrey)  
![Tech - OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-blueviolet)  
![Tech - Auth0](https://img.shields.io/badge/Auth0-SSO-orange)

---

## Project Overview

Welcome to the Day Trading Intelligence Tool, your personalized market oracle. This AI-powered platform synthesizes macroeconomic news, price action, and LLM-generated market bias to help futures traders make informed, confident, and timely trading decisions across the NY and London sessions.

Whether you're a seasoned scalper or a macro-driven swing trader, this tool’s goal is to turn chaos into confluence.

---

## Key Features

| Feature | Description |
|--------|-------------|
| News Intelligence | Real-time high-impact news scraped from [ForexFactory](https://www.forexfactory.com/) using headless browser automation |
| Session Bias Generation | AI model identifies NY & London session market structure, sweeps, and likely trend continuation |
| LLM Confluence Engine | Uses OpenAI’s GPT-4 to combine economic data + price action + trend indicators to deliver bias confidence |
| Dashboard Frontend | Responsive UI built with React and Tailwind CSS |
| Confidence Score | Weighted confidence indicator generated using heuristics and historical pattern logic |
| API Ready | Easily extendable Node.js backend with Express and JSON-based endpoints for external usage |

---

## Stack Breakdown

| Layer     | Tech                                      |
|-----------|-------------------------------------------|
| Frontend  | React.js, Tailwind CSS, Vite              |
| Backend   | Node.js, Express.js                       |
| Scraping  | Puppeteer, Selenium                       |
| Database  | MongoDB (optional integration)            |
| Auth      | Auth0 for login/authentication            |
| AI/NLP    | OpenAI GPT-4 via OpenAPI                  |
| Data Processing | Python (for model prototyping)     |
| Hosting   | Vercel (frontend), Render or Railway (backend APIs) |

---

## How It Works

1. **Scrape**: Puppeteer scrapes real-time high-impact economic news from ForexFactory.
2. **Parse**: Events are filtered by impact level, currency relevance, and scheduled timing.
3. **Analyze**: Pre-trained LLM takes event descriptions + previous price action to estimate directional bias.
4. **Score**: Generates a confidence score (0–100) and directional bias (Bullish / Bearish / Neutral).
5. **Visualize**: Trader sees confluence in a dashboard with clear calls-to-action before NY open.

---

## Real-World Use Case

Imagine you’re trading ES futures. It’s 8:00 AM EST. You open the tool:

- Fed Chair Powell speaks at 10:00 AM  
- London session swept hourly high  
- AI says: Bearish bias with 82% confidence. Wait for NY sweep before shorting.  

Result: Insightful trading decisions driven by automation, analysis, and AI.

---

## Installation (Local Development)

```bash
# Clone the repo
git clone https://github.com/rajan-chavada/day-trading-intelligence-tool.git
cd day-trading-intelligence-tool

# Install dependencies
npm install

# Start backend
cd server
npm start

# Start frontend
cd client
npm run dev
