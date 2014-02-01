$(document).foundation();

(function ($) {
    "use strict";


    $(document).ready(function(){
        $('#purple-background').addClass('visible').removeClass('hidden');        
        $('#articles').addClass('hidden').removeClass('visible');


        var config = {
          'infinite_scrolling': true,         // Infinite Scrolling (Enable or Disable)
          'disqus_shortname': 'vikingtheme',  // Disqus name
          'analytics_id' : "",                // Google Analytics Id
          'analytics_url': "",                // Google Analytics URL
          'backgroundCheck': true             // Background Check
        }

        $(".at_block").fitVids();

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
                            success: function (html) {
                                if (html) {
                                    var content = $(html),
                                        posts = content.find(".article-post"),
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


        // Featured Homepage posts images

        // function featured_image() {

        //   var article = $('.home-template article.post');

        //   article.each( function() {
        //     var  img = $(this).find('img[alt="featureimage"]').remove(),
        //          get_image = img.attr('src');
        //     //alert(get_image);
        //     $(this).addClass('cover').css('background-image', 'url(' + get_image + ')');
        //   }); 
          
        // }
        //  featured_image();


        function featured_image() {

            var post_links = $(".article-post .post-link"),
                featured_html = $(".article-post"),
                // featured_link = featured_html.find('a.featured-image-link'),
                post_list_links = [];

            if (post_links.length > 0) {
    //            if ( Modernizr.localstorage ) {
    //                localStorage.clear();
    //            }
                
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


        //Featured Post page image

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
      
        // 
 

        if($('body').hasClass('post-template')) {

            $(".post-template article.post, .author-details .inner").stick_in_parent();

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


    });

    $(window).load( function() {
      $('#purple-background').addClass('hidden').removeClass('visible');
      $('#articles').addClass('visible').removeClass('hidden');
    });

}(jQuery));

