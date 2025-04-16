<?php
// Cesta ke složce s obrázky (vzhledem k umístění PHP skriptu)
$imagesFolder = __DIR__ . '/images/';
// Cesta k textovému souboru s názvy obrázků (vzhledem k umístění PHP skriptu)
$imagesTxtFile = __DIR__ . '/images.txt';

// Funkce pro načtení názvů obrázků ze souboru
function loadExistingImages($imagesTxtFile) {
    if (file_exists($imagesTxtFile)) {
        return file($imagesTxtFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    }
    return [];
}

// Funkce pro získání seznamu obrázků ve složce
function getImages($imagesFolder) {
    $files = scandir($imagesFolder);
    return array_diff($files, array('..', '.'));
}

// Funkce pro získání rozlišení obrázku
function getImageResolution($imagePath) {
    $size = getimagesize($imagePath);
    return $size[0] * $size[1]; // Vrátí počet pixelů (šířka * výška)
}

// Porovnání existujících obrázků s novými
$existingImages = loadExistingImages($imagesTxtFile);
$newImages = array_diff(getImages($imagesFolder), $existingImages);

// Pokud jsou nalezeny nové obrázky, přidáme je do HTML kódu
if (!empty($newImages)) {
    // Seřadíme nové obrázky podle rozlišení sestupně
    usort($newImages, function($a, $b) use ($imagesFolder) {
        $resA = getImageResolution($imagesFolder . '/' . $a);
        $resB = getImageResolution($imagesFolder . '/' . $b);
        return $resB - $resA;
    });

    $htmlContent = '';
    foreach ($newImages as $image) {
        // Vytvoříme cestu k obrázku
        $imagePath = '/images/' . urlencode($image);
        // Získáme rozměry obrázku
        list($width, $height) = getimagesize($imagesFolder . '/' . $image);
        // Určíme třídu pro široké obrázky
        $class = ($width > $height * 2) ? 'wide-image' : 'regular-image';
        // Přidáme obrázek do HTML kódu s odpovídající třídou
        $htmlContent .= '<div class="photo-grid-item ' . $class . '"><img src="' . $imagePath . '" alt="' . $image . '"></div>';
    }

    // Aktualizujeme HTML kód s novými obrázky
    $existingHtml = file_get_contents(__DIR__ . '/galerie.html'); // Nahraďte skutečným názvem vašeho HTML souboru
    // Najdeme pozici, kde chceme vložit nové obrázky
    $insertPosition = strpos($existingHtml, '<section class="photo-grid-container">') + strlen('<section class="photo-grid-container">');
    // Vložíme nové obrázky do HTML kódu
    $newHtml = substr_replace($existingHtml, $htmlContent, $insertPosition, 0);
    // Uložíme aktualizovaný HTML soubor
    file_put_contents(__DIR__ . '/galerie.html', $newHtml); // Nahraďte skutečným názvem vašeho HTML souboru

    // Aktualizace seznamu existujících obrázků ve souboru
    file_put_contents($imagesTxtFile, implode("\n", array_merge($existingImages, $newImages)));
}
?>
