/* =======================================================
   GESTIUNE STANTE - STYLE.CSS
======================================================= */

/* ===== RESET ===== */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* ===== BODY ===== */

body {
    background: #111111;
    color: #ffffff;
    font-family: Arial, sans-serif;
    min-height: 100vh;
    padding: 30px;
}

/* ===== APP ===== */

#app {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
}

/* ===== TITLU ===== */

h1 {
    font-size: 42px;
    margin-bottom: 40px;
    color: #d4af37;
}

/* ===== INPUT ===== */

input {
    width: 100%;
    height: 55px;
    margin-bottom: 15px;

    background: #1e1e1e;
    border: 1px solid #444;
    border-radius: 12px;

    padding: 0 15px;

    color: white;
    font-size: 18px;
}

/* ===== AUTOCOMPLETE ===== */

.autocomplete-wrapper {
    position: relative;
}

.autocomplete-box {
    position: absolute;
    top: 58px;
    left: 0;

    width: 100%;

    background: #1e1e1e;

    border: 1px solid #d4af37;
    border-radius: 12px;

    overflow: hidden;

    z-index: 1000;
}

.autocomplete-item {
    padding: 15px;
    cursor: pointer;
    border-bottom: 1px solid #333;
}

.autocomplete-item:hover {
    background: #d4af37;
    color: #111111;
}

/* ===== BUTOANE ===== */

button {
    width: 100%;
    height: 60px;
    margin-bottom: 20px;

    border: none;
    border-radius: 12px;

    background: #d4af37;
    color: #111111;

    font-size: 20px;
    font-weight: bold;

    cursor: pointer;
}
