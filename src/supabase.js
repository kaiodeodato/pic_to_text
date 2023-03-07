import { createClient } from "@supabase/supabase-js";

const supabase_url= process.env.REACT_APP_SUPABASE_URL
const supabase_key= process.env.REACT_APP_SUPABASE_KEY


export const supabase = createClient(supabase_url,supabase_key)