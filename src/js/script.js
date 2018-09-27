
$(document).ready(function(){
    'use strict';
    $( "a" ).click(function( event ) {
        event.preventDefault();
    });

    /////Scroll
    var $page = $('html, body');
    $('a[href*="#"]').click(function() {
        $page.animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 1200);
        return false;
    });

    //slider slick start

    $('.your-class').slick({
        mobileFirst: true,
        speed: 400,
        slidesToShow: 1,
        fade: true,
        dots: true,
        centerMode: true,
        autoplay:false,
        arrows: false,
        initialSlide: 1,
        responsive: [
            {
                breakpoint: 1069,
                settings: {
                    adaptiveHeight: true,
                }
            },
        ],

        customPaging: function (slider, i) {
           //FYI just have a look at the object to find aviable information
            //press f12 to access the console
          //you could also debug or look in the source
           return '<strong>' + (i + 1) + '</strong>' + '<span>' + '</span>' ;
        }
    });
    //End slider slick

//mmenu plugin
    var $menu = $("#my-menu").mmenu({
    //   options
    "extensions": [
        "position-right",
        "theme-dark",
        "fullscreen"
    ],
    "autoHeight": true,
    "iconPanels": true,
    "navbar": {
        title: "Mi Music"
    },
    "navbars": [
        {
            "position": "bottom",
            "content": [
                "<a class='fab fa-facebook' href='#/'></a>",
                "<a class='fab fa-twitter' href='#/'></a>",
                "<a class='fab fa-instagram' href='#/'></a>",
                "<a class='fab fa-youtube' href='#/'></a>"
            ]
        }
    ]
});
var $icon = $("#my-icon");
var API = $menu.data( "mmenu" );

$icon.on( "click", function() {
    API.open();
});
$("#my-icon").click(function() {
    API.close();
});
API.bind( "open:finish", function() {
    setTimeout(function() {
        $icon.addClass( "is-active" );
    }, 100);
});
API.bind( "close:finish", function() {
    setTimeout(function() {
        $icon.removeClass( "is-active" );
    }, 100);
});

    $("#my-menu a").click(function () {
        API.close();
    });

//masonry and isotope

    $('.grid').isotope({
  		itemSelector: '.grid-item',
  		masonry: {
    	columnWidth:  '.grid-item',
         isFitWidth: true,
         gutter: 10
  		}
	});
        $('.nav_bottom nav ul li').click(function(){
            var selector = $(this).attr('data-filter');
            $('.grid').isotope({
          filter:selector
        });
        });

//button read more

	$('#btn_more').click(function(){
		$('#mode_content').toggle(3000)
	});

// parallax rellax.js

    $(document).ready(function() {
        var rellax = new Rellax('.rellax', {
            speed: -2,
            center: false,
            wrapper: null,
            round: true,
            vertical: true,
            horizontal: false
        });
    });

    /////////////////Start Validation
    var form = document.forms.contact;

    $(form).submit(function (e) {
        $('.error').empty();

        var inputs = form.elements;

        for(var i = 0; i < inputs.length; i++) {
            var error = '';

            if (inputs[i].type === 'text') {
                error = validateText(inputs[i]);
            } else if (inputs[i].type === 'email') {
                error = validateEmail(inputs[i]);
            }

            if (error) {
                $(inputs[i]).closest('.error_wr').find('.error').text(error);
            }
        }

        if ($('.error:parent').length > 0) {
            e.preventDefault();
        }
    });


    function validateText(input) {
        var min = input.dataset.min,
            max = input.dataset.max,
            value =input.value.trim();

        if (value.length < min) {
            return 'Your input should be not less than ' + min + ' symbols.';
        } else if (value.length > max) {
            return 'Your input should be not longer than ' + max + ' symbols.';
        } else {
            return '';
        }
    }

    function validateEmail(input) {
        var emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
            value = input.value.trim();

        if (emailRegexp.test(value)) {
            return '';
        } else {
            return 'This is not valid email.';
        }
    }

});
////////////end validation

///////Start api you tube
$(document).ready(function(){
// YOU WILL NEED TO ADD YOUR OWN API KEY IN QUOTES ON LINE 5, EVEN FOR THE PREVIEW TO WORK.
// GET YOUR API HERE https://console.developers.google.com/apis/api
// https://developers.google.com/youtube/v3/docs/playlistItems/list
// https://console.developers.google.com/apis/api/youtube.googleapis.com/overview?project=webtut-195115&duration=PT1H


    var key = 'AIzaSyDo8Ypvh-SVxZHPUo4XclArgx5yACUAonU';
    var playlistId = 'RDEMDs8vWIQKMflBG8QUQQaUrw';
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

    var options = {
        part: 'snippet',
        key: key,
        maxResults: 5,
        playlistId: playlistId
    }
    loadVids();
    function loadVids() {
        $.getJSON(URL, options, function (data) {
            var id = data.items[0].snippet.resourceId.videoId;
            mainVid(id);
            resultsLoop(data);
            console.log(data);
        });
    }

    function mainVid(id) {
        var $frame = $('<iframe class="youtube-video"  width="800" height="400" src=\"//www.youtube.com/embed/'+id+'\"  frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
        $('#video').html($frame);
    }
    function resultsLoop(data) {

        $.each(data.items, function (i, item) {

            var thumb = item.snippet.thumbnails.medium;
            var title = "<h4>" + item.snippet.title + "</h4>";
            var vid =  item.snippet.resourceId.videoId;
            var img = "<img src='" + thumb.url + "' width=" + thumb.width + " height=" + thumb.height +  "alt='"+ "class"+"=thumb" +">";
            $('main').append("<article class='details' data-key='"+vid+"'>" +  img + title +"</article>" );
        });
    }
    // CLICK EVENt
    $(".video main").on('click', 'article', function() {
        var id = $(this).attr('data-key');
        console.log(id);
        mainVid(id);

    });

    $(".albumn_listen").click(function () {
        $(".video").css("display", "block");
    });

    $(".fa-times").click(function () {
        $(".video").css("display", "none");
        $("iframe").attr("src", $("iframe").attr("src"));

    });

});

