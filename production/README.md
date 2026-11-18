# 52-Week Production Binder (internal)

Open `production/index.html` in a browser (or run `python3 -m http.server` from the repo root and go to `/production/`).

Each of the 52 weeks has four tabs:
- **Motivation:** a 45–60 second talking-head script for Shot A: hook, truth, turn, nail, and "this week."
- **Lesson Guide:** the written lesson members read. It covers why, gear, safety, steps, the ground-only/adapted version, signs it's working, when to stop, the practice plan, and the Mentorship "film & send" assignment.
- **Instruction:** a narrated demo script with a camera setup for every beat, the common mistake, the adapted demo, and the nail line.
- **Shot Sheet:** a numbered shot list using the four standard setups: A Authority Stand, W Work Shot, C Close Read, D Detail.

**Recruiting (before Month 1):** three short videos (R1 Fear, R2 After the Accident, R3 Your Body) that ask viewers to comment GROUND. Each has a script, a caption with hashtags, a shot sheet, and a reply plan for the comments. Use them to fill the 15-person founding group. Content lives in `production/data/recruiting.js`.

**Tiers:** Entry = weeks 1–4 (Month 1). Core = all 52. Mentorship = Core, plus the weekly Film & Send and a monthly live call (topic shown under each month).

**Buttons:** "Copy for teleprompter" puts a clean script on your clipboard. "Print this week" prints one week with all four parts.

**Editing:** content lives in `production/data/m01-02.js` through `m11-12.js`, one object per week.

`netlify.toml` blocks `/production/` on the public site. If you host somewhere else, don't upload this folder.
