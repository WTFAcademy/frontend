export const isProduction = process.env.NODE_ENV === "production";

export const SUPABASE_ID = isProduction
  ? "vjcxgodediuyprqxqpzo"
  : "qezbjcrtpwuoeaactfdv";

export const CLIENT_URL = isProduction
  ? `https://${SUPABASE_ID}.supabase.co`
  : `https://${SUPABASE_ID}.supabase.co`;
export const ANON_KEY = isProduction
  ? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqY3hnb2RlZGl1eXBycXhxcHpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTkxMDAwODYsImV4cCI6MTk3NDY3NjA4Nn0.047HbUPIrWls_LqEt-lF5AVsiz_MKIadO2ULI1Et_Fs"
  : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlemJqY3J0cHd1b2VhYWN0ZmR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYyMzE3ODUsImV4cCI6MjAwMTgwNzc4NX0.W3xE_l7nSso5uT0z9F-sjRAt_vsdYz-MajKFHDpc8ro";
