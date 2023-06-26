import { supabase } from "@/lib/supabase";

export const getProducts = async () => {
   return supabase.from('products').select('*')
};