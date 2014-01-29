/*********************
 Site Name:  Baldr
 Company:    NorthernFolks
 Author:     Aaron Sananes & Daniel Sandvik
 Website:    http://www.northernfolks.com

**********************
 Bones Scripts File
 Author: Eddie Machado

 */

(function ($) {
    "use strict";

// function redirectRandomly() {
//     var random = Math.floor(Math.random() * 5) + 1; // generate random number between 1 and 10
//     //alert(random);
//         if (random == 5) {
//          window.location.replace("http://scruples777.myshopify.com");
//         }
// }
// redirectRandomly();
    var scrollTo = function(element) {
        $('html, body').animate({
            scrollTop: element.offset().top - 50
        }, 500);
    }
    function count_articles() {
        return $('article').length - 1;
    } 
function prev_next_scrolling() {
        var articles = $("article");

        articles.each( function(index) {

            var article = $(this);

            $('.next-btn', article).on('click', function(event) {

                if(index == count_articles()) {
                    scrollTo($('article').eq(0));
                } else {
                    scrollTo($('article').eq(index + 1));
                }
                event.preventDefault();
            });
            $('.prev-btn', article).on('click', function(event) {
                event.preventDefault();
                scrollTo($('article').eq(index - 1));
            });

            if(articles.length <= 1) {
                $('.post-paginate', article).remove()
            }
            // if(index == count_articles()) {
            //      $('.next-btn', article).remove();
            //  }
   
        });
    }
    prev_next_scrolling();

    function featured_image() {
        var post_links = $(".post-title a"),
            featured_html = $(".featured"),
            post_list_links = [];

        /* -- Feature Images and Video per Post -- */
        if (post_links.length > 0) {
//            if ( Modernizr.localstorage ) {
//                localStorage.clear();
//            }
            
            post_links.each(function (index) {
                //Process script                 
                post_list_links.push(post_links[index].href);
                /* -- Next and Prev Post -- */
                if ( Modernizr.localstorage ) {
                localStorage.setItem(post_links[index].href,
                    JSON.stringify({"prev": (post_links[index - 1] != null ? post_links[index - 1].href : "none"),
                                    "next": (post_links[index + 1] != null ? post_links[index + 1].href : "none")}));
                }
            });
        }

        if (post_list_links.length > 0) {
            post_list_links.forEach(function (element, index, array) {
                $.get(post_list_links[index], function (data) {
                    var html = $(data),
                        article = html.find("article .content"),
                        img = article.find("img:first"),
                        video = article.find("iframe:first"),
                        featured = featured_html[index];
                    if($('body').hasClass('post-template')) {
                        if(img.length > 0) {
                            $(featured).append(img[0]);
                            $('article .content').find('img:first').remove();
                        } else {
                            $('article .content').find('iframe:first').remove();

                        }
                    }
                    if (img.length > 0 && video.length > 0) {
                        $(featured).html(img[0]);
                    } else {
                        if (img.length > 0) {
                            $(featured).append(img[0]);
                        } else if (video.length > 0) {
                            $(featured).append(video[0].outerHTML).addClass('video');
                        }
                    }
                    //$(".post").fitVids();
                });
            });
        }
    }



    function detect_browser() {
        var browser = {
            chrome: false,
            mozilla: false,
            opera: false,
            msie: false,
            safari: false
        },
            sBrowser, sUsrAg = navigator.userAgent;

        if (sUsrAg.indexOf("Chrome") > -1) {
            browser.chrome = true;
        } else if (sUsrAg.indexOf("Safari") > -1) {
            browser.safari = true;
        } else if (sUsrAg.indexOf("Opera") > -1) {
            browser.opera = true;
        } else if (sUsrAg.indexOf("Firefox") > -1) {
            browser.mozilla = true;
        } else if (sUsrAg.indexOf("MSIE") > -1 || sUsrAg.indexOf("Trident") > -1) {
            browser.msie = true;
        }
        return browser;
    }

    function prev_next() {
        if ( Modernizr.localstorage ) {
            if (localStorage.getItem(window.location.href) != null && window.location.href != (window.location.origin + "/")) {
                var relations = localStorage.getItem(window.location.href);
                return JSON.parse(relations);
            }
        } else {
            return false;
        }
    }

  
    function enable_continuous_scrolling() {
        var enable_scrolling = true;
            if (enable_scrolling == true) {
                return true;
            } else {
                return false;
            }
        };
        

    $(document).ready(function () {
        
        /* -- Detect IE -- */
        var browser = detect_browser(),
            logo_text = $("#flash").text() + " " + $("#light").text(),
            is_many_page = $(".pagination a.older-posts").length,
            is_infinite = enable_continuous_scrolling(),
            rel_links = prev_next();
        
        /* -- Fallback text logo for IE -- */
        if (browser.msie == true) {
            $("#box").html(logo_text);
        }
        
        /* -- Hide pagination for infinite scrolling  -- */        
        if (is_infinite || is_many_page == 0)
        {
            $(".pagination").css("display", "none" );
        } else {
            $(".pagination").css("display", "block");
        }
        

        
        /* -- Code Highlight -- */
        $("pre").addClass("prettyprint");

       
//        
//        if (Modernizr.localstorage)
//        {
//            $(".pagination").css("display", "none");
//        } else {
//            //Using jQuery Cookie
//        }
//        
        $(window).scroll(function () {
            /* -- Scroll to Top -- */
            if ($(this).scrollTop() > 100) {
                //Display it
                $(".scrollup").fadeIn();
            } else {
                $(".scrollup").fadeOut();
            }
            
            if (enable_continuous_scrolling()) {
                /* -- Endless Scrolling -- */
                var next_page = $(".pagination a.older-posts");
                if (next_page.length > 0) {
                    next_page = next_page.attr("href");
                    if ($(window).scrollTop() == ($(document).height() - $(window).height())) {
                        $(".endless").show();
                        $.ajax({
                            url: next_page,
                            success: function (html) {
                                if (html) {
                                    var content = $(html),
                                        posts = content.find("article.post"),
                                        posts_title = content.find("article.post .post-title a").text(),
                                        pagination = content.find(".pagination"),
                                        endless = content.find(".endless");
                                    
                               
                                    $(".pagination").remove();
                                
                                    $(".endless").remove();
                                    posts.each(function (index) {
                                        var post = $(posts[index]);
                                        var titles = post.find('.article-header a').text();
                                        var date = post.find('.post-info .date').text();
                                        var href = post.find('.article-header a').attr('href');
                                        post.appendTo("#main").addClass('animate fadeIn');
                                        $("#nav .articles ul").append('<li><a href="' + href + '">' + titles + '<span class="date">' + date + '</span></a></li><hr class="divider" />');
                                    });

    
                                    //Callback when create new article
                                    featured_image();
                                    prev_next_scrolling();
                                    $("#main").append(endless);
                                    $("#main").append(pagination);
                                    $(".pagination").css("display", "none");
                                    $(".endless").hide(300);
                                }
                            }
                        });
                    } else {
                        if ($(".pagination").css("display") == "block") {
                            $(".no-more").removeClass("animate wobble");
                            $(".no-more").addClass("animate wobble");
                        }
        
                    }
                } else {
                    $(".pagination").css("display", "block");
                    $(".pagination").html("<span class=\"button no-more\" style=\"opacity:1\">No more posts</span>");
                    $(".no-more").removeClass("animate wobble");
                    $(".no-more").addClass("animate wobble");
                }
            }
        });

        featured_image();
                    
        if (rel_links != null && Modernizr.localstorage && rel_links != false) {
            $(document).keydown(function (event) {
                if (event.which == 37 && rel_links.prev != "none") {
                    event.preventDefault();
                    window.location.href = rel_links.prev;
                }
                if (event.which == 39 && rel_links.next != "none") {
                    event.preventDefault();
                    window.location.href = rel_links.next;
                }
            });
        }
    });

}(jQuery));

// IE8 ployfill for GetComputed Style (for Responsive Script below)
if (!window.getComputedStyle) {
    window.getComputedStyle = function(el, pseudo) {
        this.el = el;
        this.getPropertyValue = function(prop) {
            var re = /(\-([a-z]){1})/g;
            if (prop == 'float') prop = 'styleFloat';
            if (re.test(prop)) {
                prop = prop.replace(re, function () {
                    return arguments[2].toUpperCase();
                });
            }
            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
        }
        return this;
    }
}

// as the page loads, call these scripts
jQuery(document).ready(function($) {

    /*
     Responsive jQuery is a tricky thing.
     There's a bunch of different ways to handle
     it, so be sure to research and find the one
     that works for you best.
     */

    /* getting viewport width */
    var responsive_viewport = $(window).width();

    /* if is below 481px */
    if (responsive_viewport < 481) {

    } /* end smallest screen */

    /* if is larger than 481px */
    if (responsive_viewport > 481) {

    } /* end larger than 481px */

    /* if is above or equal to 768px */
    if (responsive_viewport >= 768) {

        /* load gravatars */
        $('.comment img[data-gravatar]').each(function(){
            $(this).attr('src',$(this).attr('data-gravatar'));
        });

    }

    /* off the bat large screen actions */
    if (responsive_viewport > 1030) {

    }


    // add all your scripts here

    // Sidebar sticky resize correctly

   var new_width = $('#sidebar').width();
    $('.hentry .post-info').width(new_width); 
    

    $(window).resize( function() {
      var new_width = $('#sidebar').width();
        $('.hentry .post-info').width(new_width);       
    });


    if($('body').hasClass('home-template')) {
        $('#logo').addClass('animate bounceIn')
    }
    function navToggle() {
        var menuIcon = $('.nav-toggle, .menu-icon'), bodyClick = false
            navHeader = $('#nav'), body = $('body'),
            close = navHeader.find('.close'),
            overlay = $('.overlay').hide();


        // Body click hide menu

        if(bodyClick == true) {
            overlay.show();
            overlay.on('click', function(e) {
                e.preventDefault();
                body.removeClass('show');
                body.addClass('closing');
                overlay.hide();
            })
        }    

        // Menu icon toggle
        menuIcon.on('click', function(e) {
            bodyClick = true;
            e.preventDefault();
            body.toggleClass('show');
            body.removeClass('closing');

        });
        // Close icon toggle
        close.on('click', function(e) {
            body.removeClass('show');
            body.addClass('closing');
    


        });

    };

    navToggle();

    // Remove animation on post template when sticky is activated
    // Sticky Settings using Waypoint.js

    $('.post-template .post-info').waypoint(function(direction) {
        if(direction == "down") {
            $(this).addClass('sticky');
            $('body').find('#content').removeClass('animate');
         } else {
             $(this).removeClass('sticky');           
         }
    });
    $('.article-footer').waypoint(function(direction) {
        if(direction == "up") {
            $('.post-template .post-info').addClass('sticky'); 
        } else {
            $('.post-template .post-info').removeClass('sticky'); 
        }
    }, { offset: '40%' });
    



    $('.back-to-top').click(function () {
      $("html, body").animate({
          scrollTop: 0
      }, 600);
      return false;
    });



}); /* end of as page load scripts */
    

/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT License.
 */
(function(w){
    // This fix addresses an iOS bug, so return early if the UA claims it's something else.
    if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1 ) ){ return; }
    var doc = w.document;
    if( !doc.querySelector ){ return; }
    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
        x, y, z, aig;
    if( !meta ){ return; }
    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true; }
    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false; }
    function checkTilt( e ){
        aig = e.accelerationIncludingGravity;
        x = Math.abs( aig.x );
        y = Math.abs( aig.y );
        z = Math.abs( aig.z );
        // If portrait orientation and in one of the danger zones
        if( !w.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
            if( enabled ){ disableZoom(); } }
        else if( !enabled ){ restoreZoom(); } }
    w.addEventListener( "orientationchange", restoreZoom, false );
    w.addEventListener( "devicemotion", checkTilt, false );
})( this );