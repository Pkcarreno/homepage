export const config = {
  site:
    process.env.VERCEL_ENV === 'production'
      ? 'https://www.pkcarreno.com'
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://127.0.0.1:4321'
}

export const metaConfig = {
  titleTemplate: '- PK',
  themeColor: {
    light: '#fffaeb',
    dark: '#140f00'
  }
}
