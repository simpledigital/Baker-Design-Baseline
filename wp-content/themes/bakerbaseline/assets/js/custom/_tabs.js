/**
 * Tabbed Content UI
 *
 * @package WordPress
 * @subpackage Baker Design Theme 1.0
 * @since 2.0
 **/

Project.tabbedContent = function() {
    $('.tabs.content-tabs li:first').addClass('active');
    $('.tab-content').hide();
    $('.tab-content:first').show();

    $(document).on('click', '.tabs.content-tabs li button', function() {
        $($(this).attr('data-tab-target')).fadeIn();
        $($(this).attr('data-tab-target')).siblings().fadeOut();
        $(this).parent('li').addClass('active');
        $(this).parent('li').siblings().removeClass('active');
    });

    $(window).on('load', function() {
        var hashId = window.location.hash;
        // hashId = hashId.match(/#[^?&\/]*/g);
        if (hashId !== undefined) {
            $(hashId).show();
            $(hashId).siblings().hide();

            $('.tabs li button').each(function() {
                if (hashId == $(this).attr('data-tab-target')) {
                    $(this).parent('li').addClass('active');
                    $(this).parent('li').siblings().removeClass('active');
                }
            });
        }
    });

};
