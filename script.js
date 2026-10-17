(function () {
  "use strict";
  var $ = function (s) { return document.querySelector(s); }, $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
  var root = document.documentElement, reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- Loader: hides on real page load (min 900ms for smoothness), hard cap 3s, CSS also force-hides at 4.5s
  var loader = $("#loader"), start = Date.now(), closed = false;
  function closeLoader() {
    if (closed) return; closed = true;
    var wait = Math.max(0, (reduce ? 0 : 900) - (Date.now() - start));
    setTimeout(function () { loader.classList.add("done"); document.body.classList.add("ready"); reveal(); setTimeout(function () { loader.style.display = "none"; }, 900); }, wait);
  }
  if (document.readyState === "complete") closeLoader(); else window.addEventListener("load", closeLoader);
  setTimeout(closeLoader, 3000);
  window.addEventListener("error", closeLoader);

  // ---- Theme (remembers choice where storage is available)
  $("#theme").addEventListener("click", function () {
    var dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  });

  // ---- Mobile menu
  var burger = $("#burger"), menu = $("#menu");
  function setMenu(open) { menu.classList.toggle("open", open); burger.setAttribute("aria-expanded", String(open)); burger.textContent = open ? "Close" : "Menu"; }
  burger.addEventListener("click", function () { setMenu(!menu.classList.contains("open")); });
  menu.addEventListener("click", function (e) { if (e.target.tagName === "A") setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  // ---- Scroll progress
  var bar = $("#progress");
  function prog() { var h = root.scrollHeight - innerHeight; bar.style.width = (h > 0 ? scrollY / h * 100 : 0) + "%"; }
  addEventListener("scroll", prog, { passive: true }); prog();

  // ---- Scroll reveal (content stays visible if IntersectionObserver is missing)
  function reveal() {
    var els = $$(".rv");
    if (!("IntersectionObserver" in window) || reduce) { els.forEach(function (el) { el.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }); }, { threshold: .12 });
    els.forEach(function (el, i) { if (el.closest(".hero")) el.style.transitionDelay = (i * 0.09) + "s"; io.observe(el); });
  }
  setTimeout(function () { $$(".rv").forEach(function (el) { el.classList.add("in"); }); }, 6000); // safety net

  // ---- Typed line
  var words = ["web applications", "Flask projects", "clean interfaces", "practical software"], el = $("#typed"), w = 0, c = 0, del = false;
  if (reduce) { el.textContent = words[0]; } else (function tick() {
    var word = words[w]; c += del ? -1 : 1; el.textContent = word.slice(0, c);
    var t = del ? 40 : 85;
    if (!del && c === word.length) { del = true; t = 1500; } else if (del && c === 0) { del = false; w = (w + 1) % words.length; t = 350; }
    setTimeout(tick, t);
  })();

  // ---- Project filters
  $$(".fbtn").forEach(function (b) {
    b.addEventListener("click", function () {
      $$(".fbtn").forEach(function (x) { x.classList.remove("on"); x.setAttribute("aria-pressed", "false"); });
      b.classList.add("on"); b.setAttribute("aria-pressed", "true");
      $$(".proj").forEach(function (p) { p.hidden = !(b.dataset.f === "all" || p.dataset.cat === b.dataset.f); });
    });
  });

  // ---- Contact form: validates, then prepares an email in the visitor's own mail app
  $("#form").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target, st = $("#status"), ok = true;
    $$("#form [required]").forEach(function (i) {
      var bad = !i.value.trim() || (i.type === "email" && !/^\S+@\S+\.\S+$/.test(i.value));
      i.classList.toggle("bad", bad); i.setAttribute("aria-invalid", String(bad)); if (bad) ok = false;
    });
    if (!ok) { st.className = "err"; st.textContent = "Please complete every field and use a valid email address."; return; }
    var d = new FormData(f);
    var body = d.get("message") + "\n\nFrom: " + d.get("name") + " (" + d.get("email") + ")";
    location.href = "mailto:hafsaashraf4093@gmail.com?subject=" + encodeURIComponent(d.get("subject")) + "&body=" + encodeURIComponent(body);
    st.className = "ok"; st.textContent = "Your email app should open now. Press send there to deliver the message.";
  });

  $("#year").textContent = new Date().getFullYear();
})();
