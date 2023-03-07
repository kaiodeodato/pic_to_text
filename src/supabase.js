import { createClient } from "@supabase/supabase-js";

const supabase_url= "https://issxecvpzqqtthrgoqyf.supabase.co"
const supabase_key= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlzc3hlY3ZwenFxdHRocmdvcXlmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3Nzg0ODIzOCwiZXhwIjoxOTkzNDI0MjM4fQ.UeBKz8KFDMq1ui8SBy60FTaNEflB54We_7wtPdKcGh0"

export const supabase = createClient(supabase_url,supabase_key)