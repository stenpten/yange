const scope = self as unknown as {
  onmessage: ((event: MessageEvent<{ id: number; bucket: number; url: string }>) => void) | null
  postMessage: (data: unknown) => void
}

scope.onmessage = async (event) => {
  const { id, bucket, url } = event.data
  try {
    const res = await fetch(url)
    if (!res.ok) {
      scope.postMessage({ id, bucket, ok: true, empty: true })
      return
    }
    const data = await res.json()
    scope.postMessage({ id, bucket, ok: true, data })
  } catch {
    scope.postMessage({ id, bucket, ok: false })
  }
}
