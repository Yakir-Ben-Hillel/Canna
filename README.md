# Canna

AI-Based Cannabis Sommelier

🌿 Product Overview

The AI Cannabis Sommelier is a mobile-first, GPT-powered platform that provides personalized cannabis strain recommendations based on user needs, regional product availability, and a growing network of community insights. It leverages ChatGPT with custom instruction sets and integrates with public APIs and delivery platforms to offer real-time, localized cannabis recommendations, reviews, and purchasing options.

🚀 MVP Goals

Enable users to describe their needs in natural language and receive tailored strain recommendations.

Wrap ChatGPT with a domain-specific strain knowledge base and regional compliance filters.

Integrate with regional APIs (starting with Israel) for live strain availability and pricing.

Allow logged-in users to review and rate strains.

Include MCP (Model Context Protocol) layer for geo-aware customization.

🔄 MVP Features

1. Strain Search & Indexing

GPT-powered strain search with natural language input.

Custom instruction wrapper to create structured strain profiles (Strain Index).

Localized index building per country/region.

2. Community Network

Rating system per strain (effectiveness, flavor, side effects).

Text reviews.

Voting on helpful reviews.

3. Region-Based Interaction (MCP)

Israeli medical cannabis data using public API.

Context-aware behavior (language, legality, terminology).

Regional filters for recommendation output.

4. Dispensary Integration

Pull from dispensary APIs: stock, pricing, availability.

Display nearest dispensaries with selected strain in stock.

5. Basic Delivery System Connector

Display dispensary delivery options.

Estimate delivery time and cost.

Placeholder hooks for third-party delivery services.

🚧 Architecture Overview

Frontend: React Native + TypeScript (mobile app first)
Backend: Node.js + TypeScript with Express
AI Layer: ChatGPT with MCP prompt wrappers
Database: PostgreSQL (user/review/strain data) + Redis (caching)
External APIs:

Israeli Medical Cannabis API

Leafly, Weedmaps (future)

Google Maps API (location services)

👥 User Roles

Guest

Can browse general strain info.

View top-rated reviews.

Registered User

Submit reviews/ratings.

Save favorite strains.

See personalized recommendations.

Admin/Moderator

Approve flagged reviews.

Edit strain index entries.

Manage regional data wrappers.

🕇 Extra Features (Post-MVP)

Personal Use Tracker

Log consumption history

Journal effects and side effects

Generate custom “Cannabis Passport”

Visual Strain Recognition

Upload a label/photo of product to get strain info (via OCR & label DB).

Voice Assistant Mode

Ask the sommelier questions by voice

TTS for recommended strains

Medical Support Layer

AI assistant can help draft reports for doctors

Track prescriptions & legality window

Strain Match AI

Upload a user’s preferred strain and get recommendations based on effect similarity.

Local Language Layer

Support for Hebrew, Arabic, Spanish, etc.

GPT auto-detects locale using MCP context

✅ MVP Milestones

ChatGPT prompt wrapper for strain classification

Basic React Native mobile app

Integration with Israeli cannabis API

Dispensary finder and stock checker

User authentication and review system

Delivery UI flow + mock integration

📄 Sample Prompt Wrapper (ChatGPT)

"You're an AI cannabis sommelier. When a user asks for a strain, generate a JSON output with strain name, effect profile, recommended usage time, taste notes, THC/CBD range, legality info for region, and availability in dispensaries nearby (if MCP context includes GPS + country)."

🌐 Compliance & Ethical Notes

Geo-restricted access based on cannabis legality.

Medical disclaimer on all recommendations.

User data securely stored and anonymized where possible.

💼 Next Steps

Set up project repo with task tracking.

Create schema for Strain Index.

Develop MVP in sprints with community feedback loop.

Prepare AI evaluation tools to monitor quality of GPT answers.
