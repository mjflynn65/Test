(function () {
  var P = window.PROGRAM;
  P.months.sort(function (a, b) { return a.m - b.m; });
  var nav = document.getElementById("monthnav");
  var root = document.getElementById("binder");
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }); };
  var setupName = { A: "Authority Stand", W: "Work Shot", C: "Close Read", D: "Detail" };

  function badges(w) {
    var b = "";
    if (w <= 4) b += '<span class="badge b-entry">Entry</span>';
    b += '<span class="badge b-core">Core</span><span class="badge b-mentor">Mentorship</span>';
    return b;
  }
  function li(arr) { return (arr || []).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join(""); }
  function beat(cls, k, say, dir) {
    return '<div class="beat"><div class="k ' + cls + '">' + k + '</div><div class="v"><span class="say">' + esc(say) + "</span>" + (dir ? '<span class="dir">' + esc(dir) + "</span>" : "") + "</div></div>";
  }

  function motivationPane(wk) {
    var m = wk.mot;
    if (m.interrupt) {
      return beat("hook", "Hook · 0–3s", m.hook, "Shot A. Start mid-statement. Under three seconds. Still.") +
        beat("", "Truth · 3–18s", m.truth, "") +
        beat("turn", "Interrupt · 18–22s", m.interrupt, "[" + m.interruptDir + "]") +
        beat("", "Hope · 22–38s", m.hope, "") +
        beat("nail", "Nail · 38–45s", m.nail, "Two seconds of silence first. Say it once. Hold your look after.") +
        beat("ask", "Member close", m.ask, "For the lesson video.") +
        beat("ask", "Social close", m.social, "For the social cut, swap the member close for this.") +
        '<div class="actions"><button class="btn" data-copy="mot">Copy for teleprompter</button><button class="btn alt" data-copy="motsocial">Copy social version</button></div>';
    }
    return beat("hook", "Hook · 0–5s", m.hook, "Shot A. Flat and direct. Don't move. Let it land.") +
      beat("", "Truth · 5–25s", m.truth, "") +
      beat("turn", "Turn · 25–45s", m.turn, "Lean in slightly, or shift your tone quieter. It resets attention.") +
      beat("nail", "Nail · 45–60s", m.nail, "Two seconds of silence before. Say it once. Hold your look after.") +
      beat("ask", "This week", m.ask, "The member close. Tell them exactly what to go do.") +
      '<div class="actions"><button class="btn" data-copy="mot">Copy for teleprompter</button></div>';
  }

  function guidePane(wk, month) {
    var g = wk.guide;
    var gear = g.gear || ["Rope halter and 12–14 ft lead", "Gloves", "Boots with a heel"];
    var h = '<div class="gsec"><h4>Why this matters</h4><p>' + esc(g.why) + "</p>";
    h += '<div class="cols"><div><h4>What you need</h4><ul>' + li(gear) + "</ul></div>";
    h += "<div><h4>Safety this week</h4><ul><li>Do the every-session safety check first.</li>" + li(g.safety) + "</ul></div></div>";
    h += "<h4>Step by step</h4><ol>" + li(g.steps) + "</ol>";
    h += '<div class="adapt"><strong>Ground-only &amp; adapted version.</strong> ' + esc(g.adapt) + "</div>";
    h += '<div class="cols"><div><h4>It\'s working when</h4><ul>' + li(g.signs) + "</ul></div>";
    h += '<div><div class="stop"><strong>Stop and go back a step if</strong><ul>' + li(g.stop) + "</ul></div></div></div>";
    h += "<h4>Your practice plan</h4><p>" + esc(g.plan) + "</p>";
    if (P.silent && wk.w >= 2) {
      h += '<div class="adapt" style="border-left-color:#8fb3c4;background:rgba(143,179,196,.07)"><strong>' + (wk.w === 2 ? "New this week: Silent Sundays begin. " : "Silent Sunday. ") + "</strong>" +
        (wk.w === 2 ? esc(P.silent.idea) + " " : "") +
        "This Sunday, repeat this week's exercise with nothing verbal at all. Before and after, write your number and one word for what you're feeling.</div>";
    }
    h += '<div class="film"><span class="lab" style="color:#9cc3a4">Mentorship · Film &amp; send to Mike</span><br>' + esc(wk.film) + "</div></div>";
    return h;
  }

  function instrPane(wk) {
    var s = wk.instr;
    var h = beat("hook", s.happening ? "Open raw · 0–5s" : "Open · A/W", s.open, "Start mid-scene. No intro. No names.");
    if (s.happening) h += beat("", "What's happening · 5–20s", s.happening, "Shot W. Name it plainly.");
    (s.beats || []).forEach(function (b, i) {
      h += beat("", "Step " + (i + 1) + " · " + b[0], b[1], setupName[b[0]] ? "Shot " + b[0] + " · " + setupName[b[0]] : "");
    });
    h += beat("turn", "The common mistake", s.mistake, "Show it if you can, then show the fix.");
    h += beat("", "Adapted demo · W", s.adapt, "Film this too. Seated, ground-only, or with a helper.");
    h += beat("nail", "Nail · A", s.nail, "Back to camera. Silence first.");
    h += '<div class="actions"><button class="btn" data-copy="instr">Copy for teleprompter</button></div>';
    return h;
  }

  function shotsPane(wk) {
    var rows = [["A", "Motivation: “" + wk.mot.hook + "”", "Full take, top to bottom, 2–3 times. Keep the best one whole. Don't cut it up."]];
    (wk.shots || []).forEach(function (s) { rows.push(s); });
    rows.push(["W", "Adapted / ground-only demo", wk.instr.adapt]);
    rows.push(["A", "Nail line pickups", "Say both nail lines clean, 3 takes each. They're your social clips: “" + wk.mot.nail + "”"]);
    var h = '<table class="shots"><thead><tr><th>#</th><th>Setup</th><th>Shot</th><th>Notes</th></tr></thead><tbody>';
    rows.forEach(function (r, i) {
      h += '<tr><td>' + (i + 1) + '</td><td class="c">' + r[0] + " · " + (setupName[r[0]] || "") + "</td><td>" + esc(r[1]) + "</td><td>" + esc(r[2] || "") + "</td></tr>";
    });
    h += "</tbody></table>";
    h += '<p style="margin-top:12px;font-size:.9rem;color:var(--dust)">Social cut: the hook + truth + nail from the motivation take makes a 30–45 sec Reel. The best Close Read (C) shot is the B-roll under it.</p>';
    h += '<div class="actions"><button class="btn alt" data-print="1">Print this week</button></div>';
    return h;
  }

  function teleprompter(wk, kind) {
    if ((kind === "mot" || kind === "motsocial") && wk.mot.interrupt) {
      var n = wk.mot;
      return "WEEK " + wk.w + " · " + wk.title.toUpperCase() + (kind === "motsocial" ? " · SOCIAL" : " · MOTIVATION") + "\n\n" +
        [n.hook, n.truth, "[" + n.interruptDir + "]", n.interrupt, n.hope, "[pause]", n.nail, kind === "motsocial" ? n.social : n.ask].join("\n\n");
    }
    if (kind === "mot") {
      var m = wk.mot;
      return "WEEK " + wk.w + " · " + wk.title.toUpperCase() + " · MOTIVATION\n\n" + [m.hook, m.truth, m.turn, "[pause]", m.nail, m.ask].join("\n\n");
    }
    var s = wk.instr, out = "WEEK " + wk.w + " · " + wk.title.toUpperCase() + " · INSTRUCTION\n\n" + s.open + "\n\n" + (s.happening ? s.happening + "\n\n" : "");
    (s.beats || []).forEach(function (b) { out += "[" + b[0] + "] " + b[1] + "\n\n"; });
    return out + "[MISTAKE] " + s.mistake + "\n\n[ADAPTED] " + s.adapt + "\n\n[pause]\n" + s.nail;
  }

  // ---- Start Here section (welcome + safety briefing) ----
  var ST = P.start;
  if (ST) {
    var sta = document.createElement("a");
    sta.href = "#start"; sta.textContent = "Start Here"; sta.style.color = "var(--gold)";
    nav.appendChild(sta);
    var sts = document.createElement("section");
    sts.className = "month"; sts.id = "start";
    sts.innerHTML = '<div class="month-head"><div><div class="lab">Before Week 1 · Every member</div><h2>Start Here <em>Welcome &amp; safety.</em></h2><div class="month-meta">' + esc(ST.goal) + "</div></div></div>";
    ST.videos.forEach(function (v, i) {
      var shots = '<table class="shots"><thead><tr><th>#</th><th>Setup</th><th>Shot</th><th>Notes</th></tr></thead><tbody>' +
        v.shots.map(function (r, j) { return "<tr><td>" + (j + 1) + '</td><td class="c">' + r[0] + " · " + setupName[r[0]] + "</td><td>" + esc(r[1]) + "</td><td>" + esc(r[2]) + "</td></tr>"; }).join("") +
        '</tbody></table><div class="actions"><button class="btn alt" data-print="1">Print this video</button></div>';
      var d = document.createElement("details");
      d.className = "week"; d.id = "start-" + (i + 1); d.dataset.st = i;
      d.innerHTML = '<summary><div class="wnum">' + v.id + '</div><div><div class="wtitle">' + esc(v.title) + '</div><div class="waim">' + esc(v.aim) + '</div></div><div class="wbadges"><span class="badge b-entry">Entry</span><span class="badge b-core">Core</span><span class="badge b-mentor">Mentorship</span></div></summary>' +
        '<div class="tabs" role="tablist"><button class="on" data-tab="0">Script</button><button data-tab="1">Shot Sheet</button></div>' +
        '<div class="pane on">' + v.beats.map(function (b) { return beat(b[0], b[1], b[2], b[3]); }).join("") +
        '<div class="actions"><button class="btn" data-copy="start">Copy for teleprompter</button></div></div><div class="pane">' + shots + "</div>";
      sts.appendChild(d);
    });
    root.appendChild(sts);
  }

  // ---- Recruiting section (founding group) ----
  var R = P.recruiting;
  function recScript(v) {
    return beat("hook", "Hook · 0–4s", v.hook, "Shot A. Slow. Look right at the lens. Quieter than a Hard Truth video.") +
      beat("", "Truth · 4–20s", v.truth, "") +
      beat("turn", "Turn · 20–35s", v.turn, "Lean in slightly. Even quieter.") +
      beat("nail", "Nail · 35–45s", v.nail, "Two seconds of silence first.") +
      beat("ask", "Invite · 45–55s", v.invite, "Warm and plain. No sales voice.") +
      '<div class="actions"><button class="btn" data-copy="rec">Copy for teleprompter</button></div>';
  }
  function recCaption(v) {
    return '<p class="say">' + esc(v.caption) + '</p><p style="color:var(--gold);font-family:var(--label);letter-spacing:.06em">' + esc(v.tags) + "</p>" +
      '<p style="font-size:.9rem;color:var(--dust)">The first line repeats the hook. No greeting. 3–5 hashtags. On Instagram, add “👇 Save this if it hit home.”</p>' +
      '<div class="actions"><button class="btn" data-copy="cap">Copy caption</button></div>';
  }
  function recShots(v) {
    var h = '<table class="shots"><thead><tr><th>#</th><th>Setup</th><th>Shot</th><th>Notes</th></tr></thead><tbody>';
    v.shots.forEach(function (r, i) {
      h += "<tr><td>" + (i + 1) + '</td><td class="c">' + r[0] + " · " + setupName[r[0]] + "</td><td>" + esc(r[1]) + "</td><td>" + esc(r[2]) + "</td></tr>";
    });
    return h + '</tbody></table><p style="margin-top:12px;font-size:.9rem;color:var(--dust)">Light in front of you, overcast if possible. Horse out of focus behind you. Never a blank wall. Length: 45–55 seconds.</p>' +
      '<div class="actions"><button class="btn alt" data-print="1">Print this video</button></div>';
  }
  function recReplies() {
    var r = R.replies;
    return '<div class="gsec"><h4>1 · Reply to the comment publicly</h4><p class="say">' + esc(r.publicReply) + "</p>" +
      '<h4>2 · First message: ask before you invite</h4><p class="say">' + esc(r.firstDM) + "</p>" +
      '<h4>3 · The invite: open with what they told you</h4><p class="say">' + esc(r.invite) + "</p>" +
      '<h4>4 · Once 15 are in</h4><p class="say">' + esc(r.full) + "</p>" +
      '<div class="stop"><strong>Never</strong> send the invite before they’ve answered the first message. Asking first gets you a reply, and their answer tells you whether they fit.</div></div>';
  }
  if (R) {
    var ra = document.createElement("a");
    ra.href = "#recruiting"; ra.textContent = "Recruit"; ra.style.color = "var(--rust)";
    nav.appendChild(ra);
    var rs = document.createElement("section");
    rs.className = "month"; rs.id = "recruiting";
    rs.innerHTML = '<div class="month-head"><div><div class="lab">Before Month 1 · Founding group</div><h2>Recruiting <em>Comment ' + esc(R.keyword) + '</em></h2>' +
      '<div class="month-meta">' + esc(R.goal) + '</div><div class="box"><div class="lab">How it works</div><ol>' + li(R.how) + "</ol></div></div></div>";
    R.videos.forEach(function (v, i) {
      var d = document.createElement("details");
      d.className = "week"; d.id = "rec-" + (i + 1); d.dataset.r = i;
      d.innerHTML = '<summary><div class="wnum">' + v.id + '</div><div><div class="wtitle">' + esc(v.title) + '</div><div class="waim">' + esc(v.aim) + '</div></div><div class="wbadges"><span class="badge b-core">Recruiting</span></div></summary>' +
        '<div class="tabs" role="tablist"><button class="on" data-tab="0">Script</button><button data-tab="1">Caption</button><button data-tab="2">Shot Sheet</button><button data-tab="3">Reply Plan</button></div>' +
        '<div class="pane on">' + recScript(v) + '</div><div class="pane">' + recCaption(v) + '</div><div class="pane">' + recShots(v) + '</div><div class="pane">' + recReplies() + "</div>";
      rs.appendChild(d);
    });
    root.appendChild(rs);
  }

  // ---- Silent Sundays section ----
  var S = P.silent;
  if (S) {
    var sa = document.createElement("a");
    sa.href = "#silent"; sa.textContent = "Silent Sun"; sa.style.color = "#8fb3c4";
    nav.appendChild(sa);
    var ss = document.createElement("section");
    ss.className = "month"; ss.id = "silent";
    var sc = S.script;
    var shots = '<table class="shots"><thead><tr><th>#</th><th>Setup</th><th>Shot</th><th>Notes</th></tr></thead><tbody>' +
      S.social.map(function (r, i) { return "<tr><td>" + (i + 1) + '</td><td class="c">' + r[0] + " · " + setupName[r[0]] + "</td><td>" + esc(r[1]) + "</td><td>" + esc(r[2]) + "</td></tr>"; }).join("") + "</tbody></table>";
    ss.innerHTML = '<div class="month-head"><div><div class="lab">Signature practice · Every Sunday from Week 2</div><h2>' + esc(S.name) + " <em>Nothing verbal at all.</em></h2>" +
      '<div class="month-meta">' + esc(S.idea) + "</div></div></div>";
    var d = document.createElement("details");
    d.className = "week"; d.id = "silent-card"; d.dataset.s = "1";
    d.innerHTML = '<summary><div class="wnum">S</div><div><div class="wtitle">Silent Sunday</div><div class="waim">The script, how members do it, and your weekly social post.</div></div><div class="wbadges"><span class="badge b-core">Every week</span></div></summary>' +
      '<div class="tabs" role="tablist"><button class="on" data-tab="0">Script</button><button data-tab="1">How Members Do It</button><button data-tab="2">Weekly Social Post</button></div>' +
      '<div class="pane on">' +
        beat("hook", "Hook · 0–3s", sc.hook, "Shot A. Flat and still.") +
        beat("", "Truth · 3–20s", sc.truth, "") +
        beat("turn", "Interrupt · 20–24s", sc.interrupt, "Really hold the silence. Don't rush it.") +
        beat("", "Hope · 24–42s", sc.hope, "") +
        beat("nail", "Nail · 42–50s", sc.nail, "Silence first.") +
        beat("ask", "Member close", sc.member, "") +
        beat("ask", "Social close", sc.social, "") +
        '<div class="actions"><button class="btn" data-copy="silent">Copy for teleprompter</button></div></div>' +
      '<div class="pane"><div class="gsec"><h4>Every Silent Sunday</h4><ol>' + li(S.howto) + '</ol></div></div>' +
      '<div class="pane">' + shots + '<div class="gsec"><h4>Caption</h4><p class="say">' + esc(S.caption) + '</p><p style="color:var(--gold)">#foundationhorsemanship #horsemanship ' + esc(S.tag) + " #horseowner #groundwork</p>" +
        '<p style="font-size:.9rem;color:var(--dust)">No script, no teleprompter. Film your real Sunday session. Search ' + esc(S.tag) + " before the first post to make sure nobody else is using it.</p></div></div>";
    ss.appendChild(d);
    root.appendChild(ss);
  }

  var index = {};
  P.months.forEach(function (mo) {
    var a = document.createElement("a");
    a.href = "#month-" + mo.m; a.textContent = "M" + mo.m;
    a.title = mo.title; nav.appendChild(a);

    var sec = document.createElement("section");
    sec.className = "month"; sec.id = "month-" + mo.m;
    var weeksRange = mo.weeks[0].w + "–" + mo.weeks[mo.weeks.length - 1].w;
    sec.innerHTML = '<div class="month-head"><div><div class="lab">Month ' + mo.m + " · Weeks " + weeksRange + (mo.m === 1 ? " · Entry product" : "") + "</div><h2>" + esc(mo.title) + " <em>" + esc(mo.tag) + "</em></h2>" +
      '<div class="month-meta">' + esc(mo.goal) + "</div>" +
      (mo.riding ? '<div class="adapt" style="margin-top:10px"><strong>Riding month, always optional.</strong> Every week has a full ground-only path. Say so in every video.</div>' : "") +
      '<div class="mentor-call"><span class="lab" style="color:#9cc3a4">Mentorship · Monthly live call</span><br>' + esc(mo.call) + "</div></div></div>";
    mo.weeks.forEach(function (wk) {
      index[wk.w] = wk;
      var d = document.createElement("details");
      d.className = "week"; d.id = "week-" + wk.w; d.dataset.w = wk.w;
      d.innerHTML = "<summary><div class=\"wnum\">" + (wk.w < 10 ? "0" : "") + wk.w + '</div><div><div class="wtitle">' + esc(wk.title) + '</div><div class="waim">' + esc(wk.aim) + '</div></div><div class="wbadges">' + badges(wk.w) + "</div></summary>" +
        '<div class="tabs" role="tablist"><button class="on" data-tab="0">Motivation</button><button data-tab="1">Lesson Guide</button><button data-tab="2">Instruction</button><button data-tab="3">Shot Sheet</button></div>' +
        '<div class="pane on">' + motivationPane(wk) + '</div><div class="pane">' + guidePane(wk, mo) + '</div><div class="pane">' + instrPane(wk) + '</div><div class="pane">' + shotsPane(wk) + "</div>";
      sec.appendChild(d);
    });
    root.appendChild(sec);
  });

  var sel = document.createElement("select");
  sel.innerHTML = '<option value="">Jump to week…</option>' + Object.keys(index).map(function (w) { return '<option value="' + w + '">Week ' + w + " · " + esc(index[w].title) + "</option>"; }).join("");
  sel.addEventListener("change", function () {
    if (!sel.value) return;
    var d = document.getElementById("week-" + sel.value); d.open = true; d.scrollIntoView({ behavior: "smooth" }); sel.value = "";
  });
  nav.appendChild(sel);

  root.addEventListener("click", function (e) {
    var t = e.target, card = t.closest("details.week");
    if (!card) return;
    if (t.dataset.tab != null) {
      card.querySelectorAll(".tabs button").forEach(function (b) { b.classList.toggle("on", b === t); });
      card.querySelectorAll(".pane").forEach(function (p, i) { p.classList.toggle("on", String(i) === t.dataset.tab); });
    }
    if (t.dataset.copy) {
      var txt, rv = card.dataset.r != null ? R.videos[card.dataset.r] : null;
      if (t.dataset.copy === "start") { var sv = ST.videos[card.dataset.st]; txt = sv.id + " · " + sv.title.toUpperCase() + "\n\n" + sv.beats.map(function (b) { return b[2]; }).join("\n\n"); }
      else if (t.dataset.copy === "silent") { var q = S.script; txt = "SILENT SUNDAY\n\n" + [q.hook, q.truth, q.interrupt, q.hope, "[pause]", q.nail, q.member].join("\n\n"); }
      else if (t.dataset.copy === "rec") txt = rv.id + " · " + rv.title.toUpperCase() + "\n\n" + [rv.hook, rv.truth, rv.turn, "[pause]", rv.nail, rv.invite].join("\n\n");
      else if (t.dataset.copy === "cap") txt = rv.caption + "\n\n" + rv.tags;
      else txt = teleprompter(index[card.dataset.w], t.dataset.copy);
      (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(function () {
        var toast = document.getElementById("toast"); toast.classList.add("show"); setTimeout(function () { toast.classList.remove("show"); }, 1800);
      }).catch(function () { window.prompt("Copy this:", txt); });
    }
    if (t.dataset.print) {
      document.querySelectorAll(".target,.has-target").forEach(function (el) { el.classList.remove("target", "has-target"); });
      card.classList.add("target"); card.closest(".month").classList.add("has-target");
      document.body.classList.add("print-one"); card.open = true;
      window.print();
      setTimeout(function () { document.body.classList.remove("print-one"); }, 500);
    }
  });

  if (location.hash.indexOf("#week-") === 0) { var d = document.querySelector(location.hash); if (d) d.open = true; }
})();
