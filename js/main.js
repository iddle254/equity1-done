$(document).ready(function() {

    "use strict";

    // grab the initial top offset of the navigation
    var stickyNavTop = $('.nav-section').offset().top;

    // our function that decides weather the navigation bar should have "fixed" css position or not.
    var stickyNav = function() {
        var scrollTop = $(window).scrollTop(); // our current vertical position from the top

        // if we've scrolled more than the navigation, change its position to fixed to stick to top,
        // otherwise change it back to relative
        if (scrollTop > stickyNavTop) {
            $('.nav-section').addClass('sticky');
        } else {
            $('.nav-section').removeClass('sticky');
        }
    };

    stickyNav();
    // and run it again every time you scroll
    $(window).scroll(function() {
        stickyNav();
    });
    // end of nav-bar

    if ($(".related-carousel").length > 0) {
        $('.related-carousel').owlCarousel({
            loop: true,
            margin: 15,
            nav: true,
            navText: ["<span class='icons icon-cheveron-left'></span>", "<span class='icons icon-cheveron-right'></span>"],
            autoplay: true,
            autoplayTimeout: 8000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                },
                1200: {
                    items: 4
                }
            }
        })
    }

    if ($(".products-carousel").length > 0) {
        $('.products-carousel').owlCarousel({
            loop: true,
            margin: 15,
            nav: true,
            navText: ["<span class='icons icon-arrow_back'></span>", "<span class='icons  icon-arrow_forward'></span>"],
            // autoplay: true,
            // autoplayTimeout: 8000,
            // autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                },
                1300: {
                    items: 4
                }
            }
        })
    }

    if ($(".ham-holder").length > 0) {
        $(".ham-holder").unbind("click").click(function() {
            //your code
            $('.bar').toggleClass('animate');
            $('.mobile-menu').toggleClass('active');
            return false;
        });
    };

    if ($(".top-float").length > 0) {
        $('.menu-item-has-children a').click(function(e) {
            e.preventDefault();
            $(this).siblings('ul.sub-menu').slideToggle("slow", function() {});
        });
    };

    if ($(".match-height").length > 0) {
        $('.match-height').matchHeight();
    };


    if ($(".newsroom-section, .insurance-section").length > 0) {
        $('.tabs .tab-links a').on('click', function(e) {
            var currentAttrValue = $(this).attr('href');

            // Show/Hide Tabs
            $('.tabs ' + currentAttrValue).show().siblings().hide();

            // Change/remove current tab to active
            $(this).parent('li').addClass('active').siblings().removeClass('active');
            $('.match-height').matchHeight();

            e.preventDefault();
        });
        $("#pillars-dd").on("change", function() {
            var tabID = $(this).val();
            $(".tab").removeClass("active");
            $(tabID).addClass("active");
            $('.tabs ' + tabID).show().siblings().hide();
        });
    };

});

function partners(e) {
    e.preventDefault();
    var anchorId = '.quotes-tabs.active',
        anchorOffset = $(anchorId).offset();

    $("html, body").stop().animate({
        scrollTop: anchorOffset.top
    }, 500, 'swing');

};

$(".modal-trigger").click(function(e) {
    e.preventDefault();
    dataModal = $(this).attr("data-modal");
    $("#" + dataModal).css({ "display": "flex" });
    // $("body").css({"overflow-y": "hidden"}); //Prevent double scrollbar.
});

$(".close-modal, .modal-sandbox").click(function() {
    $(".modal").css({ "display": "none" });
    // $("body").css({"overflow-y": "auto"}); //Prevent double scrollbar.
});