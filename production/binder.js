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
    h += '<div class="film"><span class="lab" style="color:#9cc3a4">Mentorship · Film &amp; send to Mike</span><br>' + esc(wk.film) + "</div></div>";
    return h;
  }

  function instrPane(wk) {
    var s = wk.instr;
    var h = beat("hook", "Open · A/W", s.open, "Start mid-scene if you can. No intro. No names.");
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
    if (kind === "mot") {
      var m = wk.mot;
      return "WEEK " + wk.w + " · " + wk.title.toUpperCase() + " · MOTIVATION\n\n" + [m.hook, m.truth, m.turn, "[pause]", m.nail, m.ask].join("\n\n");
    }
    var s = wk.instr, out = "WEEK " + wk.w + " · " + wk.title.toUpperCase() + " · INSTRUCTION\n\n" + s.open + "\n\n";
    (s.beats || []).forEach(function (b) { out += "[" + b[0] + "] " + b[1] + "\n\n"; });
    return out + "[MISTAKE] " + s.mistake + "\n\n[ADAPTED] " + s.adapt + "\n\n[pause]\n" + s.nail;
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
      var txt = teleprompter(index[card.dataset.w], t.dataset.copy);
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
