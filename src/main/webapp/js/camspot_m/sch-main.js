// �좎젣�� btn
var tk_btn = 1;
var reviewSlide;
$(document).ready(function(){

	// 踰좎뒪�� �곹뭹
	$('.item_basket_type ul li').hover(function(){
		$(this).toggleClass('on');
	});

	$('.best-prd .item_basket_type').addClass('swiper-container');
	$('.best-prd .item_basket_type ul').addClass('swiper-wrapper');
	$('.best-prd .item_basket_type ul li').addClass('swiper-slide');

	var bestSlide = new Swiper('.best-prd .swiper-container', {
		slidesPerView: 3,
		spaceBetween: 10,
		//loop: true,
		speed: 1000,
		navigation: {
          nextEl: ".best-prd .swiper-button-next",
          prevEl: ".best-prd .swiper-button-prev",
        },
		scrollbar: {
          el: ".best-prd .swiper-scrollbar",
          //hide: true,
        },	  
		//autoplay: {
		//	delay: 4000,
		//},
		breakpoints: {
			1500: { 
			  slidesPerView: 3,
			},
			1100: { 
			  slidesPerView: 3,
			  spaceBetween: 10,
			},
			767: { 
			  slidesPerView: 3,
			  spaceBetween: 10,
			},
			500: { 
			  slidesPerView: 3,
			  spaceBetween: 10,
			},
		}
	}); 

});