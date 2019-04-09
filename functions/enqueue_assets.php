<?php

function _themename_assets() {
    # wp_enqueue_style( $handle, $src, $deps, $ver, $media );
    # main css bundle
    wp_enqueue_style( '_themename-main', get_template_directory_uri() . '/dist/css/bundle.css', array(), '1.0.0', 'all' );

    # wp_enqueue_script($handle, $src, $deps, $ver, $in_footer)
    # main js bundle
    wp_enqueue_script( '_themename-main-js', get_template_directory_uri() . '/dist/js/bundle.js', array(), '1.0.0', true);
}

add_action('wp_enqueue_scripts', '_themename_assets');