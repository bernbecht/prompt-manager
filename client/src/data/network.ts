export async function GET(url: string) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Could not fetch ${url}. Status: ${response.status}`)
  }
  return response
}

export async function POST(url: string, data: any) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // @ts-ignore
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error(`Could not fetch ${url}. Status: ${response.status}`)
  }
  return await response.json()
}
