$(document).foundation();

(function ($) {
    "use strict";

    $(document).ready(function(){

        $(".at_block").fitVids();

        function featured_image() {

          var article = $('article.post');

          article.each( function(index) {
            var  img = $(this).find('img:first').remove(),
                 get_image = img.attr('src');
            //alert(get_image);
            $(this).addClass('cover').css('background-image', 'url(' + get_image + ')');
          });

          return false;
        }

        featured_image();


        // Background check on
        // Specific images

        //  BackgroundCheck.init({
        //   targets: '.target',
        //   images: 'article.post'
        // }); 
    });

}(jQuery));