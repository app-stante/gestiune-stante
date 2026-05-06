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
// AFISARE STANTE
// ======================================================

async function afiseazaStante() {

    const rezultateDiv = document.getElementById("rezultate");

    const clientInput = document
        .getElementById("client")
        .value
        .toLowerCase();

    rezultateDiv.innerHTML = "Se incarca...";


    // ===== CITIRE SUPABASE =====

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

        return;
    }


    // ===== FILTRARE CLIENT =====

    const stanteFiltrate = data.filter(stanta => {

        const client = (stanta.client || "")
            .toLowerCase();

        return client.includes(clientInput);

    });


    // ===== NU EXISTA REZULTATE =====

    if (stanteFiltrate.length === 0) {

        rezultateDiv.innerHTML = `
            <div style="
                background:#222;
                padding:20px;
                border-radius:10px;
                color:white;
            ">
                Nu exista rezultate
            </div>
        `;

        return;
    }


    // ===== CONSTRUIRE HTML =====

    let html = "";


    stanteFiltrate.forEach(stanta => {

        html += `

        <div style="
            background:#1e1e1e;
            border:1px solid #d4af37;
            border-radius:12px;
            padding:15px;
            margin-top:15px;
            color:white;
        ">

            <div style="
                font-size:22px;
                font-weight:bold;
                color:#d4af37;
                margin-bottom:10px;
            ">
                ${stanta.denumire_stanta || "-"}
            </div>

            <div>
                <b>Client:</b> ${stanta.client || "-"}
            </div>

            <div>
                <b>Utilaj:</b> ${stanta.utilaj || "-"}
            </div>

        </div>

        `;

    });


    rezultateDiv.innerHTML = html;
}


// ======================================================
// START
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("client")
        .addEventListener("input", afiseazaStante);

    afiseazaStante();

});
