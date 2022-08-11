export default function externalRedirect(url, code = 301) {
  if (process.client) {
    window.location.href = url;
  }
}
