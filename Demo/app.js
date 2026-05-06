// ======================================================
// GESTIUNE STANTE - APP JS
// ======================================================


// ===== CONECTARE SUPABASE =====

const SUPABASE_URL = "https://ulgbamusntxfpuagmfww.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_pWwpM0_vC0PWxunbTjBeUA_KfdVsr4k";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);


// ======================================================
// TEST CITIRE STANTE
// ======================================================

async function afiseazaStante() {

    const rezultateDiv = document.getElementById("rezultate");

    rezultateDiv.innerHTML = "Se incarca...";


    // ===== TEST SUPABASE =====

    const { data, error } = await supabaseClient
        .from("stante")
        .select("*");


    // ===== AFISARE EROARE =====

    if (error) {

        rezultateDiv.innerHTML = `
            <div style="
                background:red;
                color:white;
                padding:20px;
                border-radius:10px;
            ">
                ${error.message}
            </div>
        `;

        console.log(error);

        return;
    }


    // ===== NU EXISTA DATE =====

    if (data.length === 0) {

        rezultateDiv.innerHTML = `
            <div style="
                background:#222;
                padding:20px;
                border-radius:10px;
            ">
                Nu exista stante in baza de date
            </div>
        `;

        return;
    }


    // ===== AFISARE DATE =====

    rezultateDiv.innerHTML =
        "Exista " + data.length + " stante in baza de date";
}


// ======================================================
// START
// ======================================================

afiseazaStante();
