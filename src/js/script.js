$(document).ready(function(){

    $( "a" ).click(function( event ) {
        event.preventDefault();
    });


//slider slick

    $('.your-class').slick({
        mobileFirst: true,
        speed: 400,
        slidesToShow: 1,
        fade: true,
        dots: true,
        centerMode: true,
        autoplay:true,
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
          console.log(slider);
            console.log(i);
           return '<span> '+ (i + 1) + '</span>';
        }
    });


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

    //Validation
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


