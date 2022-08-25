export default function externalRedirect(url: string) {
  if (process.client) {
    window.location.href = url;
  }
}
