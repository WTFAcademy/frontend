export const isProduction = process.env.NODE_ENV === "production";

export const SUPABASE_ID = isProduction
  ? "swfebckynwetylmsvumx"
  : "qezbjcrtpwuoeaactfdv";

export const CLIENT_URL = isProduction
  ? `https://${SUPABASE_ID}.supabase.co`
  : `https://${SUPABASE_ID}.supabase.co`;
export const ANON_KEY = isProduction
  ? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3ZmViY2t5bndldHlsbXN2dW14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIwMjAwMzksImV4cCI6MjAwNzU5NjAzOX0.bSISbYutUsrKrt41W6LPNnS3KRDyCOZf-TNMezA6-KQ"
  : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlemJqY3J0cHd1b2VhYWN0ZmR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYyMzE3ODUsImV4cCI6MjAwMTgwNzc4NX0.W3xE_l7nSso5uT0z9F-sjRAt_vsdYz-MajKFHDpc8ro";
