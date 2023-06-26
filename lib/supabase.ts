import config from "@/config";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(config.API_URL, config.API_KEY);