export const configuration = () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  host: process.env.HOST || 'http://localhost',
  supabase: {
    url: process.env.SUPABASE_URL || '',
    anonKey: process.env.SUPABASE_ANON_KEY || '',
  },
  nodeEnv: process.env.NODE_ENV || 'development',
});
