// ======================================================
// GESTIUNE STANTE - APP JS
// ======================================================


// ===== CONECTARE SUPABASE =====

const SUPABASE_URL = "https://ulgbamusntxfpuagmfwv.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_pWwpM0_vC0PWxunbTjBeUA_KfdVsr4k";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);


// ===== TEST CONECTARE =====

console.log("Aplicatia este conectata la Supabase");
