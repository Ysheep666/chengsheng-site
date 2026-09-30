const status = document.querySelector("#status");
const release = document.querySelector("[data-release]");
const checksum = document.querySelector("[data-checksum]");

function versionOf(value) {
  return typeof value === "string" && /^\d+\.\d+\.\d+$/.test(value.trim()) ? value.trim() : null;
}

function sha256(value) {
  if (typeof value !== "string" || !/^[a-f0-9]{64}$/i.test(value.trim())) return null;
  return value.trim().toLowerCase();
}

function zipHref(file, version) {
  if (typeof file !== "string" || !version) return null;
  const value = file.trim();
  const name = `Chengsheng-${version}-arm64.zip`;
  if (value.includes("\\") || value.includes("..") || /[\s"'<>]/.test(value)) return null;
  if (value === name) return `downloads/${name}`;
  if (!value.startsWith("https://")) return null;
  let url;
  try {
    url = new URL(value);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash) return null;
  if (url.pathname.split("/").pop() !== name) return null;
  return `${url.origin}${url.pathname}`;
}

function dmgHref(zip) {
  return zip.endsWith("-arm64.zip") ? zip.replace(/-arm64\.zip$/, "-arm64.dmg") : null;
}

function setHref(kind, href) {
  const link = document.querySelector(`[data-download="${kind}"]`);
  if (link) link.href = href;
}

function fail() {
  if (status) status.textContent = "没读到最新说明。按钮仍指向页面上写好的这一版。";
}

const stamped = release ? release.textContent.trim() : "";
const controller = typeof AbortController === "function" ? new AbortController() : null;
const timer = controller ? setTimeout(() => controller.abort(), 8000) : 0;

fetch("/downloads/latest-mac.json", {
  cache: "no-cache",
  signal: controller ? controller.signal : undefined,
})
  .then((response) => {
    if (!response.ok) throw new Error("missing");
    return response.json();
  })
  .then((feed) => {
    if (!feed || typeof feed !== "object") throw new Error("feed");
    const version = versionOf(feed.version);
    const zip = version ? zipHref(feed.file, version) : null;
    const dmg = zip ? dmgHref(zip) : null;
    const sum = sha256(feed.sha256);
    if (!version || !zip || !dmg || !sum) throw new Error("feed");
    setHref("zip", zip);
    setHref("dmg", dmg);
    if (release) release.textContent = version;
    if (checksum) checksum.textContent = sum;
    if (!status) return;
    status.textContent =
      version === stamped
        ? `已核对，安装包是 ${version}。`
        : `更新说明是 ${version}。下载已改到这一版，页面上的介绍还是上一版。`;
  })
  .catch(fail)
  .finally(() => {
    if (timer) clearTimeout(timer);
  });
