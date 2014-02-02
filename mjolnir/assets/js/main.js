$(document).foundation();

//  #Configuration
//  ==================================================

    var config = {
      'infinite_scrolling': true,         // Infinite Scrolling (Enable or Disable)
      'disqus_shortname': 'vikingtheme',  // Disqus name
      'analytics_id' : "",                // Google Analytics Id
      'analytics_url': "",                // Google Analytics URL
      'backgroundCheck': true,             // Background Check
      'loading': true
    };



(function ($) {
    "use strict";





//  #Loader
//  ==================================================

        if($('body').hasClass('home-template')) {
            show_loader();
            $('.article-post').addClass('cover');
        }
        $(".at_block").fitVids();


            function show_loader () {
                var loader = $('#loader');
                var windowHeight = $(window).height();
                if(config.loading == true) {
                    if(loader) {
                        $(loader).addClass('visible').removeClass('hidden').css('height', windowHeight);
                    }
                } else {
                    loader.remove();
                    return false;
                }
            }

            function hide_loader() {
                var loader = $('#loader');
                if(config.loading == true) {
                    if(loader) {
                        $(loader).addClass('hidden').removeClass('visible');
                    }
                } else {
                    loader.remove();
                    return false;
                }
            }


    $(window).load( function() {
      if($('body').hasClass('home-template')) {
        hide_loader();
      }
    });

//  #Infiniate Scrolling
//  ==================================================

        $(window).scroll(function () {

            /* -- Endless Scrolling -- */

            if (config.infinite_scrolling == true) {

                $("#pagination").css("display", "none" );

                var next_page = $("#pagination a.older_posts");
                if (next_page.length > 0) {
                    next_page = next_page.attr("href");
                    if ($(window).scrollTop() == ($(document).height() - $(window).height())) {
                        $(".endless").show();

                        $.ajax({
                            url: next_page,
                            timeout: 6000,
                            success: function (html) {

                                if (html) {
                                    var content = $(html),
                                        posts = content.find(".article-post").addClass('cover'),
                                        pagination = content.find("#pagination"),
                                        endless = content.find(".endless");


                                    $("#pagination").remove();

                                    $(".endless").remove();
                                    posts.each(function (index) {
                                        $(posts[index]).appendTo("#mainbody").addClass('animate fadeIn');
                                    });

                                    //Callback when create new article
                                    featured_image();

                                    $("#mainbody").append(endless);
                                    $("#mainbody").append(pagination);
                                    $("#pagination").css("display", "none");
                                    $(".endless").hide(300);
                                }
                            }
                        });
                    } else {
                        if ($("#pagination").css("display") == "block") {
                            $(".no-more").removeClass("animate wobble");
                            $(".no-more").addClass("animate wobble");
                        }


                    }
                } else {
                    $("#pagination").css("display", "none");
                    // $("#pagination").html("<span class=\"button no-more\" style=\"opacity:1\">No more posts</span>");
                    $(".no-more").removeClass("animate wobble");
                    $(".no-more").addClass("animate wobble");

                }
            } else {
                $("#pagination").css("display", "block");
            }
        });


//  #Featured Image
//  ==================================================


        function featured_image() {

            var post_links = $(".article-post .post-link"),
                featured_html = $(".article-post"),
                // featured_link = featured_html.find('a.featured-image-link'),
                post_list_links = [];

            if (post_links.length > 0) {

                post_links.each(function (index) {
                    //Process script
                    post_list_links.push(post_links[index].href);
                    /* -- Next and Prev Post -- */
                });
            }

            if (post_list_links.length > 0) {
                post_list_links.forEach(function (element, index, array) {
                    $.get(post_list_links[index], function (data) {
                        var html = $(data),
                            article = html.find("article.post .post_content"),
                            img = article.find('img[alt="featureimage"]').attr('src'),
                            video = article.find("iframe:first"),
                            blog_cover = html.find(".blog_cover"),
                            featured = featured_html[index];

                            // Check if there is an image; this works with lazyload
                            if(img) {
                              $(featured).attr('data-original', img).css('background-image', 'url(' + img + ')');
                            } else {
                              $(featured).addClass('no-feature');
                            }
                    });
                });
            }
        }


//  #Featured Post Image
//  ==================================================

        function post_featured_image() {
          var post = $('.post-template article'),
              img = post.find('img[alt="featureimage"]').remove(),
               get_image = img.attr('src');

          $('.blog_cover').attr('data-original', img).css('background-image', 'url(' + get_image + ')');
        }

       featured_image();
       post_featured_image();

        $('.article-post, .post_content img').lazyload({
            effect : "fadeIn"
        });


//  #Post page Scripts
//  ==================================================

        if($('body').hasClass('post-template')) {

            //$(".post-template article.post, .author-details .inner").stick_in_parent();

            var disqus_shortname = config.disqus_shortname;

            (function() {
                var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
                (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
            })();
        }

        $('.back-to-top').click(function () {
          $("html, body").animate({
              scrollTop: 0
          }, 600);
          return false;
        });
        // Background check on
        // Specific images


    // });


//  #Loading Scripts
//  ==================================================





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
        if($('body').hasClass('post-template')) {
            $(".author-details").fixTo('#mainbody');
        }
    }

    /* off the bat large screen actions */
    if (responsive_viewport > 1030) {

    }

});

}(jQuery));

