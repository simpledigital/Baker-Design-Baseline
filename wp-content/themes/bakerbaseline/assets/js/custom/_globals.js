/**
 * Globals & Constants
 *
 * @package WordPress
 * @subpackage Baker Design Theme 1.0
 * @since 2.0
 **/

$.GLOBALS = $.GLOBALS || {};

var Project = Project || {};

Project.initGlobals = function() {

    /* HELPER METHODS */
    $.GLOBALS.themeDir = (function() {
        return (
            localStorage.getItemStorage('themeDir') ||
            (function() {
                var myTheme = jQuery('script[src*="wp-content/themes/"]');
                myTheme = (myTheme[0] !== undefined) ? myTheme[0].src.replace(/themes\/(.*?)\/(.*)/g, 'themes/$1') : null;
                localStorage.setItemStorage('themeDir', myTheme);
                return myTheme;
            })()
        );
    })();

    /* SITE-SPECIFIC */
    $.GLOBALS.domainAndProtocol = location.origin = location.protocol + "//" +
        location.hostname + (location.port ? ':' + location.port : '');
    $.GLOBALS.siteName = document.title.split('|')[document.title.split('|').length - 1];
    $.GLOBALS.ENV = ((document.domain.reverse().indexOf('.local'.reverse()) === 0 || document.domain.indexOf('local.') === 0) ? 'DEVELOPMENT' : 'PRODUCTION');
    $.GLOBALS.debug = $.GLOBALS.ENV === 'DEVELOPMENT';

    /* BREAKPOINTS */
    $.GLOBALS.smallBreak = 520;
    $.GLOBALS.mediumBreak = 768;
    $.GLOBALS.largeBreak = 1070;

    /* BRAND/THEME COLORS */
    $.GLOBALS.colorPalette = ['#6f263d', '#ffd457', '#e9dfd5', '#000000'];
};
