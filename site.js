"use strict";

function versionOf(value) {
  return typeof value === "string" && /^\d+\.\d+\.\d+$/.test(value.trim()) ? value.trim() : null;
}

function sha256(value) {
  return typeof value === "string" && /^[a-f0-9]{64}$/i.test(value.trim()) ? value.trim().toLowerCase() : null;
}

function zipHref(file, version) {
  if (typeof file !== "string" || !version) return null;
  const value = file.trim();
  const name = `Chengsheng-${version}-arm64.zip`;
  if (value.includes("\\") || value.includes("..") || /[\s"'<>?#]/.test(value)) return null;
  if (value === name) return `/downloads/${name}`;
  if (!value.startsWith("https://")) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash) return null;
    if (url.pathname.split("/").pop() !== name) return null;
    return `${url.origin}${url.pathname}`;
  } catch {
    return null;
  }
}

function fileName(url) {
  return String(url).split("/").pop();
}

function fill(selector, value) {
  document.querySelectorAll(selector).forEach((node) => { node.textContent = value; });
}

function startRelease() {
  const status = document.querySelector("#status");
  const release = document.querySelector("span[data-release]");
  if (!status || !release) return;
  const stamped = release.textContent.trim();
  let currentVersion = stamped;
  let clickedVersion = "";
  let clickedStatus = status;
  let token = 0;
  let activeController = null;
  const retry = document.querySelector("#retry-feed");

  function say(message, alert = false, target = status) {
    target.textContent = message;
    target.toggleAttribute("data-alert", alert);
  }

  async function load() {
    const requestToken = ++token;
    if (activeController) activeController.abort();
    const controller = typeof AbortController === "function" ? new AbortController() : null;
    activeController = controller;
    const timer = controller ? window.setTimeout(() => controller.abort(), 8000) : 0;
    retry.hidden = true;
    if (!clickedVersion) say("正在检查新版，当前安装包可下载。");
    try {
      const response = await fetch("/downloads/latest-mac.json", { cache: "no-cache", signal: controller?.signal });
      if (!response.ok) throw new Error("http");
      const feed = await response.json();
      if (requestToken !== token) return;
      const version = versionOf(feed?.version);
      const zip = version ? zipHref(feed.file, version) : null;
      const sum = sha256(feed?.sha256);
      if (!version || !zip || !sum) throw new Error("invalid");
      const dmg = zip.replace(/-arm64\.zip$/, "-arm64.dmg");
      document.querySelectorAll('a[data-download="zip"]').forEach((link) => { link.href = zip; });
      document.querySelectorAll('a[data-download="dmg"]').forEach((link) => { link.href = dmg; });
      fill("span[data-release], span[data-release-echo]", version);
      fill('span[data-file="zip"]', fileName(zip));
      fill('span[data-file="dmg"]', fileName(dmg));
      fill("code[data-checksum]", sum);
      currentVersion = version;
      if (clickedVersion && clickedStatus !== status) say("");
      if (clickedVersion && clickedVersion !== version) {
        say(`下载链接已更新为 v${version}。你刚才打开的是 v${clickedVersion}，可重新下载。`, true, clickedStatus);
      } else if (!clickedVersion && version !== stamped) {
        say(`下载链接已更新为 v${version}，页面功能说明对应 v${stamped}。`, true);
      } else if (!clickedVersion) {
        say("");
      }
    } catch (error) {
      if (requestToken !== token) return;
      let reason = "无法检查新版，请检查网络或稍后重试。";
      if (error.name === "AbortError") reason = "检查新版超时，请稍后重试。";
      else if (error.message === "invalid" || error instanceof SyntaxError) reason = "新版信息暂时无法核对，请稍后重试。";
      else if (error.message === "http") reason = "暂时无法检查新版，请稍后重试。";
      say(`${reason} 仍可下载 v${currentVersion}。`, true);
      retry.hidden = false;
    } finally {
      if (timer) window.clearTimeout(timer);
    }
  }

  retry.addEventListener("click", load);
  document.querySelectorAll("a[data-download]").forEach((link) => {
    link.addEventListener("click", () => {
      clickedVersion = currentVersion;
      const type = link.dataset.download === "zip" ? "ZIP" : "DMG";
      clickedStatus = type === "ZIP" ? document.querySelector("#zip-status") : status;
      say(`已打开 ${type} 下载链接。进度请查看浏览器下载列表。`, false, clickedStatus);
    });
  });
  load();
}

function startDemo() {
  const input = document.querySelector("#demo-sentence");
  if (!input) return;
  const row = document.querySelector("#demo-row");
  const state = document.querySelector("#demo-state");
  const feedback = document.querySelector("#demo-feedback");
  const edit = document.querySelector("#edit-demo");
  const render = document.querySelector("#render-demo");
  const reset = document.querySelector("#reset-demo");
  const demo = document.querySelector("#demo");
  const length = document.querySelector("#demo-length");
  const original = input.defaultValue;
  let renderedText = original;
  let timer = 0;
  const compact = () => window.matchMedia("(max-width: 600px)").matches;
  const instructions = () => "修改第三句后，点「演示返修」。" + (compact() ? "" : "Ctrl / ⌘ + Enter 返修，Esc 重置。");
  input.disabled = false;
  document.querySelector("#demo-controls").hidden = false;
  document.querySelector("#demo-label").textContent = "示例 · 不生成音频";
  feedback.textContent = instructions();

  function fitSentence() {
    input.rows = 1;
    const style = window.getComputedStyle(input);
    const padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    if (input.scrollHeight > input.clientHeight + 1) {
      input.rows = Math.max(1, Math.ceil((input.scrollHeight - padding - 1) / parseFloat(style.lineHeight)));
    }
    length.textContent = `${input.value.length} / ${input.maxLength} 字符`;
  }

  function update() {
    fitSentence();
    const text = input.value.trim();
    const changed = text !== renderedText;
    row.classList.toggle("is-changed", changed);
    row.classList.remove("is-complete");
    state.textContent = text ? (changed ? "已改" : "已出声") : "待补文字";
    render.disabled = !text || !changed;
    reset.disabled = input.value === original && renderedText === original;
    feedback.toggleAttribute("data-alert", !text);
    const message = !text ? "请先填写这一句，再演示返修。" : changed ? "第 3 句已改。点「演示返修」。" + (compact() ? "" : "也可按 Ctrl / ⌘ + Enter。") : instructions();
    if (feedback.textContent !== message) feedback.textContent = message;
  }

  function resetDemo() {
    const focusInDemo = demo.contains(document.activeElement);
    window.clearTimeout(timer);
    timer = 0;
    input.readOnly = false;
    edit.disabled = false;
    renderedText = original;
    input.value = original;
    row.classList.remove("is-changed", "is-rendering", "is-complete");
    row.removeAttribute("aria-busy");
    render.querySelector("span").textContent = "演示返修";
    update();
    feedback.textContent = "示例已重置。";
    if (focusInDemo) input.focus({ preventScroll: true });
  }

  function demonstrate() {
    if (render.disabled || timer) return;
    const text = input.value.trim();
    const focusInDemo = demo.contains(document.activeElement);
    input.readOnly = true;
    edit.disabled = true;
    render.disabled = true;
    reset.disabled = false;
    if (focusInDemo) input.focus({ preventScroll: true });
    row.classList.add("is-rendering");
    row.setAttribute("aria-busy", "true");
    state.textContent = "演示中";
    render.querySelector("span").textContent = "正在演示";
    feedback.textContent = "正在演示第 3 句返修…";
    timer = window.setTimeout(() => {
      timer = 0;
      renderedText = text;
      input.readOnly = false;
      edit.disabled = false;
      row.classList.remove("is-changed", "is-rendering");
      row.classList.add("is-complete");
      row.removeAttribute("aria-busy");
      state.textContent = "已出声";
      render.querySelector("span").textContent = "演示返修";
      feedback.textContent = "第 3 句返修演示完成，其余句子未变。";
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 150 : 750);
  }

  input.addEventListener("input", update);
  if (typeof ResizeObserver === "function") {
    let width = 0;
    new ResizeObserver((entries) => {
      const nextWidth = entries[0].contentRect.width;
      if (nextWidth !== width) { width = nextWidth; fitSentence(); }
    }).observe(input);
  } else {
    window.addEventListener("resize", fitSentence);
  }
  document.fonts?.ready.then(fitSentence);
  fitSentence();
  edit.addEventListener("click", () => {
    input.value = "门还虚掩着。";
    update();
    input.focus({ preventScroll: true });
  });
  render.addEventListener("click", demonstrate);
  reset.addEventListener("click", resetDemo);
  demo.addEventListener("keydown", (event) => {
    if (event.key === "Escape") { event.preventDefault(); resetDemo(); }
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) { event.preventDefault(); demonstrate(); }
  });
}

function startNavigation() {
  const menu = document.querySelector(".mobile-nav");
  menu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => { menu.open = false; }));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu?.open) {
      menu.open = false;
      menu.querySelector("summary").focus();
    }
  });
  function openTarget(hash = window.location.hash) {
    const target = document.getElementById(hash.slice(1));
    if (target?.tagName === "DETAILS") target.open = true;
  }
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => { openTarget(link.hash); });
  });
  window.addEventListener("hashchange", () => { openTarget(); });
  openTarget();
}

function showPlatform() {
  const agent = navigator.userAgent || "";
  const touchMac = /Macintosh/.test(agent) && navigator.maxTouchPoints > 1;
  if (/Windows|Android|iPhone|iPad|iPod|CrOS|Linux/.test(agent) || touchMac) {
    const note = document.querySelector("#os-note");
    if (note) note.hidden = false;
    document.querySelectorAll('a[data-download]').forEach((link) => {
      if (link.dataset.download === "dmg") link.setAttribute("data-incompatible", "true");
      link.setAttribute("aria-describedby", "platform-limit os-note");
    });
    fill("[data-download-label]", "保存 Mac 安装包");
  }
}

startRelease();
startDemo();
startNavigation();
showPlatform();
