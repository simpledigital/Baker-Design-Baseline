/**
 * Element Height & Width Equalizers
 *
 * @package WordPress
 * @subpackage Baker Design Theme 1.0
 * @since 2.0
 **/

Project.equalHeightsSmallest = function() {
    var equalHeights = $('.equal-heights-smallest');
    equalHeights.removeClass('equalized');
    windowWidth = $(window).width();
    var sections;
    if (equalHeights.length > 0) {
        equalHeights.each(function() {
            if (windowWidth > $.GLOBALS.mediumBreak || $(this).hasClass(
                    'equal-heights-all')) {
                sections = $(this).find('.equal-smallest');
                h = $(this).innerHeight();
                sections.height('auto');
                sections.each(function() {
                    // console.log($(this).height());
                    newHeight = $(this).innerHeight();
                    if (newHeight < h && newHeight > 0) {
                        h = newHeight;
                    }
                });
                sections.css('height', h + 'px');
                $(this).addClass('equalized');
            } else {
                $(this).find('.equal-smallest').css('height', 'auto');
            }
        });
    }
};

/**
 * Equal Heights for Columns
 *
 * Add class 'equal-heights' to outer element & 'equal' to elements to be equalized
 */
Project.equalHeights = function() {
    if (typeof(Project.equalHeightsInner) === 'function') {
        var equalHeightsInner = new Project.equalHeightsInner();
    }
    var equalHeights = $('.equal-heights');
    equalHeights.removeClass('equalized');
    windowWidth = $(window).width();
    if (equalHeights.length > 0) {
        equalHeights.each(function() {
            if (windowWidth > $.GLOBALS.mediumBreak || $(this).hasClass(
                    'equal-heights-all')) {
                var sections = $(this).find('.equal'),
                    largestHeight = 0;
                sections.height('auto');
                sections.each(function() {
                    var h = $(this).innerHeight();
                    if (largestHeight < h) {
                        largestHeight = h;
                    }
                });
                sections.css('height', largestHeight + 'px');
                $(this).addClass('equalized');
            } else {
                $(this).find('.equal').css('height', 'auto');
            }
        });
    }
};

Project.equalHeightsInner = function(innerClass) {
    if (typeof innerClass === 'undefined') {
        innerClass = 'equal-inner';
    }
    var equalHeights = $('.equal-heights');
    equalHeights.removeClass('equalized-inner');
    windowWidth = $(window).width();
    if (equalHeights.length > 0) {
        equalHeights.each(function() {
            if (windowWidth > $.GLOBALS.mediumBreak || $(this).hasClass(
                    'equal-heights-all')) {
                var sections = $(this).find('.' + innerClass),
                    largestHeight = 0;
                sections.height('auto');
                sections.each(function() {
                    var h = $(this).innerHeight();
                    if (largestHeight < h) {
                        largestHeight = h;
                    }
                });
                sections.css('height', largestHeight + 'px');
                $(this).addClass('equalized-inner');
            } else {
                $(this).find('.' + innerClass).css('height', 'auto');
            }
        });
    }
};

/**
 * Equal Heights for Columns on Mobile
 *
 * Add class 'equal-heights-mobile' to outer element & 'equal' to elements to be equalized
 */
Project.equalHeightsMobile = function() {
    var equalHeights = $('.equal-heights-mobile');
    windowWidth = $(window).width();
    if (windowWidth <= $.GLOBALS.mediumBreak) {
        // var desktopToo = $(this).find('.equal')
        if (equalHeights.length > 0) {
            equalHeights.each(function() {
                var sections = $(this).find('.equal').filter(function() {
                        return $(this).parents('.equal-heights').length === 0;
                    }),
                    largest_height = 0;
                $(this).removeClass('equalized');
                sections.height('auto');
                sections.each(function() {
                    var h = $(this).innerHeight();
                    if (largest_height < h) {
                        largest_height = h;
                    }
                });
                sections.css('height', largest_height + 'px');
                $(this).addClass('equalized');
            });
        }
    }
};

/**
 * Equal Widths for Elements
 *
 * Add class 'equal-widths' to outer element & 'equal' to elements to be equalized
 */
Project.equalWidths = function(useSmallest) {
    var compareSizes = function(a, b) {
        return (Project.isSet('useSmallest') ? useSmallest : false) ? (a > b) : (a < b);
    };
    var equalWidths = $('.equal-widths');
    equalWidths.removeClass('equalized');
    windowWidth = $(window).width();
    if (windowWidth > $.GLOBALS.mediumBreak) {
        if (equalWidths.length > 0) {
            equalWidths.each(function() {
                var sections = $(this).find('.equal'),
                    useWidth = 0;

                sections.width('auto');

                if (sections.length > 1) {
                    sections.each(function() {
                        var h = $(this).innerWidth();
                        if (compareSizes(useWidth, h)) {
                            useWidth = h;
                        }
                    });
                    sections.css('width', useWidth + 'px');
                }

                $(this).addClass('equalized');
            });
        }
    } else {
        equalWidths.find('.equal').css('width', 'auto');
    }
};

/**
 * Equal Column Heights & Widths
 *
 * Add class 'equal-height-width' to elements to be equalized
 */
Project.equalizeHeightsWidths = function() {
    var equalWidths = $('.equal-height-width');
    if (equalWidths.length > 0) {
        equalWidths.each(function() {
            var w = $(this).width();
            $(this).css({
                'height': w + 'px'
            });
        });
    }
};

Project.splitHeight = function() {
    $(window).on('load resize', function() {

        $('.split-text-block').each(function() {
            if ($(this).width() > 768) {
                // console.log($(this).find('img'));
                img = $(this).find('img')[0];
                console.log(img.clientHeight);
                $(this).find('figure').css({
                    'height': img.clientHeight,
                    'overflow': 'hidden'
                });
            } else {
                $(this).find('figure').css({
                    'height': 'auto',
                    'overflow': 'visible'
                });
            }
        });

    });
};
