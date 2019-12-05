/**
 * Parallax Effects
 *
 * @package WordPress
 * @subpackage Baker Design Theme 1.0
 * @since 2.0
 **/

Project.parallax = function() {
    var el = $('.scrolled-item');

    el.each(function() {
        // _this = $(this);
        $(this).css({
            'opacity': '0',
            'bottom': '-120px'
        });
    });

    $(window).on('scroll load', function() {
        var scroll = $(document).scrollTop();

        el.each(function() {
            _this = $(this);
            if (scroll > _this.offset().top - $(window).height()) {
                _this.css({
                    'opacity': '1',
                    'bottom': '0'
                });
            } else {
                _this.css({
                    'opacity': '0',
                    // 'bottom': '-220px'
                });
            }
        });

    });
};
