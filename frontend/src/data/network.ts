export async function GET(url: string) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Could not fetch ${url}. Status: ${response.status}`)
  }
  return await response.json()
}
