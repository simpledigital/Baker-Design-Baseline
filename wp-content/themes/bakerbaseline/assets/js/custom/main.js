/**
 * Main JavaScript Events ‣ this is executed last in the final compiled JS
 *
 * @package WordPress
 * @subpackage Baker Design Theme 1.0
 * @since 2.0
 **/

$(document).ready(function () {
    Project.initGlobals();
    Project.siteNavigation();
    Project.utilityToggle();
    Project.splitHeight();
    Project.tabbedContent();
    Project.makeModals();
    // Project.fixedHeader();
    // Project.graphicSliders();
    // Project.parallax();
});

$(window).on('resize', function () {
    Project.equalHeights();
    Project.equalHeightsMobile();
});

$(window).on('load', function () {
    $(window).trigger('resize');
    Project.inputFocus();
    // Project.adminFrontendTweaks();
    // setTimeout(function () {
    //     $(window).trigger('scroll');
    //     Project.masonryLayouts();
    // }, 500);
    // Project.windowLoadEvents();
});
