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
// VARIABILE GLOBALE
// ======================================================

let toateStantele = [];


// ======================================================
// FUNCTIE SIMPLA PENTRU CITIT CAMPURI
// ======================================================

function citesteCamp(id) {

    return document
        .getElementById(id)
        .value
        .toLowerCase()
        .trim();

}


// ======================================================
// AUTOCOMPLETE CLIENT
// ======================================================

function actualizeazaAutocompleteClient() {

    const clientInput = citesteCamp("client");

    const autocompleteDiv =
        document.getElementById("client_autocomplete");

    autocompleteDiv.innerHTML = "";


    if (clientInput.length === 0) {
        return;
    }


    const clientiGasiti = [
        ...new Set(
            toateStantele
                .map(stanta => stanta.client || "")
                .filter(client =>
                    client.toLowerCase().includes(clientInput)
                )
        )
    ];


    clientiGasiti.forEach(client => {

        const div = document.createElement("div");

        div.className = "autocomplete-item";

        div.innerText = client;


        div.addEventListener("click", () => {

            document.getElementById("client").value = client;

            autocompleteDiv.innerHTML = "";

            afiseazaStante();

        });


        autocompleteDiv.appendChild(div);

    });

}


// ======================================================
// AFISARE STANTE
// ======================================================

async function afiseazaStante() {

    const rezultateDiv = document.getElementById("rezultate");

    const filtre = {
        client: citesteCamp("client"),
        nr_cda_vechi: citesteCamp("nr_cda_vechi"),
        tip_produs: citesteCamp("tip_produs"),
        utilaj: citesteCamp("utilaj"),
        zona: citesteCamp("zona"),
        locatie: citesteCamp("locatie"),
        status_stanta: citesteCamp("status_stanta")
    };

    rezultateDiv.innerHTML = "Se incarca...";


    // ===== CITIRE SUPABASE =====

    const { data, error } = await supabaseClient
        .from("stante")
        .select("*");


    toateStantele = data || [];


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


    // ===== FILTRARE MULTIPLA =====

    const stanteFiltrate = toateStantele.filter(stanta => {

        return (
            ((stanta.client || "").toLowerCase().includes(filtre.client)) &&
            ((stanta.nr_cda_vechi || "").toLowerCase().includes(filtre.nr_cda_vechi)) &&
            ((stanta.tip_produs || "").toLowerCase().includes(filtre.tip_produs)) &&
            ((stanta.utilaj || "").toLowerCase().includes(filtre.utilaj)) &&
            ((stanta.zona || "").toLowerCase().includes(filtre.zona)) &&
            ((stanta.locatie || "").toLowerCase().includes(filtre.locatie)) &&
            ((stanta.status_stanta || "").toLowerCase().includes(filtre.status_stanta))
        );

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
                <b>Tip produs:</b> ${stanta.tip_produs || "-"}
            </div>

            <div>
                <b>Utilaj:</b> ${stanta.utilaj || "-"}
            </div>

            <div>
                <b>Locatie:</b> ${stanta.locatie || "-"}
            </div>

            <div>
                <b>Status:</b> ${stanta.status_stanta || "-"}
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

    const campuriFiltru = [
        "client",
        "nr_cda_vechi",
        "tip_produs",
        "utilaj",
        "zona",
        "locatie",
        "status_stanta"
    ];

    campuriFiltru.forEach(id => {

        document
            .getElementById(id)
            .addEventListener("input", afiseazaStante);

    });


    document
        .getElementById("client")
        .addEventListener("input", actualizeazaAutocompleteClient);


    afiseazaStante();

});
