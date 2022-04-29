"use strict";
const JSCCommon = { 
	modalCall() {
		const link = '[data-fancybox="modal"], .link-modal-js';

		Fancybox.bind(link, {
			arrows: false,
			// infobar: false,
			touch: false,
			trapFocus: false,
			placeFocusBack: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			groupAll: false,
			groupAttr: false,
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
			},
		});
		document.querySelectorAll(".modal-close-js").forEach(el=>{
			el.addEventListener("click", ()=>{
				Fancybox.close();
			})
		})
		Fancybox.bind('[data-fancybox]', {
			placeFocusBack: false,
		});
		const linkModal = document.querySelectorAll(link);
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		document.addEventListener("click", function (event) {
			const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
			const menu = document.querySelector(".menu-mobile--js");
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
		}, { passive: true });
	},
	closeMenu() {
		const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		if (menu.classList.contains("active")) {
			toggle.forEach(element => element.classList.remove("on"));
			menu.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
		}

	},
	mobileMenu() { 
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".menu-mobile .menu a"); // (1)
			let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)
			if (!container && !toggle) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, { passive: true });
	},

	// tabs  .
	tabscostume(tab) {
		// const tabs = document.querySelectorAll(tab);
		// const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
		// tabs.forEach(element => {
		// 	let tabs = element;
		// 	const tabsCaption = tabs.querySelector(".tabs__caption");
		// 	const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
		// 	const tabsWrap = tabs.querySelector(".tabs__wrap");
		// 	const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
		// 	const random = Math.trunc(Math.random() * 1000);
		// 	tabsBtn.forEach((el, index) => {
		// 		const data = `tab-content-${random}-${index}`;
		// 		el.dataset.tabBtn = data;
		// 		const content = tabsContent[index];
		// 		content.dataset.tabContent = data;
		// 		if (!content.dataset.tabContent == data) return;

		// 		const active = content.classList.contains('active') ? 'active' : '';
		// 		// console.log(el.innerHTML);
		// 		content.insertAdjacentHTML("beforebegin", `<div class="tabs__btn-accordion  btn btn-primary  mb-1 ${active}" data-tab-btn="${data}">${el.innerHTML}</div>`)
		// 	})


		// 	tabs.addEventListener('click', function (element) {
		// 		const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
		// 		if (!btn) return;
		// 		const data = btn.dataset.tabBtn;
		// 		const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
		// 		const content = this.querySelectorAll(`[data-tab-content]`);
		// 		tabsAllBtn.forEach(element => {
		// 			element.dataset.tabBtn == data
		// 				? element.classList.add('active')
		// 				: element.classList.remove('active')
		// 		});
		// 		content.forEach(element => {
		// 			element.dataset.tabContent == data
		// 				? (element.classList.add('active'), element.previousSibling.classList.add('active'))
		// 				: element.classList.remove('active')
		// 		});
		// 	})
		// })

		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).fadeIn().addClass('active');

		});

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask({"mask":"+9(999)999-99-99", showMaskOnHover: false}).mask(InputTel);
	},
	// /inputMask
 
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		$(document).on('click', " .menu li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick)
			}
			else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({ scrollTop: destination - 80 }, 0);
				return false;
			}
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
	toggleShow(toggle, drop) {

		let catalogDrop = drop;
		let catalogToggle = toggle;

		$(document).on('click', catalogToggle, function () {
			$(this).toggleClass('active').next().fadeToggle('fast', function () {
				$(this).toggleClass("active")
			});
		})

		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(catalogDrop + ".active"); // (1)
			let link = event.target.closest(catalogToggle); // (1)
			if (!container || !catalogToggle) {
				$(catalogDrop).removeClass('active').fadeOut();
				$(catalogToggle).removeClass('active');
			};
		}, { passive: true });
	},
	makeDDGroup() {
		let parents = document.querySelectorAll('.dd-group-js');
		for (let parent of parents) {
			if (parent) {
				// childHeads, kind of funny))
				let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
				$(ChildHeads).click(function () {
					let clickedHead = this;

					$(ChildHeads).each(function () {
						if (this === clickedHead) {
							//parent element gain toggle class, style head change via parent
							$(this.parentElement).toggleClass('active');
							$(this.parentElement).find('.dd-content-js').slideToggle(function () {
								$(this).toggleClass('active');
							});
						}
						else {
							$(this.parentElement).removeClass('active');
							$(this.parentElement).find('.dd-content-js').slideUp(function () {
								$(this).removeClass('active');
							});
						}
					});

				});
			}
		}
	},
};
const $ = jQuery;

function eventHandler() {
	// JSCCommon.ifie();
	JSCCommon.modalCall();
	// JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	// JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.makeDDGroup();
	// JSCCommon.toggleShow(".catalog-block__toggle--desctop", '.catalog-block__dropdown');
	// JSCCommon.animateScroll();
	
	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}


	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		// console.log(h);
		
		if (!topNav) return;
		let h = topNav.offsetHeight + 30;
		let h2 = topNav.offsetHeight + 350;
		window.scrollY > h
			? (topNav.classList.add('fixed'), setTimeout(()=> topNav.classList.add('active'), 500))
			: (topNav.classList.remove('fixed'), setTimeout(()=> topNav.classList.remove('active'), 500));
		// window.scrollY > h2
		// 	? topNav.classList.add('active')
		// 	: topNav.classList.remove('active');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();
 

	const secondScreenSwiper = new Swiper('.secondScreen__slider--js', {
		effect: "fade",
		slidesPerView: 1,
		loop: true,
		autoplay: {
			delay: 3500,
			// disableOnInteraction: false,
		},
		// speed: 1500,
		navigation: {
			nextEl: '.secondScreen .swiper-button-next',
			prevEl: '.secondScreen .swiper-button-prev',
		},
		pagination: {
			el: '.secondScreen .swiper-pagination',
			type: 'bullets',
			clickable: true,
			
		},
		on: {
			slideChangeTransitionStart: (swiper) => {
				$('div:not(.swiper-slide-active) .section-title--js2.active').removeClass('active');
				$(' .swiper-slide-active .section-title--js2').addClass('active');  
				var r = document.querySelector(':root');
				var rs = getComputedStyle(r);
				r.style.setProperty('--pagination-count', swiper.realIndex);
			}
		}
	});


	const firstScreenSwiper = new Swiper('.firstScreen__slider--js', {
		effect: "fade",
		// slidesPerView: 1,
		loop: true,
		// speed: 1500,
		allowTouchMove: false,
		autoplay: {
			delay: 3500,
			// disableOnInteraction: false,
		}
	});
	let opt = { 
		// slidesPerView: 1,
		loop: true,
		speed: 1400,
		parallax: true,
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
		},
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 3
		},
		
	}
	const NewsSwiper = new Swiper('.sNews__slider--js', {
		...opt,
		navigation: {
			nextEl: ' .swiper-button-next',
			prevEl: ' .swiper-button-prev',
		}
	});
	
	const NewsSwiperMd = new Swiper('.sNews__slider--md-js', opt);
	
	const NewsSwiperMd2 = new Swiper('.sNews__slider--md2-js', opt);

	NewsSwiper.controller.control = [NewsSwiperMd, NewsSwiperMd2]; 
	NewsSwiperMd.controller.control = NewsSwiper; 
  NewsSwiperMd2.controller.control = NewsSwiper;

 
	
var $hoverClass = $('.sNews__sliders');
var $sl = $('.sNews__slider');
$sl.on('mousedown touchstart', function (e) {
    if (e.type === 'mousedown') {
    $hoverClass.addClass('hovered');
  }
});
$sl.on('mouseup touchend', function (e) {
    if (e.type === 'mouseup') {
    $hoverClass.removeClass('hovered');
  }
});
// $sl.on('mouseup touchmove', function (e) {
//     if (e.type === 'touchmove') {
//     $hoverClass.removeClass('hovered');
//   }
// });


	$('.section-title__btn--js').click(function() {
		$('.section-title--js').addClass('animate__animated animate__fadeOutDown');
		setTimeout(() => {
			$('.firstScreen').addClass('animate__animated animate__fadeOutDown');
			$('.index-page').css("overflow", "auto")
		}, 1000);
	});



	// $('.swiper-button-hand').click(function() {
	// 	if($('.swiper-slide-active')) {
	// 		$('.section-title--js2').addClass('animate__animated animate__fadeInUp');
	// 		setTimeout(() => {
	// 			$('.section-title--js2').removeClass('animate__animated animate__fadeInUp');
	// 		}, 800);
	// 	};
	// });
	let scroller = document.body;
	gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
	ScrollTrigger.defaults({
		toggleActions: "restart pause resume pause"
	});

	let scTrigger = (el, start=  '50% bottom', end ='top top', scrub= .8) => {
		return gsap.timeline({

			scrollTrigger:  {
				trigger: el,
				scroller,
				start,
				end,
				scrub, 
				// invalidateOnRefresh: true,
				defaults: {
					// ease: "power3",
					// overwrite: true
				}
			}
	
		})
	
	}
	if (document.querySelector(".sCards")) {

	
	var t1 = scTrigger(".sCards__content--1");
	t1
		.to(".cards-img-1",  { y: "-40%", duration: 3.5 })
		.to(".cards-img-1-2",  { y: "-30%", duration: 1.5 }, 0)
		.to(".cards-img-1-3",  { y: "-30%", duration: 1.5 }, 0)
		.to(".cards-img-2",  { y: "-40%",duration: 2}, 0)
		.to(".cards-img-3",  { y: "-60%",duration: 1.5}, 0)
		.to(".cards-img-4", { y: "-50%",duration: 1.8}, 0)
		;

	var t2 = scTrigger(".sCards__content--2");
	t2
		.to(".cards-img-7",  { y: "-100%", duration: 1.5})
		.to(".cards-img-8", { y: "-10%",duration: 3}, 0)
		.to(".cards-img-9",  { y: "-100%",duration: 2.5}, 0)
		.to(".cards-img-10", { y: "-50%",duration: 1.8}, 0)
		;
	var t3 = scTrigger(".sCards__content--3");
	t3.from(".cards-img-5", { y: "50%"});

	var t4 = scTrigger(".sCards__content--last-card");
	t4
		.to(".cards-img-6", { y: "-6%", duration: 1.5 })
		// .to(".cards-img-11", { y: "-19%", duration: 2 })

	}

	var controller = new ScrollMagic.Controller();




	let height = window.innerHeight;



	$('.sParisContentBody__btn').click(function() {
		$(this).toggleClass('active');
		$('.sParisContentBody__text').slideUp(function() {
			// $(this).removeClass('active');
		});
		$('.sParisContentBody__text:hidden').slideDown(function() {
			// $(this).addClass('active');
		});
	});
		
	// $(document).scroll(function() {
	// 	let root = this.querySelector('.top-nav');
	// 	let navHeight = $('.top-nav').height() + 100;
	// 	let scrollPos = ($(document).scrollTop() / navHeight) * 100;
	// 	root.style.setProperty('--scrollPos', '-' + scrollPos + "%");
	// 	// root.style.setProperty('--scrollPos', '25%');
	// 	if ($(document).scrollTop() > navHeight + 100) {
	// 		$('.top-nav').addClass('active');
	// 	} else {
	// 		$('.top-nav').removeClass('active');
	// 	}
	// });

	$(document).scroll(function() {
		if ($(document).scrollTop() > $('.page-head').height()) {
			$('.orderProject').addClass('visible');
		} else {
			$('.orderProject').removeClass('visible');
		}
	});

	
	const mediaQuery = window.matchMedia('(min-width: 767.98px)')
	// Check if the media query is true
	if (mediaQuery.matches) { 
		
			var t5 = scTrigger(".imageSlider",'50% 70%','70% top', 3);
			t5
				.from(".imageSlider img", {scale: "1.6", duration: 3, scrub: 2})  // in from left
				.to(".imageSlider__slide", {x: "75vw", duration: 50}, 
				"+=2")  // in from left: ;
			}
			
			var t6 = scTrigger('.sHavanaContentHead__footer picture','20% bottom','70% top', .5);
			t6
				.to(".sHavanaContentHead__footer img", { scale: 1.2 });
				
				var t7 = scTrigger( ".sHavanaContentHead__content-pic picture",'20% bottom','90% top', .5);
				t7
				.from(".sHavanaContentHead__content-pic img", {scale:1.2});
				
				
				var t8 = scTrigger('.sHavanaContentBody__img-wrap picture','20% bottom','70% top', .5);
				t8
					.from(".sHavanaContentBody__img-wrap img", { scale: 1.2 });

	// Check if the media query is true
	if (mediaQuery.matches) {
		var t9 = scTrigger(".sHavanaContentBody__imageSlider",'50% 70%','70% top', 3);
			t9
				.from(".sHavanaContentBody__imageSlider img", {scale: "1.6", duration: 3, scrub: 2, delay: 1})  // in from left: ;
				.to(".sHavanaContentBody__slide", {x: "75vw", duration: 50}, 
				"+=2")  // in from left: ;
	} 
	

	var t9 = scTrigger('.sHavanaContentBody__content-pic picture','20% bottom','70% top', .5);
				t9
					.from(".sHavanaContentBody__content-pic img", { scale: 1.2 });

	// var tweenPicture = TweenMax.to(".sHavanaContentBody__content-pic img", 1.2, {scale:0.9, ease:Linear.easeNone});

	// // create scene to pin and link animation
	// new ScrollMagic.Scene({
	// 	triggerElement: ".sHavanaContentBody__content-pic picture",
	// 	triggerHook: 0.2,
	// 	duration: "100%"
	// })
	// .setTween(tweenPicture)
	// // .addIndicators() // add indicators (requires plugin)
	// .addTo(controller);
	var t7 = scTrigger( ".img-wrap-js picture",'20% bottom','90% top', .5);
				t7
				.from(".img-wrap-js img", {scale:1.2});
	// var sHavanaContentBodyPicture2 = TweenMax.to(".img-wrap-js img", 1, {scale:1.2, ease:Linear.easeNone});

	// // create scene to pin and link animation
	// new ScrollMagic.Scene({
	// 	triggerElement: ".img-wrap-js picture",
	// 	triggerHook: 0.2,
	// 	duration: "100%"
	// })
	// .setTween(sHavanaContentBodyPicture2)
	// // .addIndicators() // add indicators (requires plugin)
	// .addTo(controller);


	if (mediaQuery.matches) {
		// var sAmericanContent = TweenMax.to(".sAmericanContent__wrap", 1, {scale:1.2, ease:Linear.easeNone});
		var sAmericanContent = new TimelineMax()
			// .fromTo(".sAmericanContent__wrap", 1, {x: "100%"}, {x: "0", ease: Linear.easeNone})
			.fromTo(".sAmericanContent--js .sAmericanContent__wrap",    0.1, {x:  "100%"}, {x: "0%", autoAlpha: 1, ease: Linear.easeNone}) 
	
		// create scene to pin and link animation
		new ScrollMagic.Scene({
			triggerElement: ".sAmericanContent--js",
			triggerHook: 'onLeave',
			duration: "100%"
		})
		.setTween(sAmericanContent)
		.setPin(".sAmericanContent--js")
		.setClassToggle(".sAmericanContent--js", "visible")
		// .addIndicators() // add indicators (requires plugin)
		.addTo(controller);
		


		var sAmericanContent = new TimelineMax()
			// .fromTo(".sAmericanContent__wrap", 1, {x: "100%"}, {x: "0", ease: Linear.easeNone})
			.fromTo(".sAmericanContent--js2 .sAmericanContent__wrap",    0.1, {x:  "-100%"}, {x: "0%", autoAlpha: 1, ease: Linear.easeNone}) 
	
		// create scene to pin and link animation
		new ScrollMagic.Scene({
			triggerElement: ".sAmericanContent--js2",
			triggerHook: 'onLeave',
			duration: "100%"
		})
		.setTween(sAmericanContent)
		.setPin(".sAmericanContent--js2")
		.setClassToggle(".sAmericanContent--js2", "visible")
		// .addIndicators() // add indicators (requires plugin)
		.addTo(controller);



		var sAmericanContent2 = new TimelineMax()
			// .fromTo(".sAmericanContent__wrap", 1, {x: "100%"}, {x: "0", ease: Linear.easeNone})
			.fromTo(".sAmericanContent--js3 .sAmericanContent__wrap",    0.1, {x:  "100%"}, {x: "0%", autoAlpha: 1, ease: Linear.easeNone}) 
	
		// create scene to pin and link animation
		new ScrollMagic.Scene({
			triggerElement: ".sAmericanContent--js3",
			triggerHook: 'onLeave',
			duration: "100%"
		})
		.setTween(sAmericanContent2)
		.setPin(".sAmericanContent--js3")
		// .addIndicators() // add indicators (requires plugin)
		.addTo(controller);


		var sAmericanContent3 = new TimelineMax()
			// .fromTo(".sAmericanContent__wrap", 1, {x: "100%"}, {x: "0", ease: Linear.easeNone})
			.fromTo(".sAmericanContent--js5 .sAmericanContent__wrap",    0.1, {x:  "100%"}, {x: "0%", autoAlpha: 1, ease: Linear.easeNone}) 
	
		// create scene to pin and link animation
		new ScrollMagic.Scene({
			triggerElement: ".sAmericanContent--js5",
			triggerHook: 'onLeave',
			duration: "100%"
		})
		.setTween(sAmericanContent3)
		.setPin(".sAmericanContent--js5")
		// .addIndicators() // add indicators (requires plugin)
		.addTo(controller);
	}

	var sAmericanContentPicture2 = TweenMax.to(".sAmericanContent__section-picture img", 1, {scale:1, ease:Linear.easeNone});

	// create scene to pin and link animation
	new ScrollMagic.Scene({
		triggerElement: ".sAmericanContent__section-picture",
		triggerHook: 0.5,
		duration: "100%"
	})
	.setTween(sAmericanContentPicture2)
	// .addIndicators() // add indicators (requires plugin)
	.addTo(controller);

	var sAmericanContentBodyPicture2 = TweenMax.to(".sAmericanBody__bg-img img", 1, {scale:1, ease:Linear.easeNone});

	// create scene to pin and link animation
	new ScrollMagic.Scene({
		triggerElement: ".sAmericanBody__bg-img",
		triggerHook: 0.5,
		duration: "100%"
	})
	.setTween(sAmericanContentBodyPicture2)
	// .addIndicators() // add indicators (requires plugin)
	.addTo(controller);

	// const scroll = new Scrooth({
	// 	element: window,
	// 	strength: 20,
	// 	acceleration: 1.5,
	// 	deceleration: 0.975,
	// });
	
	const mediaContentSwiper = new Swiper('.mediaContent__slider--js', {
		slidesPerView: 1,
		loop: true,
		navigation: {
			nextEl: '.mediaContent .swiper-button-next',
			prevEl: '.mediaContent .swiper-button-prev',
		},
		pagination: {
			el: '.mediaContent .swiper-pagination',
			type: 'bullets',
			clickable: true,
		}
	});


if (document.querySelector('.point')) {
	const mask = document.querySelector('.point');
	const mainModal = document.querySelector('.block404');

	mainModal.addEventListener('mousemove', (e) => {
		mask.style.setProperty('--x', (e.clientX) + 'px');
		mask.style.setProperty('--y', (e.clientY) + 'px');
	}, { passive: true });
}

document.addEventListener("click", function (event) {
	const toggleEv = event.target.closest(".applicationSent__close");
	if (!toggleEv) return;
	toggleEv.closest('.applicationSent').classList.remove('active');
}, { passive: true });


const sConditionsSwiper = new Swiper('.sConditionsSlider__slider--js', {
	slidesPerView: 'auto',
	spaceBetween: 24,
	loop: true,
	// speed: 2500,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	breakpoints: {
		992: {
			slidesPerView: 3,
			spaceBetween: 16,
		},
		1200: {
			slidesPerView: 4
		},
	},
});

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }