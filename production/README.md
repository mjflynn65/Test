# 52-Week Production Binder (internal)

Open `production/index.html` in a browser (or run `python3 -m http.server` from the repo root and go to `/production/`).

Each of the 52 weeks has four tabs:
- **Motivation:** a 45–60 second talking-head script for Shot A: hook, truth, turn, nail, and "this week."
- **Lesson Guide:** the written lesson members read. It covers why, gear, safety, steps, the ground-only/adapted version, signs it's working, when to stop, the practice plan, and the Mentorship "film & send" assignment.
- **Instruction:** a narrated demo script with a camera setup for every beat, the common mistake, the adapted demo, and the nail line.
- **Shot Sheet:** a numbered shot list using the four standard setups: A Authority Stand, W Work Shot, C Close Read, D Detail.

**Start Here:** S1 Welcome and S2 Safety Briefing. Every member watches both before Week 1. Content lives in `production/data/start.js`.

**Script style:** Month 1 (Weeks 1–4) is written in Mike's own format: Hook, Truth, Interrupt (with a stage direction), Hope, Nail, then a member close and a social close. The instruction scripts follow his Real Ranch structure: open raw, what's happening, work it, the lesson. Months 2–12 will be rewritten in the same format, one month at a time.

**Recruiting (before Month 1):** three short videos (R1 Fear, R2 After the Accident, R3 Your Body) that ask viewers to comment GROUND. Each has a script, a caption with hashtags, a shot sheet, and a reply plan for the comments. Use them to fill the 15-person founding group. Content lives in `production/data/recruiting.js`.

**Silent Sundays:** Mike's signature practice: every Sunday, work the horse with nothing verbal at all. The section has the script, how members do it, and a guide for the weekly social post (filmed, no talking, on-screen text only). It's introduced in Week 2 and appears at the end of every lesson guide from Week 2 on. Content lives in `production/data/silent.js`.

**Tiers:** Entry = weeks 1–4 (Month 1). Core = all 52. Mentorship = Core, plus the weekly Film & Send and a monthly live call (topic shown under each month).

**Buttons:** "Copy for teleprompter" puts a clean script on your clipboard. "Print this week" prints one week with all four parts.

**Editing:** content lives in `production/data/m01-02.js` through `m11-12.js`, one object per week.

`netlify.toml` blocks `/production/` on the public site. If you host somewhere else, don't upload this folder.

## Founding member kit (`production/kit/`)
Open `production/kit/index.html`. It has:
- **10 messages in send order,** each with a copy button: welcome, the day before, the four weekly openers, the Silent Sunday reminder, feedback, the testimonial request, and what's next.
- **14 feedback-form questions** to paste into a Google Form.
- **Printables,** with ready PDFs in `production/kit/pdf/`:
  - `01-Safety-Checklist.pdf` (1 page, for the tack room)
  - `02-Practice-Sheets-Weeks-1-4.pdf` (8 pages: the lesson plus a 7-day log for each week)
  - `03-My-Journal.pdf` (3 pages: starting point, Silent Sundays, four weeks later)

The practice sheets are built from the binder data, so if a lesson changes, re-print them from `practice-sheets.html`.
