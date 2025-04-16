// Funkce pro spuštění PHP skriptu
function runPhpScript() {
    // Vytvoříme nový XMLHttpRequest objekt
    var xhr = new XMLHttpRequest();
    
    // Definujeme cílovou URL adresu PHP skriptu
    var url = 'image.php'; // Nahraďte skutečným názvem vašeho PHP skriptu
    
    // Nastavíme metodu a cílovou adresu
    xhr.open('GET', url, true);

    // Nastavíme callback funkci pro zpracování odpovědi
    xhr.onload = function () {
        // Zde můžete zpracovat odpověď, pokud je potřeba
        console.log('PHP skript byl úspěšně spuštěn.');
    };

    // Odešleme požadavek na server
    xhr.send();
}

// Spustíme funkci runPhpScript() okamžitě po načtení stránky
runPhpScript();

// Spustíme funkci runPhpScript() každou hodinu (3600 sekund)
setInterval(runPhpScript, 60);
