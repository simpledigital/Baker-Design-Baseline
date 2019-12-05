/**
 * Toggle Behaviors & Events
 *
 * @package WordPress
 * @subpackage Baker Design Theme 1.0
 * @since 2.0
 **/

Project.featuredItems = function() {
    $('.featured-item > ul > li').on('click', function() {
        $($(this).data('slide-target')).addClass('active').siblings().removeClass(
            'active');
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
    });
};

Project.utilityToggle = function() {
    $('.utility-toggle').on('click', function() {
        $(this).children('.dropdown-menu').toggle();
    });

    $(window).on('keyup', function(e) {
        if (e.keyCode == 27) {
            $('.utility-toggle').attr('open', false);
        }
    });

    $('#maincontent').on('click', function() {
        $('.utility-toggle').attr('open', false);
    });
};
