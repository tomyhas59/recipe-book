import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://wofuyhggjdsjfnweanfk.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvZnV5aGdnamRzamZud2VhbmZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MTYzODMsImV4cCI6MjA3MTE5MjM4M30.pDFVIUI1YwJ3zWU-85VOU5J4RMAbHnjUD5Lu8-0EV2c";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
