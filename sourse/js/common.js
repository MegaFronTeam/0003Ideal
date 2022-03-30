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
	// JSCCommon.inputMask();
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
		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
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


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	});
	// modal window

	const firstScreenSwiper = new Swiper('.firstScreen__slider--js', {
		effect: "fade",
		slidesPerView: 1,
		loop: true,
		// speed: 2500,
		autoplay: {
			delay: 1000,
			disableOnInteraction: false,
		},
	});

	const secondScreenSwiper = new Swiper('.secondScreen__slider--js', {
		// effect: "fade",
		allowTouchMove: false,
		slidesPerView: 1,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: false,
		},
	});

	$('.section-title__btn--js').click(function() {
		$('.section-title--js').addClass('animate__animated animate__fadeOutDown');
		setTimeout(() => {
			$('.firstScreen').addClass('animate__animated animate__fadeOutDown');
			$('.index-page').css("overflow", "auto")
		}, 1000);
	});

	$('.swiper-button-hand').click(function() {
		if($('.swiper-slide-active')) {
			$('.section-title--js2').addClass('animate__animated animate__fadeInUp');
			setTimeout(() => {
				$('.section-title--js2').removeClass('animate__animated animate__fadeInUp');
			}, 600);
		};
	});






	var controller = new ScrollMagic.Controller();


	let height = window.innerHeight;


	var tweens = [
		TweenMax.to(".cards-img-1", 100, { y: "-20%", duration: 4500 }),
		TweenMax.to(".cards-img-2", 40, { y: "-60%",duration: 2000}),
		TweenMax.to(".cards-img-3", 100, { y: "-100%",duration: 2500}),
		TweenMax.to(".cards-img-4", 40, { y: "-50%",duration: 1800}),
		]; // build scene 

	for (var i = 0, l = tweens.length; i < l; i++) {
		var scene = new ScrollMagic.Scene({
			triggerElement: ".sCards__content--1",
			duration: '100%', offset: -150
		}).setTween(tweens[i]) // .addIndicators() // add indicators (requires plugin)
		.addIndicators()
		.addTo(controller);
	} // main animate
	// contact animate


	var tweens2 = [
		TweenMax.to(".cards-img-7", 100, { y: "-50%", duration: 3500 }),
		TweenMax.to(".cards-img-8", 60, { y: "-10%",duration: 3000}),
		TweenMax.to(".cards-img-9", 100, { y: "-100%",duration: 2500}),
		TweenMax.to(".cards-img-10", 40, { y: "-50%",duration: 1800}),
		]; // build scene 

	for (var i = 0, l = tweens2.length; i < l; i++) {
		var scene = new ScrollMagic.Scene({
			triggerElement: ".sCards__content--2",
			duration: '100%', offset: -150
		}).setTween(tweens2[i]) // .addIndicators() // add indicators (requires plugin)
		.addIndicators()
		.addTo(controller);
	} // main animate
	// contact animate

	var tweens3 = [
		TweenMax.to(".cards-img-5", 100, { y: "-24%", duration: 3500 })
		]; // build scene 

	for (var i = 0, l = tweens3.length; i < l; i++) {
		var scene = new ScrollMagic.Scene({
			triggerElement: ".sCards__content--3",
			duration: '100%', offset: -150
		}).setTween(tweens3[i]) // .addIndicators() // add indicators (requires plugin)
		.addIndicators()
		.addTo(controller);
	} // main animate
	// contact animate

	var tweens4 = [
		TweenMax.to(".cards-img-6", 100, { y: "-9%", duration: 1500 })
		]; // build scene 

	for (var i = 0, l = tweens4.length; i < l; i++) {
		var scene = new ScrollMagic.Scene({
			triggerElement: ".sCards__content--last-card",
			duration: '100%', offset: -150
		}).setTween(tweens4[i]) // .addIndicators() // add indicators (requires plugin)
		.addIndicators()
		.addTo(controller);
	} // main animate
	// contact animate

	$('.sParisContentBody__btn').click(function() {
		$(this).toggleClass('active');
		$('.sParisContentBody__text').slideUp(function() {
			// $(this).removeClass('active');
		});
		$('.sParisContentBody__text:hidden').slideDown(function() {
			// $(this).addClass('active');
		});
	});
		
	$(document).scroll(function() {
		let root = this.querySelector('.top-nav');
		let navHeight = $('.top-nav').height() + 100;
		let scrollPos = ($(document).scrollTop() / navHeight) * 100;
		root.style.setProperty('--scrollPos', '-' + scrollPos + "%");
		// root.style.setProperty('--scrollPos', '25%');
		if ($(document).scrollTop() > navHeight + 100) {
			$('.top-nav').addClass('active');
		} else {
			$('.top-nav').removeClass('active');
		}
	});

	$(document).scroll(function() {
		if ($(document).scrollTop() > $('.page-head').height()) {
			$('.orderProject').addClass('visible');
		} else {
			$('.orderProject').removeClass('visible');
		}
	});

	
	const mediaQuery = window.matchMedia('(min-width: 991.98px)')
	// Check if the media query is true
	if (mediaQuery.matches) {
		var wipeAnimation = new TimelineMax()
			.fromTo(".imageSlider img", 1, {x: "0"}, {x: "+75vw", ease: Linear.easeNone})  // in from left
	
		// create scene to pin and link animation
		new ScrollMagic.Scene({
			triggerElement: ".imageSlider",
			triggerHook: 0.5,
			duration: "100%"
		})
		// .setPin(".imageSlider")
		.setTween(wipeAnimation)
		.addIndicators() // add indicators (requires plugin)
		.addTo(controller);
	}

	var tweenPicture = TweenMax.to(".sHavanaContentHead__footer img", 1, {scale:1.2, ease:Linear.easeNone});

	// create scene to pin and link animation
	new ScrollMagic.Scene({
		triggerElement: ".sHavanaContentHead__footer picture",
		triggerHook: 0.2,
		duration: "100%"
	})
	.setTween(tweenPicture)
	.addIndicators() // add indicators (requires plugin)
	.addTo(controller);


	var tweenPicture = TweenMax.to(".sHavanaContentHead__content-pic img", 1.2, {scale:0.9, ease:Linear.easeNone});

	// create scene to pin and link animation
	new ScrollMagic.Scene({
		triggerElement: ".sHavanaContentHead__content-pic picture",
		triggerHook: 0.2,
		duration: "100%"
	})
	.setTween(tweenPicture)
	.addIndicators() // add indicators (requires plugin)
	.addTo(controller);


	var sHavanaContentBodyPicture = TweenMax.to(".sHavanaContentBody__img-wrap img", 1, {scale:1.2, ease:Linear.easeNone});

	// create scene to pin and link animation
	new ScrollMagic.Scene({
		triggerElement: ".sHavanaContentBody__img-wrap picture",
		triggerHook: 0.2,
		duration: "100%"
	})
	.setTween(sHavanaContentBodyPicture)
	.addIndicators() // add indicators (requires plugin)
	.addTo(controller);

	// Check if the media query is true
	if (mediaQuery.matches) {
		var wipeAnimation = new TimelineMax()
			.fromTo(".sHavanaContentBody__imageSlider img", 1, {x: "0"}, {x: "+75vw", ease: Linear.easeNone})  // in from left
	
		// create scene to pin and link animation
		new ScrollMagic.Scene({
			triggerElement: ".sHavanaContentBody__imageSlider",
			triggerHook: 0.5,
			duration: "100%"
		})
		// .setPin(".sHavanaContentBody__imageSlider")
		.setTween(wipeAnimation)
		.addIndicators() // add indicators (requires plugin)
		.addTo(controller);
	}

	var tweenPicture = TweenMax.to(".sHavanaContentBody__content-pic img", 1.2, {scale:0.9, ease:Linear.easeNone});

	// create scene to pin and link animation
	new ScrollMagic.Scene({
		triggerElement: ".sHavanaContentBody__content-pic picture",
		triggerHook: 0.2,
		duration: "100%"
	})
	.setTween(tweenPicture)
	.addIndicators() // add indicators (requires plugin)
	.addTo(controller);

	var sHavanaContentBodyPicture2 = TweenMax.to(".sHavanaContentBody__img-wrap-js img", 1, {scale:1.2, ease:Linear.easeNone});

	// create scene to pin and link animation
	new ScrollMagic.Scene({
		triggerElement: ".sHavanaContentBody__img-wrap-js picture",
		triggerHook: 0.2,
		duration: "100%"
	})
	.setTween(sHavanaContentBodyPicture2)
	.addIndicators() // add indicators (requires plugin)
	.addTo(controller);


	const body = new Scrooth();
	// const scroll = new Scrooth({
	// });
	const scroll = new Scrooth({
		element: window, // target element
		strength: 10,
		acceleration: 2,
		deceleration: 0.5
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