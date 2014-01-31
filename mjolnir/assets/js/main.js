$(document).foundation();

(function ($) {
    "use strict";

    $(document).ready(function(){

        $(".at_block").fitVids();

        function featured_image() {

          var article = $('.home-template article.post');

          article.each( function(index) {
            var  img = $(this).find('img:first').remove(),
                 get_image = img.attr('src');
            //alert(get_image);
            $(this).addClass('cover').css('background-image', 'url(' + get_image + ')');
          });

          return false;
        }

        featured_image();

        function post_featured_image() {
          var post = $('.post-template article'),
              img = post.find('img:first').remove(),
               get_image = img.attr('src');

          $('.blog_cover').css('background-image', 'url(' + get_image + ')');
        }

        post_featured_image();

        // Background check on
        // Specific images

        //  BackgroundCheck.init({
        //   targets: '.target',
        //   images: 'article.post'
        // }); 
    });

}(jQuery));