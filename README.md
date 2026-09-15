# MedClear AI
### GatewayHacks 2026 — Track 1: Accessibility & Health

**One-liner:** Upload a medical bill, prescription, or lab report → get it explained in plain language (English/Hindi), read aloud, and checked for red flags (overcharges, drug interactions).

**Why this problem:** Medical documents are dense, jargon-heavy, and inaccessible to elderly, low-literacy, and non-English-speaking patients — a real, documented pain point that fits Track 1 exactly ("a tool that helps patients easily read and understand medical bills").

**Deadline:** Oct 2, 2026 @ 9:30am GMT+5:30

---

## Architecture

```
User uploads image/PDF
    → OCR (extract raw text)
    → LLM simplification layer (plain-language rewrite + red-flag detection)
    → Next.js frontend (display + TTS + language toggle)
```

## Tech Stack
- **Backend:** FastAPI (Python)
- **Frontend:** Next.js
- **AI/ML:** OCR (Tesseract / cloud OCR API) + LLM (Claude/GPT API) for simplification
- **DB:** SQLite/Postgres for saved reports (optional, if time allows)
- **Deploy:** Vercel (frontend) + Render/Railway (backend)

---

## Team & Roles
Each person owns their part end-to-end — build it, test it, ship it.

### Kanchan — AI Engine
- Prompt design for plain-language simplification of OCR'd text
- Red-flag/anomaly detection logic (overcharges, drug interaction warnings)
- Exposes a clean function/API that backend calls
- Folder: `/ai-engine`

### Abhishek — Backend
- FastAPI service: file upload endpoint, OCR pipeline (image/PDF → text)
- API routes that call the AI engine and return results
- Backend deployment (Render/Railway)
- Folder: `/backend`

### Ishank — Frontend
- Next.js UI: upload flow, results display, language toggle (English/Hindi)
- Accessibility features: text-to-speech playback, large-font/high-contrast mode
- Connects frontend to backend API
- Folder: `/frontend`

### Muskan — Docs, QA & Submission
- End-to-end testing with sample bills/prescriptions, bug logging
- Devpost project page copy, pitch deck/slides
- Video pitch script + editing
- Folder: `/docs`

---

## Timeline (4 weeks)
| Week | Milestone |
|---|---|
| 1 | Team setup, Discord joined, repo structure live, OCR pipeline prototype, wireframes |
| 2 | Backend API + LLM simplification engine working end-to-end (CLI/Postman level) |
| 3 | Frontend integrated, TTS + language toggle working, first full demo run |
| 4 | Polish, bug fixes, red-flag detection tuned, record video, write Devpost page, submit |

## Submission Checklist
- [ ] Devpost project page (title, problem description, 1+ visual)
- [ ] Video pitch (max 5 min)
- [ ] GitHub repo link (public)
- [ ] Track selected: Accessibility & Health
- [ ] Join Gateway Discord (mandatory)
