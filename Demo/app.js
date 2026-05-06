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


// ======================================================
// AFISARE STANTE
// ======================================================

async function afiseazaStante() {

    const rezultateDiv = document.getElementById("rezultate");

    rezultateDiv.innerHTML = "Se incarca stantele...";


    // ===== CITIRE BAZA DE DATE =====

    const { data, error } = await supabaseClient
        .from("stante")
        .select("*");


    // ===== EROARE =====

    if (error) {

        rezultateDiv.innerHTML =
            "Eroare la citirea bazei de date";

        console.log(error);

        return;
    }


    // ===== NU EXISTA STANTE =====

    if (data.length === 0) {

        rezultateDiv.innerHTML =
            "Nu exista stante in baza de date";

        return;
    }


    // ===== AFISARE STANTE =====

    let html = "";


    data.forEach(stanta => {

        html += `
            <div style="
                background:#222;
                padding:15px;
                margin-bottom:15px;
                border-radius:10px;
            ">

                <b>${stanta.denumire_stanta || "-"}</b><br><br>

                Client: ${stanta.client || "-"}<br>
                Tip produs: ${stanta.tip_produs || "-"}<br>
                Utilaj: ${stanta.utilaj || "-"}<br>
                Zona: ${stanta.zona || "-"}<br>
                Locatie: ${stanta.locatie || "-"}<br>
                Status: ${stanta.status_stanta || "-"}<br>

            </div>
        `;
    });


    rezultateDiv.innerHTML = html;
}


// ======================================================
// START APLICATIE
// ======================================================

afiseazaStante();
