<?php get_header(); ?>

<?php 
    if ( have_posts() ) :
        while ( have_posts() ) :
            the_post(); 
            //
            // Post Content here
            //
        endwhile; // end while
    endif; // end if
?>

<?php get_footer();