/**
 * Slider Scripts
 *
 * @package WordPress
 * @subpackage Baker Design Theme 1.0
 * @since 2.0
 **/

Project.graphicSliders = function () {

    this.graphicSliders.events = {
        onIndexChanged: function (info, eventName) {
            Project.graphicSliders.activeIndex = info.displayIndex;
            var slideParent = $(info.container).parents('.slider-module'),
                newIndex = info.displayIndex;
            slideParent.find('.slider-nav .counter .active').text(newIndex).attr('value', newIndex);
            slideParent.find('.slide .hover-focus').removeClass('current active');
            slideParent.find('.slide[data-slide-count="' + (newIndex - 1) + '"] .hover-focus').addClass('current active');
        },

        onInitialization: function (info) {
            console.log(info);
            $(info.slideItems).first().children('.media-container').addClass('current active');
            // $(info.container).attr('data-slider-index', info.index);
        }
    };


    if ( $('.slider').length ) {
        var sliders = this.graphicSliders.sliders || {};
        var meID, slider;

        sliders.instances = [];
        sliders.containers = $('.slider');

        opts = {
            container: '.slider',
            autoplay: false,
            items: 1,
            loop: false,
            swipeAngle: false,
            edgePadding: 5,
            speed: 1100,
            slideBy: 1,
            center: false,
            controls: true,
            controlsPosition: top,
            lazyload: true,
            nav: false,
            arrowKeys: true,
            mouseDrag: true,
            gutter: 0,
            autoWidth: true,
            mode: 'carousel',
            rewind: true,
            onInit: Project.graphicSliders.events.onInitialization,
            // controlsContainer: '.slider-nav'

            responsive: {
                480: {},
                750: {
                    items: 3,
                    gutter: 30,
                    // startIndex: 1
                },
                970: {
                    items: 3.5,
                    // startIndex: 1
                }
            }
        };
        x = 0;
        $.each(sliders.containers, function () {
            meID = $(this).data('unique-id');
            if ( $(this).hasClass('multi-slide') ) {
                opts.container = '#slider-container-' + meID;
                opts.nextButton = '#slider-nav-' + meID + ' .next';
                opts.prevButton = '#slider-nav-' + meID + ' .prev';
                // opts.controlsContainer = '#slider-nav-' + meID;
                slider = tns(opts);
                slider.events.on('indexChanged', Project.graphicSliders.events.onIndexChanged);
                sliders.instances.push(slider);
                $(this).attr('data-slider-index', x);
                x += 1;
            }
        });

        $('.slider-module').on(
            {
                mouseenter: function () {
                    $(this).addClass('current');
                },
                mouseleave: function () {
                    $(this).removeClass('current');
                },
                click: function (a,b) {
                    var slideIndex = $(a.currentTarget).parents('.slide').index(),
                       sliderIndex =$(a.currentTarget).parents('.slider').data('slider-index'),
                        slider = Project.graphicSliders.sliders.instances[sliderIndex];

                    if ( typeof slider === 'object' ) {
                        slider.goTo(slideIndex);
                    }
                }
            },
            '.media-container'
        );
        this.graphicSliders.sliders = sliders;
    }
};
