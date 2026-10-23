# AI Lead Capture & Follow-Up System

> Your MVP Goal: **Never let a lead go unanswered for more than 24 hours.**

This guide takes you from zero to a working lead-capture pipeline in 4 weeks. Follow the phases in order. Do not skip ahead.

---

## Architecture Overview

```text
[ Contact Form ]
       |
       v
[ n8n Webhook ] ---> [ AI Classifier (Groq/Gemini) ]
       |                        |
       v                        v
[ Google Sheets ] <---- [ Status: Hot / Warm / Cold ]
       |
       v
[ Email Notification to You ]
       |
       v
[ 48h Timer ] ---> [ Follow-up Email to Lead ]
       |
       v
[ Log in Sheets ]
```

---

## Tech Stack (Free Tier)

| Component | Tool | Why |
| ----------- | ------ | ----- |
| Automation | n8n (self-hosted) | Free, visual, runs on your machine |
| Storage | Google Sheets | Free API, easy to view |
| Email | Gmail API | Free, generous limits |
| AI Classification | GroqCloud | Fast, free tier |
| AI Fallback | Google Gemini API | Free tier, good reasoning |
| Hosting | Local machine (Phase 1), $5 VPS (Phase 2+) | Start free |
| WhatsApp | WhatsApp Business Cloud API | Phase 3+ only |

---

## Phase 1: Capture & Classify (Week 1–2)

**Goal:** Every contact form submission lands in Google Sheets with a status, and you get notified.

### Step 1.1 — Set up n8n

1. Install n8n locally:

   ```bash
   npm install n8n -g
   n8n start
   ```

2. Open `http://localhost:5678`
3. Create your admin account

### Step 1.2 — Set up Google Sheets

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new sheet named `Leads`
3. Add these column headers in row 1:

   ```text
   Timestamp | Name | Email | Phone | Scopes | Message | Status | Source | FollowUpSent | Notes
   ```

4. Copy the Sheet ID from the URL:

   ```text
   https://docs.google.com/spreadsheets/d/[THIS_IS_THE_ID]/edit
   ```

### Step 1.3 — Connect Google Sheets to n8n

1. In n8n, go to **Credentials → New → Google Sheets OAuth2**
2. Follow the OAuth flow (requires Google Cloud project — free)
3. Save the credential as `Google Sheets Account`

### Step 1.4 — Connect Gmail to n8n

1. **Credentials → New → Gmail OAuth2**
2. Use the same Google Cloud project
3. Save as `Gmail Account`

### Step 1.5 — Connect Groq (AI Classifier)

1. Sign up at [console.groq.com](https://console.groq.com)
2. Create an API key
3. In n8n: **Credentials → New → Header Auth**
   - Name: `Groq API`
   - Header Name: `Authorization`
   - Header Value: `Bearer YOUR_GROQ_API_KEY`

### Step 1.6 — Build the Workflow

Create a new workflow in n8n with these nodes in order:

#### Node 1: Webhook Trigger

- Type: `Webhook`
- HTTP Method: `POST`
- Path: `lead-capture`
- Response Mode: `Respond Immediately`
- **Copy the Production URL** — this goes in your contact form's env var

#### Node 2: AI Classification (HTTP Request)

- Type: `HTTP Request`
- Method: `POST`
- URL: `https://api.groq.com/openai/v1/chat/completions`
- Authentication: `Header Auth` → `Groq API`
- Body (JSON):

  ```json
  {
    "model": "llama-3.1-8b-instant",
    "messages": [
      {
        "role": "system",
        "content": "You are a lead classifier. Respond with ONE word only: HOT, WARM, or COLD.\n\nRules:\n- HOT: Clear project scope, mentions budget, ready to hire, urgent timeline\n- WARM: Interested but vague, needs more info, exploring options\n- COLD: Just browsing, no clear intent, spam, or irrelevant\n\nRespond with only: HOT, WARM, or COLD"
      },
      {
        "role": "user",
        "content": "Scopes: {{ $json.body.projectScopes }}\nMessage: {{ $json.body.message }}"
      }
    ],
    "temperature": 0
  }
  ```

#### Node 3: Parse Classification

- Type: `Set`
- Add field `status`
- Value: `{{ $json.choices[0].message.content.trim().toUpperCase() }}`

#### Node 4: Append to Google Sheets

- Type: `Google Sheets → Append Row`
- Credential: `Google Sheets Account`
- Sheet: `Leads`
- Columns to map:
  - `Timestamp` → `{{ $json.body.timestamp }}`
  - `Name` → `{{ $json.body.name }}`
  - `Email` → `{{ $json.body.email }}`
  - `Phone` → `{{ $json.body.phone }}`
  - `Scopes` → `{{ $json.body.projectScopes.join(", ") }}`
  - `Message` → `{{ $json.body.message }}`
  - `Status` → `{{ $json.status }}`
  - `Source` → `{{ $json.body.source }}`
  - `FollowUpSent` → `No`
  - `Notes` → *(leave empty)*

#### Node 5: Email Yourself

- Type: `Gmail → Send`
- Credential: `Gmail Account`
- To: `your@email.com`
- Subject: `New {{ $json.status }} Lead: {{ $json.body.name }}`
- Body:

  ```text
  Name: {{ $json.body.name }}
  Email: {{ $json.body.email }}
  Phone: {{ $json.body.phone }}
  Scopes: {{ $json.body.projectScopes.join(", ") }}
  Status: {{ $json.status }}
  Message: {{ $json.body.message }}
  ```

#### Node 6: Webhook Response

- Type: `Respond to Webhook`
- Response: `{ "success": true }`

**Connect all nodes, save, and activate the workflow.**

### Step 1.7 — Update Your Contact Form

In your `ContactSection.tsx`, the env var `VITE_LEAD_WEBHOOK_URL` should be the **production webhook URL** from Node 1.

For local testing:

```bash
# .env.local
VITE_LEAD_WEBHOOK_URL=http://localhost:5678/webhook/lead-capture
```

For production (VPS later):

```bash
# .env
VITE_LEAD_WEBHOOK_URL=https://your-domain.com/webhook/lead-capture
```

### Step 1.8 — Test It

1. Restart `npm run dev`
2. Fill out your contact form
3. Submit
4. Check:
   - ✅ New row in Google Sheets
   - ✅ Email in your inbox
   - ✅ Status is HOT / WARM / COLD

**If this works, Phase 1 is done.** Do not move on until this is reliable.

---

## Phase 2: One Follow-Up (Week 3–4)

**Goal:** If a lead does not reply within 48 hours, send ONE polite follow-up.

### Step 2.1 — Add a "Reply Detected" Column

In your Google Sheet, add a new column: `Replied`

Default: `No`

### Step 2.2 — Create a New Workflow: Follow-Up Checker

This workflow runs **every 6 hours** and checks for leads older than 48h with `FollowUpSent = No` and `Replied = No`.

#### Node 1: Schedule Trigger

- Type: `Schedule Trigger`
- Interval: `Every 6 hours`

#### Node 2: Read Google Sheet

- Type: `Google Sheets → Read`
- Sheet: `Leads`
- Range: `A2:K` *(all rows)*

#### Node 3: Filter

- Type: `Filter`
- Conditions (ALL must be true):
  - `Status` is not `COLD`
  - `FollowUpSent` equals `No`
  - `Replied` equals `No`
  - `Timestamp` is older than `48 hours`

#### Node 4: Send Follow-Up Email

- Type: `Gmail → Send`
- To: `{{ $json.Email }}`
- Subject: `Following up on your project inquiry`
- Body:

  ```text
  Hi {{ $json.Name }},

  I wanted to follow up on your recent inquiry about {{ $json.Scopes }}.

  If you're still exploring options, I'd love to help. Just reply here and I'll get back to you within a few hours.

  Best,
  Arsalan
  ```

#### Node 5: Update Sheet Row

- Type: `Google Sheets → Update Row`
- Match on `Email`
- Set `FollowUpSent` → `Yes`

**Activate the workflow.**

### Step 2.3 — Mark Replies Manually (For Now)

Gmail has no reliable "has this person replied?" API without thread parsing. For MVP:

1. When you reply to a lead, manually set `Replied` → `Yes` in the sheet
2. Or: build a Gmail "Watch" trigger (Phase 3)

This is fine. The goal is one follow-up, not automated reply detection.

### Step 2.4 — Test It

1. Submit a test form
2. Manually backdate the `Timestamp` in the sheet to 3 days ago
3. Wait for the next 6-hour cron OR run the workflow manually
4. Check:
   - ✅ Follow-up email sent
   - ✅ `FollowUpSent` = `Yes` in sheet
   - ✅ Second run does NOT re-send (idempotent)

**Phase 2 done.** You now have a safety net.

---

## Phase 3: AI Q&A with RAG (Month 2)

**Goal:** The AI can answer simple questions about your work using only your portfolio data.

### Step 3.1 — Deploy Qdrant (Vector DB)

```bash
docker run -p 6333:6333 qdrant/qdrant
```

Qdrant runs at `http://localhost:6333`.

### Step 3.2 — Prepare Your Knowledge Base

Create `knowledge/*.md` files with:

- `about.md` — your bio, stack, experience
- `projects.md` — project descriptions
- `services.md` — what you offer, pricing ranges
- `faq.md` — common questions

### Step 3.3 — Embed & Upload

Write a Node.js script to:

1. Read each markdown file
2. Chunk into `500-token segments
3. Embed via Groq embedding API (or use `text-embedding-3-small` from OpenAI's free trial)
4. Upload to Qdrant collection `portfolio`

*(This is a coding task — you already know Node.js, so this is familiar territory.)*

### Step 3.4 — Add RAG Node to Workflow

In your follow-up workflow, when a lead replies with a question:

1. **Node:** Embed the question
2. **Node:** Search Qdrant for top 3 chunks
3. **Node:** Call Groq with the chunks as context
4. **Node:** Draft reply → **email it to YOU for approval** (do not auto-send)

**Human-in-the-loop until you trust it.** After 20 approved drafts, you can flip to auto-send.

### Step 3.5 — Hallucination Prevention

Two rules:

1. **The system prompt** must say: *"Answer only from the provided context. If the answer is not in the context, say 'I'll connect you with Arsalan for that.'"*
2. **Temperature = 0** for factual answers

---

## Phase 4: WhatsApp + Memory (Month 2–3)

**Goal:** Leads can continue conversation on WhatsApp; AI remembers past context.

### Step 4.1 — WhatsApp Business Cloud API

1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Create a Meta Business app
3. Enable WhatsApp
4. Get your test phone number (free, 1,000 conversations/month)
5. Connect to n8n via HTTP Request nodes

### Step 4.2 — Session Memory

For each phone number, store last 10 messages in Redis:

```bash
docker run -p 6379:6379 redis
```

n8n nodes:

- **Get memory** → Redis GET `session:{phone}`
- **Append message** → Redis SET with TTL 7 days
- **Send to AI** → Include memory in prompt

### Step 4.3 — Unify Email + WhatsApp

Same lead, two channels. Sync both to the same row in Google Sheets (match on email OR phone).

**This is complex. Do not start Phase 4 until Phase 1-3 are running for 2+ weeks without issues.**

---

## Phase 5: Self-Improvement (Month 3+)

**Goal:** System learns from mistakes.

**Forget fine-tuning.** Do this instead:

### Step 5.1 — Log Every AI Decision

Add a new sheet `AILog`:

```text
Timestamp | LeadEmail | ActionType | Input | Output | WasGood | Notes
```

Log every classification, draft, and reply.

### Step 5.2 — Weekly Review

Every Sunday:

1. Open `AILog`
2. Mark `WasGood` = Yes/No
3. Note what went wrong in `Notes`
4. Update your prompts based on patterns

**This is self-improvement.** Human-in-the-loop is not a weakness — it is how real AI systems are built.

---

## Hosting: From Local to Production

### Phase 1: Local

- Run n8n on your laptop
- Only works when laptop is on
- Fine for testing

### Phase 2: VPS (when you need 24/7)

- **Hetzner** (€4/month) — cheapest, reliable
- **DigitalOcean** ($6/month) — easier UI
- **Contabo** ($5/month) — more RAM
- Install n8n with Docker Compose
- Add nginx + SSL via Caddy

### Phase 3: Scale

- Only when you hit limits
- Then consider n8n Cloud or managed hosting

**Budget reality:** $5–15/month for production. Not free, but negligible for a business.

---

## What NOT to Build (Yet)

- ❌ Auto-negotiation
- ❌ Auto-quotation sending
- ❌ Upwork automation (Phase 6+, and Upwork may prohibit it)
- ❌ Fine-tuning
- ❌ Multi-agent orchestration
- ❌ Competitor research automation

**Every "no" here is a protection.** You have no sales experience yet. Let the AI assist, not replace, until you understand what good looks like.

---

## Your Weekly Rhythm

| Day | Task |
|-----|------|
| Mon | Review `AILog`, fix any misclassifications |
| Wed | Check `FollowUpSent` counts, adjust timing if needed |
| Fri | Backup Google Sheets to local CSV |
| Sun | Update prompts based on the week's patterns |

---

## Success Metrics (Track These)

1. **Response time** — % of leads replied to within 24h (target: 100%)
2. **Classification accuracy** — % of HOT leads that were actually hot (target: >70%)
3. **Follow-up reply rate** — % of follow-ups that got a response (target: >20%)
4. **No dropped leads** — every form submission has a sheet row (target: 100%)

If any metric drops, pause new features and fix the pipeline.

---

## The Golden Rule

> **Capture → Classify → Notify → Follow-up. That is the entire MVP.**

Everything else is a Phase 2+ improvement. Build the MVP. Use it for 30 days. Then decide what is next.

You are not building a manager. You are building a safety net for your leads.

The manager comes after the safety net has caught 50 leads without dropping one.

---

## Quick Reference: Env Vars

```bash
# .env.local (development)
VITE_LEAD_WEBHOOK_URL=<http://localhost:5678/webhook/lead-capture>

# .env (production, on VPS)
VITE_LEAD_WEBHOOK_URL=<https://your-domain.com/webhook/lead-capture>

# n8n credentials (set in n8n UI, not .env)
- Groq API Key
- Google Sheets OAuth2
- Gmail OAuth2
```

## Quick Reference: Google Sheet Schema

```text
A: Timestamp       | ISO 8601
B: Name            | string
C: Email           | string
D: Phone           | string (optional)
E: Scopes          | comma-separated
F: Message         | text
G: Status          | HOT / WARM / COLD
H: Source          | e.g. "Portfolio Lead Form"
I: FollowUpSent    | Yes / No
J: Replied         | Yes / No
K: Notes           | free text
```

## Quick Reference: n8n Workflow Names

- `lead-capture` — Phase 1 (webhook → classify → sheet → email you)
- `lead-followup` — Phase 2 (cron → check stale → send follow-up)
- `lead-rag-reply` — Phase 3 (reply → RAG → draft → email you)
- `lead-whatsapp` — Phase 4 (WhatsApp → memory → AI → reply)

---

## Final Checklist Before Launch

- [ ] Contact form submits to webhook (test with curl)
- [ ] n8n receives webhook and classifies lead
- [ ] Google Sheet row created with all fields
- [ ] Email notification arrives in your inbox
- [ ] Follow-up workflow runs and sends only once
- [ ] `FollowUpSent` flag prevents duplicate sends
- [ ] Webhook URL is in `.env`, not hardcoded
- [ ] GitHub Actions has `VITE_LEAD_WEBHOOK_URL` secret
- [ ] You have reviewed 10+ AI classifications manually
- [ ] You trust the HOT/WARM/COLD logic

When all boxes are checked, you have shipped your MVP.

Now go capture some leads.

---

*Last updated: [date]*
*Owner: Arsalan*
*Status: MVP in progress*
