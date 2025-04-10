import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://xmfpytnzdgynoolnnucp.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtZnB5dG56ZGd5bm9vbG5udWNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMzM3NDgsImV4cCI6MjA1OTcwOTc0OH0.xLp_TaqAYCPMcrl0UImTZ5NZL9ZT48uNy-LXG_Ug5qI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
