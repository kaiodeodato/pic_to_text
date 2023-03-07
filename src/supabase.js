import { createClient } from "@supabase/supabase-js";

const supabase_url= process.env.REACT_APP_SUPABASE_URL
const supabase_key= process.env.REACT_APP_SUPABASE_KEY

<<<<<<< HEAD
=======
console.log(supabase_url)
>>>>>>> 83f2932e492bdd7d6f396c20b3714d93d5bac6a8

export const supabase = createClient(supabase_url,supabase_key)