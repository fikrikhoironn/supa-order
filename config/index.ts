const config = {
    API_URL: (process.env.NEXT_PUBLIC_SUPABASE_URL as string) || '',
    API_KEY: (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string) || '',
}

export default config;