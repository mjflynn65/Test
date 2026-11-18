(function () {
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var form = document.getElementById("waitlist-form");
  if (!form) return;
  var statusEl = document.getElementById("form-status");
  var button = form.querySelector("button[type=submit]");
  var endpoint = (window.MFH_CONFIG && window.MFH_CONFIG.WAITLIST_ENDPOINT) || "";

  function setStatus(msg, kind) {
    statusEl.textContent = msg;
    statusEl.className = "form-status" + (kind ? " " + kind : "");
  }

  function validate() {
    var ok = true;
    ["name", "email"].forEach(function (id) {
      var el = form.elements[id];
      var bad = !el.value.trim() || (id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()));
      el.setAttribute("aria-invalid", bad ? "true" : "false");
      if (bad) ok = false;
    });
    if (!ok) { setStatus("Please add your first name and a valid email address.", "err"); return false; }
    if (!form.elements.consent.checked) { setStatus("Please tick the box so we can email you when we open.", "err"); return false; }
    return true;
  }

  function showSuccess(name) {
    var safe = String(name || "").replace(/[<>&"]/g, "");
    form.innerHTML =
      '<div class="form-success">' +
      '<img src="assets/logo-mark.svg" alt="" width="64" height="64" style="margin:0 auto 14px">' +
      "<h3>You're on the Foundation List" + (safe ? ", " + safe : "") + ".</h3>" +
      "<p>Good. You showed up. Watch your inbox for early access to the Foundation Series and your first note from Mike.</p>" +
      "</div>";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (form.elements.company.value) return; // honeypot: likely a bot
    if (!validate()) return;

    var data = new FormData(form);
    var name = data.get("name");
    button.disabled = true;
    setStatus("Saving your place…");

    var request = endpoint
      ? fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
      : fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(data).toString()
        });

    request
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        showSuccess(name);
      })
      .catch(function () {
        button.disabled = false;
        setStatus("Sorry, something went wrong. Please try again in a moment.", "err");
      });
  });
})();
