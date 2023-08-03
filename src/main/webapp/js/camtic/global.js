const $win = $(window);
const $doc = $(document);
const $html = $('html');

const winW = () => $win.width();
const winH = () => $win.height();
const winSh = () => $win.scrollTop();

//calc(var(--vh, 1vh) * 100)
const setCSSVars = () => {
	document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
	document.documentElement.style.setProperty('--vw', `${window.innerWidth * 0.01}px`);
};
setCSSVars();
window.addEventListener('resize', setCSSVars);

const head = {
	init() {
		this.action();
	},
	action() {
		const header = $('#header');

		header
			.on('click', '.mnu', () => $html.toggleClass('navOn'))
			.on('mouseenter focusin', '.gnb', () => {
				if (matchMedia('screen and (min-width:1025px)').matches) $html.addClass('navOn');
			})
			.on('mouseleave focusout', () => {
				if (matchMedia('screen and (min-width:1025px)').matches) {
					$html.removeClass('navOn');
				}
			})
			.on('click', '.gnb > li > a', function () {
				if (matchMedia('screen and (max-width:1024px)').matches && $(this).next('ul').length > 0) {
					$(this).closest('li').toggleClass('active').siblings().removeClass('active');
					return false;
				}
			});

		const handleHeadFix = () => $html.toggleClass('fix', winSh() > 30);

		$win.on('load scroll', handleHeadFix);

		const gotop = $('._gotop');
		gotop.on('click', () => {
			$html.animate({ scrollTop: 0 }, 500);
			return false;
		});
	},
};

const fam = {
	init() {
		this.action();
	},
	action() {
		const famSwiper = new Swiper('#fam .roll', {
			slidesPerView: 'auto',
			spaceBetween: 10,
			loop: true,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: '#fam .next',
				prevEl: '#fam .prev',
			},
			breakpoints: {
				1024: {
					spaceBetween: 50,
				},
			},
		});

		const autoBtn3 = $('#fam .auto');
		const autoBtnSpan3 = autoBtn3.find('span');
		autoBtn3.on('click', () => {
			autoBtn3.toggleClass('pause');
			autoBtnSpan3.html(autoBtn.hasClass('pause') ? 'PAUSE' : 'PLAY');
			famSwiper.autoplay[autoBtn.hasClass('pause') ? 'pause' : 'start']();
		});
	}
};

const snsMain = {
	init() {
		this.action();
	},
	action() {
		const snsSwiper = new Swiper('#sns .roll', {
			slidesPerView: 'auto',
			spaceBetween: 10,
			loop: true,
			navigation: {
				nextEl: '#sns .next',
				prevEl: '#sns .prev',
			},
			breakpoints: {
				1024: {
					spaceBetween: 40,
				},
			},
		});
	}
};

const sauMain = {
	init() {
		this.action();
	},
	action() {
		const sauSwiper = new Swiper('#sau .area', {
			slidesPerView: 'auto',
			spaceBetween: 10,
			loop: true,
			navigation: {
				nextEl: '#sau .next',
				prevEl: '#sau .prev',
			},
			breakpoints: {
				1024: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
			},
		});
	}
};

const midMain = {
	init() {
		this.action();
	},
	action() {
		const $mid = $('#mid');
		const midSwiper = new Swiper('#mid .roll', {
			loop: true,
			navigation: {
				nextEl: '#mid .next',
				prevEl: '#mid .prev',
			},
			pagination: {
				el: '#mid .page',
				type: 'fraction',
			},
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
		});

		const $autoBtn = $mid.find('.auto');
		const $autoBtnSpan = $autoBtn.find('span');
		$autoBtn.on('click', () => {
			$autoBtn.toggleClass('pause');
			$autoBtnSpan.text($autoBtn.hasClass('pause') ? 'PAUSE' : 'PLAY');
			midSwiper.autoplay[$autoBtn.hasClass('pause') ? 'pause' : 'start']();
		});

		$mid.on('click', '.tab button', (e) => {
			const $li = $(e.currentTarget).closest('li');
			$li.addClass('active').attr('aria-selected', 'true').siblings().removeClass('active').attr('aria-selected', 'false').find('button').attr('aria-selected', 'false');
			$mid.find('.area .item').eq($li.index()).addClass('active').attr('aria-selected', 'true').siblings().removeClass('active').attr('aria-selected', 'false');
		});
	},
};

const zerofill = (value, fillCount) => String(value).padStart(fillCount, '0');

const vis = {
	init() {
		this.action();
	},
	action() {
		const visEl = document.querySelector('#vis');
		const visCount = visEl.querySelectorAll('.vis').length;
		visEl.querySelector('.max').innerHTML = zerofill(visCount, 2);

		const visSwiper = new Swiper('#vis .roll', {
			rewind: true,
			effect: 'fade',
			allowTouchMove: false,
			speed: 1000,
		});

		const visSwiper2 = new Swiper('#vis .roll2', {
			rewind: true,
			effect: 'fade',
			speed: 1000,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			on: {
				init: function () {
					visEl.querySelector('.now').innerHTML = zerofill(this.activeIndex + 1, 2);
					visEl.querySelector('.bar').classList.add('active');
				},
				slideChange: function () {
					visEl.querySelector('.now').innerHTML = zerofill(this.activeIndex + 1, 2);
					visEl.querySelector('.bar').classList.remove('active');
					setTimeout(function(){
						visEl.querySelector('.bar').classList.add('active');
					},100);
					setTimeout(function(){
						visSwiper.slideTo(visSwiper2.realIndex, 1000)
					},400);
				},
			}
		});

		//visSwiper.controller.control = visSwiper2;
		//visSwiper2.controller.control = visSwiper;

		const autoBtn2 = visEl.querySelector('.auto');
		const autoBtnSpan2 = autoBtn2.querySelector('span');
		autoBtn2.addEventListener('click', () => {
			autoBtn2.classList.toggle('pause');
			autoBtnSpan2.textContent = autoBtn2.classList.contains('pause') ? 'PAUSE' : 'PLAY';
		});
	},
};

var rowHeight = {
	init : function(){
		if($('._row').length > 0){
			this.action();
		}
	},
	action : function(){
		$('._row').matchHeight();
		$win.on('load',function(){
			$.fn.matchHeight._update();
		});
	}
}


const tab = {
	init() {
		for (let i = 1; i <= 3; i++) {
			const tabClass = `._tab${i}`;
			const boxClass = `._box${i}`;
			if ($(tabClass).length > 0) {
				this.action(tabClass, boxClass);
			}
		}
	},
	action(tabClass, boxClass) {
		$(tabClass).children().on('click', function() {
			const index = $(this).index();
			$(this).addClass('active').siblings().removeClass('active');
			$(boxClass).eq(index).addClass('active').siblings().removeClass('active');
		});
	}
};

function popUpView(obj){
	var classOn = $("[class^='poptit'][class$='on']");
	$(classOn).removeClass("on");
	$(classOn).next().hide();


	$(obj).parent().addClass(' on');
	$(obj).parent().next('div').show();
	var count = $(obj).parent().next('div').find('div > ul > li').length;

	if(count > 6){
		readmore();
	}
}

function readmore(){
	$('.readMore').readmore({
		blockCSS: 'width:100%;',
		collapsedHeight: 600,
		moreLink: '<div class="btn_rdmore"><a href="#">계속 보기</a></div>',
		lessLink: '<div class="btn_folding"><a href="#">접기</a></div>'
	});
}

function popUpClick(){
	$('html').css("overflow","hidden");
	$('#Service').css("overflow","auto");
	$('html').scrollTop(0);

	$('#Service').css("display","block");
	$('.svgroup_r').css({'height':'98%'});


	var classOn = $("[class^='poptit'][class$='on']");
	var count = $(classOn).next('div').find('div > ul > li').length;

	if(count > 6){
		readmore();
	}
}

function popUpView(obj){
	var classOn = $("[class^='poptit'][class$='on']");
	$(classOn).removeClass("on");
	$(classOn).next().hide();


	$(obj).parent().addClass(' on');
	$(obj).parent().next('div').show();
	var count = $(obj).parent().next('div').find('div > ul > li').length;

	if(count > 6){
		readmore();
	}
}

function popUpClose(){
	$('html').css("overflow","");
	$("#Service").hide();
}

$doc.ready(function(){
	head.init();
	rowHeight.init();
	fam.init();
	tab.init();

	$('#footer .top .rig .site button').on('click',function(){
		$(this).closest('.site').toggleClass('active').siblings().removeClass('active');
	});

	$(".svg_menu ul li a").on("click", function() {
		var popup_li_index = $(this).parent("li").index()+1;
		$(".svg_menu ul li a").removeClass("menu_on");
		$(this).addClass("menu_on");
		$(".svg_contents > div").css("display","none");
		$(".service"+popup_li_index+"").css("display","");
		return false;
	});
});

$win.on('load',function(){
});