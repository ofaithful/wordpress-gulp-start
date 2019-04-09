<?php

/**
 * include assets
 */
// require dirname(__FILE__) . '/functions/enqueue_assets.php';

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);


function requireFilesDirLoop($path ) {
    $contents = scandir($path);

    foreach ($contents as $content) {
        if ($content === '.' || $content === '..') continue;
        $contentPath = str_replace(['/','\\'], DIRECTORY_SEPARATOR, trim($path, '/') . '/' . $content);

        if (is_file($contentPath)) {
            require_once $contentPath;
        } else if (is_dir($contentPath)) {
            requireFilesDirLoop($contentPath);
        }
    }
}

function startRecursiveRequering() {
    $path = dirname(__FILE__) . '/functions/';
    requireFilesDirLoop($path);
}
add_action('wp_enqueue_scripts', 'startRecursiveRequering');