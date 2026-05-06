// ======================================================
// GESTIUNE STANTE - APP JS
// ======================================================


// ===== CONECTARE SUPABASE =====

const SUPABASE_URL = "https://ulgbamusntxfpuagmfwv.supabase.co";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsZ2JhbXVzbnR4ZnB1YWdtZnd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNDIwNDcsImV4cCI6MjA5MzYxODA0N30.UfqT_yJkwUQ7cyaAyoA0DEtUnq1yFPLZsfx1G0gth-Q";

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
