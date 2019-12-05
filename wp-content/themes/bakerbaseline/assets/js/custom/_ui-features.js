/**
 * Global UI Features & Adjustments
 *
 * @package WordPress
 * @subpackage Baker Design Theme 1.0
 * @since 2.0
 **/

Project.fixedHeader = function() {
    $(window).on('scroll load', function() {
        if ($(this).scrollTop() > 45) {
            $('.site-header').addClass('fixed');
            $('.hero').addClass('fixed-header');
        } else {
            $('.site-header').removeClass('fixed');
            $('.hero').removeClass('fixed-header');
        }
    });
};
