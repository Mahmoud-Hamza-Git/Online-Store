
// function openNav() {
//     document.getElementById("mySidenav").style.width = "300px";
//     }
    
//     function closeNav() {
//     document.getElementById("mySidenav").style.width = "0";
//     }




// function myFunction(x) {
//     if (x.matches) { // If media query matches
//         $("#togglesidebarbtn").click(function(){
//             $("#sidebartoggle").css(display,block);
//         })
//     } else {
//         $("#togglesidebarbtn").click(function(){
//             $("#sidebartoggle").css(display,none);
//         })
//     }
// }
        
//     var x = window.matchMedia("(max-width: 700px)")
//     myFunction(x) // Call listener function at run time
//     x.addListener(myFunction) // Attach listener function on state changes
    



// Open the side bar 
// function myFunction(x) {
//     if (x.matches) { // If media query matches
//         document.getElementById("sidebartoggle").style.display = "none";
//     } else {
//         document.getElementById("sidebartoggle").style.display = "block";
        
//     }
// }
      
//     var x = window.matchMedia("(max-width: 700px)")
//     myFunction(x) // Call listener function at run time
//     x.addListener(myFunction) // Attach listener function on state changes


// function togglebar(){
//     document.getElementById("sidebartoggle").style.display = "block";
// }
    
 


// // Close the side Bar 
// function myFunction(y) {
//     if (x.matches) { // If media query matches
//         document.getElementById("btnclose").style.display = "block";
//     } else {
//         document.getElementById("btnclose").style.display = "none";
//     }
// }
      
//     var y = window.matchMedia("(max-width: 700px)")
//     myFunction(y) // Call listener function at run time
//     x.addListener(myFunction) // Attach listener function on state changes


// function closeNav(){
//     document.getElementById("sidebartoggle").style.display = "none";
// }
    


function closeNav(){
  document.getElementById("sidebartoggle").style.display = "none";
}
function togglebar(){
  $("#sidebartoggle").css("display","block");
}






// $(document).ready(function () {
//     var itemsMainDiv = ('.MultiCarousel');
//     var itemsDiv = ('.MultiCarousel-inner');
//     var itemWidth = "";

//     $('.leftLst, .rightLst').click(function () {
//         var condition = $(this).hasClass("leftLst");
//         if (condition)
//             click(0, this);
//         else
//             click(1, this)
//     });

//     ResCarouselSize();




//     $(window).resize(function () {
//         ResCarouselSize();
//     });

//     //this function define the size of the items
//     function ResCarouselSize() {
//         var incno = 0;
//         var dataItems = ("data-items");
//         var itemClass = ('.item');
//         var id = 0;
//         var btnParentSb = '';
//         var itemsSplit = '';
//         var sampwidth = $(itemsMainDiv).width();
//         var bodyWidth = $('body').width();
//         $(itemsDiv).each(function () {
//             id = id + 1;
//             var itemNumbers = $(this).find(itemClass).length;
//             btnParentSb = $(this).parent().attr(dataItems);
//             itemsSplit = btnParentSb.split(',');
//             $(this).parent().attr("id", "MultiCarousel" + id);


//             if (bodyWidth >= 1200) {
//                 incno = itemsSplit[3];
//                 itemWidth = sampwidth / incno;
//             }
//             else if (bodyWidth >= 992) {
//                 incno = itemsSplit[2];
//                 itemWidth = sampwidth / incno;
//             }
//             else if (bodyWidth >= 768) {
//                 incno = itemsSplit[1];
//                 itemWidth = sampwidth / incno;
//             }
//             else {
//                 incno = itemsSplit[0];
//                 itemWidth = sampwidth / incno;
//             }
//             $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
//             $(this).find(itemClass).each(function () {
//                 $(this).outerWidth(itemWidth);
//             });

//             $(".leftLst").addClass("over");
//             $(".rightLst").removeClass("over");

//         });
//     }


//     //this function used to move the items
//     function ResCarousel(e, el, s) {
//         var leftBtn = ('.leftLst');
//         var rightBtn = ('.rightLst');
//         var translateXval = '';
//         var divStyle = $(el + ' ' + itemsDiv).css('transform');
//         var values = divStyle.match(/-?[\d\.]+/g);
//         var xds = Math.abs(values[4]);
//         if (e == 0) {
//             translateXval = parseInt(xds) - parseInt(itemWidth * s);
//             $(el + ' ' + rightBtn).removeClass("over");

//             if (translateXval <= itemWidth / 2) {
//                 translateXval = 0;
//                 $(el + ' ' + leftBtn).addClass("over");
//             }
//         }
//         else if (e == 1) {
//             var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
//             translateXval = parseInt(xds) + parseInt(itemWidth * s);
//             $(el + ' ' + leftBtn).removeClass("over");

//             if (translateXval >= itemsCondition - itemWidth / 2) {
//                 translateXval = itemsCondition;
//                 $(el + ' ' + rightBtn).addClass("over");
//             }
//         }
//         $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
//     }

//     //It is used to get some elements from btn
//     function click(ell, ee) {
//         var Parent = "#" + $(ee).parent().attr("id");
//         var slide = $(Parent).attr("data-slide");
//         ResCarousel(ell, Parent, slide);
//     }

// });


let items = document.querySelectorAll('.carousel .carousel-item')

items.forEach((el) => {
    const minPerSlide = 4
    let next = el.nextElementSibling
    for (var i=1; i<minPerSlide; i++) {
        if (!next) {
            // wrap carousel by using first child
        	next = items[0]
      	}
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
})




$(".filterbtn").hide();



(function($) { "use strict";

$(function() {
    var header = $(".start-style");
    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
    
        if (scroll >= 10) {
            header.removeClass('start-style').addClass("scroll-on");
        } else {
            header.removeClass("scroll-on").addClass('start-style');
        }
    });
});		
    

$('body').on('mouseenter mouseleave','.nav-item',function(e){
        if ($(window).width() > 750) {
            var _d=$(e.target).closest('.nav-item');_d.addClass('show');
            setTimeout(function(){
            _d[_d.is(':hover')?'addClass':'removeClass']('show');
            },1);
        }
});	

//Switch light/dark

$("#switch").on('click', function () {
    if ($("body").hasClass("dark")) {
        $("body").removeClass("dark");
        $("#switch").removeClass("switched");
    }
    else {
        $("body").addClass("dark");
        $("#switch").addClass("switched");
    }
});  

})(jQuery); 


$(".checkpayment").click(function(){
    if($(this).prop("checked") == true){
        $(".paymentinformation").hide();
    }
    else if($(this).prop("checked") == false){
      $(".paymentinformation").show();
    }
  });

// $(".onhover").hide();
$("productbox").hover(function(){
    $("p").show();
  });






  
class Slider {
    constructor (rangeElement, valueElement, options) {
      this.rangeElement = rangeElement
      this.valueElement = valueElement
      this.options = options
  
      // Attach a listener to "change" event
      this.rangeElement.addEventListener('input', this.updateSlider.bind(this))
    }
  
    // Initialize the slider
    init() {
      this.rangeElement.setAttribute('min', options.min)
      this.rangeElement.setAttribute('max', options.max)
      this.rangeElement.value = options.cur
  
      this.updateSlider()
    }
  
    // Format the money
    asMoney(value) {
      return  parseFloat(value) +' EG'
        .toLocaleString('en-US', { maximumFractionDigits: 2 })
    }
  
    generateBackground(rangeElement) {   
      if (this.rangeElement.value === this.options.min) {
        return
      }
  
      let percentage =  (this.rangeElement.value - this.options.min) / (this.options.max - this.options.min) + 10
      return 'background: linear-gradient(to right, #50299c, #7a00ff ' + percentage + '%, #d3edff ' + percentage + '%, #dee1e2 100%)'
    }
  
    updateSlider (newValue) {
      this.valueElement.innerHTML = this.asMoney(this.rangeElement.value)
      this.rangeElement.style = this.generateBackground(this.rangeElement.value)
    }
  }
  
  let rangeElement = document.querySelector('.range [type="range"]')
  let valueElement = document.querySelector('.range .range__value span') 
  
  let options = {
    min: 10,
    max: 75000,
    cur: 30
  }
  
  if (rangeElement) {
    let slider = new Slider(rangeElement, valueElement, options)
  
    slider.init()
  } 




  // Instantiate the Bootstrap carousel
// $('.multi-item-carousel').carousel({
//   interval: false
// });

// const prev = document.querySelector(".prev");
// const next = document.querySelector(".next");
// const carousel = document.querySelector(".carousel-container");
// const track = document.querySelector(".track");
// let width = carousel.offsetWidth;
// let index = 0;
// window.addEventListener("resize", function () {
//   width = carousel.offsetWidth;
// });
// next.addEventListener("click", function (e) {
//   e.preventDefault();
//   index = index + 1;
//   prev.classList.add("show");
//   track.style.transform = "translateX(" + index * -width + "px)";
//   if (track.offsetWidth - index * width < index * width) {
//     next.classList.add("hide");
//   }
// });
// prev.addEventListener("click", function () {
//   index = index - 1;
//   next.classList.remove("hide");
//   if (index === 0) {
//     prev.classList.remove("show");
//   }
//   track.style.transform = "translateX(" + index * -width + "px)";
// });



$(".childImageDiv").click(function(){
  $(".feature-image").attr("src",function(){
    $(".childImageDiv").attr(src);
  });
});




// Zomm Images when hover 
$(document).ready(function(){
  $('.feature-image')
    .wrap('<span style="display:block;"></span>')
    .css('display', 'block')
    .parent()
    .zoom();
});

$(document).ready(function(){
  $('#productimage').zoom();
});
$(function() {
  
  var link = $('#navbar a.dot');
  
  // Move to specific section when click on menu link
  link.on('click', function(e) {
    var target = $($(this).attr('href'));
    $('html, body').animate({
      scrollTop: target.offset().top
    }, 600);
    $(this).addClass('active');
    e.preventDefault();
  });
  
  // Run the scrNav when scroll
  $(window).on('scroll', function(){
    scrNav();
  });
  
  // scrNav function 
  // Change active dot according to the active section in the window
  function scrNav() {
    var sTop = $(window).scrollTop();
    $('section').each(function() {
      var id = $(this).attr('id'),
          offset = $(this).offset().top-1,
          height = $(this).height();
      if(sTop >= offset && sTop < offset + height) {
        link.removeClass('active');
        $('#navbar').find('[data-scroll="' + id + '"]').addClass('active');
      }
    });
  }
  scrNav();
});

// Upload file 
function readURL(input) {
  if (input.files && input.files[0]) {

    var reader = new FileReader();

    reader.onload = function(e) {
      $('.image-upload-wrap').hide();

      $('.file-upload-image').attr('src', e.target.result);
      $('.file-upload-content').show();

      $('.image-title').html(input.files[0].name);
    };

    reader.readAsDataURL(input.files[0]);

  } else {
    removeUpload();
  }
}

function removeUpload() {
  $('.file-upload-input').replaceWith($('.file-upload-input').clone());
  $('.file-upload-content').hide();
  $('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function () {
		$('.image-upload-wrap').addClass('image-dropping');
	});
	$('.image-upload-wrap').bind('dragleave', function () {
		$('.image-upload-wrap').removeClass('image-dropping');
});
