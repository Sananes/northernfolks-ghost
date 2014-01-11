//  Animations, Joe Mottershaw (hellojd)
//  https://github.com/hellojd/animations
//  ==================================================

//  Visible, Sam Sehnert, samatdf, TeamDF
//  https://github.com/teamdf/jquery-visible/
//  ==================================================

function randomClass(){var i=Math.ceil(Math.random()*classAmount);return type=classesArray[i]}function triggerOnce(i,t){"random"==t&&(t=randomClass()),$(i).removeClass("trigger infinite "+triggerClasses).addClass("trigger").addClass(t).one("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){$(this).removeClass("trigger infinite "+triggerClasses)})}function triggerInfinite(i,t){"random"==t&&(t=randomClass()),$(i).removeClass("trigger infinite "+triggerClasses).addClass("trigger infinite").addClass(t).one("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){$(this).removeClass("trigger infinite "+triggerClasses)})}!function(i){i.fn.visible=function(t,n,a){var e=i(this).eq(0),s=e.get(0),r=i(window),o=r.scrollTop(),l=o+r.height(),d=r.scrollLeft(),f=d+r.width(),m=e.offset().top,c=m+e.height(),g=e.offset().left,h=g+e.width(),u=t===!0?c:m,C=t===!0?m:c,w=t===!0?h:g,v=t===!0?g:h,A=n===!0?s.offsetWidth*s.offsetHeight:!0,a=a?a:"both";return"both"===a?!!A&&l>=C&&u>=o&&f>=v&&w>=d:"vertical"===a?!!A&&l>=C&&u>=o:"horizontal"===a?!!A&&f>=v&&w>=d:void 0},i.fn.fireAnimations=function(){function t(){i(window).width()>=960?i(".animate").each(function(t,n){var n=i(n),a=i(this).attr("data-anim-type"),e=i(this).attr("data-anim-delay");n.visible(!0)&&setTimeout(function(){n.addClass(a)},e)}):i(".animate").each(function(t,n){var n=i(n),a=i(this).attr("data-anim-type"),e=i(this).attr("data-anim-delay");setTimeout(function(){n.addClass(a)},e)})}i(document).ready(function(){i("html").removeClass("no-js").addClass("js"),t()}),i(window).scroll(function(){t(),i(window).scrollTop()+i(window).height()==i(document).height()&&t()})},i(".animate").fireAnimations()}(jQuery);var triggerClasses="flash strobe shake bounce tada wave spin pullback wobble pulse pulsate heartbeat panic explode",classesArray=new Array;classesArray=triggerClasses.split(" ");var classAmount=classesArray.length;$(window).resize(function(){$(".animate").fireAnimations()});