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
			showClass: "fancybox-throwOutUp",
			hideClass: "fancybox-throwOutDown",
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
			},
		});
		document.querySelectorAll(".modal-close-js").forEach(el => {
			el.addEventListener("click", () => {
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

		// window.addEventListener('resize', () => {
		// 	if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		// }, { passive: true });
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
		Inputmask({ "mask": "+9(999)999-99-99", showMaskOnHover: false }).mask(InputTel);
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
			? (topNav.classList.add('fixed'), setTimeout(() => topNav.classList.add('active'), 500))
			: (topNav.classList.remove('fixed'), setTimeout(() => topNav.classList.remove('active'), 500));
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





	// $('.swiper-button-hand').click(function() {
	// 	if($('.swiper-slide-active')) {
	// 		$('.section-title--js2').addClass('animate__animated animate__fadeInUp');
	// 		setTimeout(() => {
	// 			$('.section-title--js2').removeClass('animate__animated animate__fadeInUp');
	// 		}, 800);
	// 	};
	// });
	let scroller = document.body;
	gsap.registerPlugin(ScrollTrigger);
	ScrollTrigger.defaults({
		toggleActions: "restart pause resume pause"
	});

	let scTrigger = (el, start = '50% bottom', end = 'top top', scrub = .8, pin, markers, pinSpacing, ) => {
		return gsap.timeline({

			scrollTrigger: {
				trigger: el,
				scroller,
				start,
				end,
				scrub,
				pin,
				pinSpacing,
				markers,
				// invalidateOnRefresh: true,
				defaults: {
					// ease: "power3",
					// overwrite: true
				}
			}

		})

	}

	let scTriggerTop = (el, start = '50% bottom',  scrub = .8, pin) => {
		return gsap.timeline({

			scrollTrigger: {
				trigger: el,
				scroller,
				start, 
				scrub,
				pin,
				markers: true,
				// invalidateOnRefresh: true,
				defaults: {
					// ease: "power3",
					// overwrite: true
				}
			}

		})

	}


	// var controller = new ScrollMagic.Controller();


	$('.sParisContentBody__btn').click(function () {
		$(this).toggleClass('active');
		$('.sParisContentBody__text').slideUp(function () {
			// $(this).removeClass('active');
		});
		$('.sParisContentBody__text:hidden').slideDown(function () {
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

	$(document).scroll(function () {
		if ($(document).scrollTop() > $('.page-head').height()) {
			$('.orderProject').addClass('visible');
		} else {
			$('.orderProject').removeClass('visible');
		}
	});


	const mediaQuery = window.matchMedia('(min-width: 767.98px)')
	// Check if the media query is true
	if (mediaQuery.matches) {

		var t5 = scTrigger(".main-wrapper-head", 'top 80',  "+=2500", 3, true);
		t5
			.from(".imageSlider img", { scale: "1.6", duration: 3 })  // in from left
			.to(".imageSlider__slide", { x: "75vw",  duration: 50 }, "+=2")  // in from left: ;
			// .to(".imageSlider__slide", { opacity:1  }, "+=2")  // in from left: ;
	}

	var t6 = scTrigger('.sHavanaContentHead__footer picture', '40% top', '70% top', .8);
	t6
		.to(".sHavanaContentHead__footer img", { scale: 1.2 });

	var t7 = scTrigger(".sHavanaContentHead__content-pic picture", '20% bottom', '90% top', .5);
	t7
		.from(".sHavanaContentHead__content-pic img", { scale: 1.2 });


	var t8 = scTrigger('.sHavanaContentBody__img-wrap picture', '20% bottom', '70% top', .5);
	t8
		.from(".sHavanaContentBody__img-wrap img", { scale: 1.2 });

	// Check if the media query is true
	if (mediaQuery.matches) {
		var t9 = scTrigger(".main-wrapper-body", 'top 80',  "+=1000", 3, true);
		t9
			.from(".sHavanaContentBody__imageSlider img", { scale: "1.6", duration: 3, scrub: 2, delay: 1 })  // in from left: ;
			.to(".sHavanaContentBody__slide", { x: "75vw", duration: 50 },
				"+=2")  // in from left: ;
	}


	var t10 = scTrigger('.sHavanaContentBody__content-pic picture', '20% bottom', '70% top', .5);
	t10
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
	var t11 = scTrigger(".img-wrap-js picture", '20% bottom', '90% top', .5);
	t11
		.from(".img-wrap-js img", { scale: 1.2 });

	var t12 = scTrigger(".page-head + * ", 'top bottom', 'top top', .5);
	t12
		.to(".page-head picture", { scale: 1.2 });

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

	var t131 = scTrigger(".headerBlock", 'top  10%', '+=550vh',  0, true);
	t131
		.to(".firstScreen .section-title--js", { y: "100%", opacity: 0 })
		.to(".firstScreen", { y: "100%", opacity: 0 }, ">-1")
		.to(".firstScreen", {  }, ">+1.5")
		// .from(".secondScreen", { y: "10%"})
		;
	
	
		

		$('.section-title__btn--js').click(function () {
		// $('.section-title--js').addClass('animate__animated animate__fadeOutDown');
		// setTimeout(() => {
		// 	$('.firstScreen').addClass('animate__animated animate__fadeOutDown');
		// 	$('.index-page').css("overflow", "auto")
		// }, 1000);
		$('html, body').animate({ scrollTop: '150vh'}, 0);
	});

	if (mediaQuery.matches) {
		// var sAmericanContent = TweenMax.to(".sAmericanContent__wrap", 1, {scale:1.2, ease:Linear.easeNone});
		var t13 = scTrigger(".sAmericanContent--js", 'top  top', '+=150%', .2, true);
		t13
			.fromTo(".sAmericanContent--js .sAmericanContent__wrap", { x: "100%", opacity: 0 }, { x: "0%", opacity: 1 })
			.fromTo(".sAmericanContent--js  .sAmericanContent__wrap2", { opacity: 0 }, { opacity: 1 });

		var t14 = scTrigger(".sAmericanContent--js2", 'top  top', '+=150%', .2, true);
		t14
			.fromTo(" .sAmericanContent--js2 .sAmericanContent__wrap", { x: "-100%", opacity: 0 }, { x: "0%", opacity: 1 })
			.fromTo(".sAmericanContent--js2  .sAmericanContent__wrap2", { opacity: 0 }, { opacity: 1 })



		// var t151 = scTrigger(".sAmericanContent__picture", 'top  bottom', '+=100%', .2);
		// t151
		var t151 = scTrigger(".sAmericanContent--js3", 'top bottom');
		t151.fromTo(".sAmericanContent--js3 .sAmericanContent__picture img", { opacity: 0, scale: 1.6, 'transform-origin': 'top center', delay: -1 }, { opacity: 1, scale: 1 })
		var t15 = scTrigger(".sAmericanContent--js3", 'top  bottom', '+=300%', .2, true);
		t15
			// .fromTo(" .sAmericanContent__picture img", { opacity: 0, scale: 1.6, 'transform-origin': 'top center' }, { opacity: 1, scale: 1 })

			// var t16 = scTrigger(".sAmericanContent--js3", 'top  top', '+=200%', .2, true);
			// t16
			.to(" .sAmericanContent--js3 .sAmericanContent__bg", { y: "0" })
			.fromTo(" .sAmericanContent--js3 .sAmericanContent__wrap", { x: "100%", opacity: 0 }, { x: "0%", opacity: 1 })
			.fromTo(".sAmericanContent--js3  .sAmericanContent__wrap2", { opacity: 0 }, { opacity: 1 }, ">-1");

		var t161 = scTrigger(".sAmericanContent--js4", 'top bottom');
		t161.fromTo(".sAmericanContent--js4 .sAmericanContent__picture img", { opacity: 0, scale: 1.6, 'transform-origin': 'top center', delay: -1 }, { opacity: 1, scale: 1 })

		var t16 = scTrigger(".sAmericanContent--js4", 'top  bottom', '+=300%', .2, true);
		t16
			// .fromTo(" .sAmericanContent__picture img", { opacity: 0, scale: 1.6, 'transform-origin': 'top center' }, { opacity: 1, scale: 1 })

			// var t16 = scTrigger(".sAmericanContent--js3", 'top  top', '+=200%', .2, true);
			// t16
			.to(" .sAmericanContent--js4 :is(.sAmericanContent__bg, .sAmericanContent__wrap)", { y: "0" })
			.fromTo(" .sAmericanContent--js4 .sAmericanContent__wrap2", { x: "100%", opacity: 0 }, { x: "0%", opacity: 1 })
		// .fromTo(".sAmericanContent--js4  .sAmericanContent__wrap2", { opacity: 0 }, { opacity: 1 }, ">-1");

		// var t17 = scTrigger(".sAmericanContent--js5", 'top  top', '+=100%', .2, true);
		// t17
		// 	.fromTo(" .sAmericanContent--js5 .sAmericanContent__wrap", { x: "100%", opacity: 0 }, { x: "0%", opacity: 1 })
		// 	.fromTo(".sAmericanContent--js5  .sAmericanContent__wrap2", { opacity: 0 }, { opacity: 1 }, ">-1");
		var t17 = scTrigger(".sAmericanContent--js5", 'top  top', '+=100%', .2, true);
		t17
			.fromTo(" .sAmericanContent--js5 .sAmericanContent__wrap", { x: "100%", opacity: 0 }, { x: "0%", opacity: 1 })
			.fromTo(".sAmericanContent--js5  .sAmericanContent__wrap2", { opacity: 0 }, { opacity: 1 }, ">-.5");
			
	}
	let iwrap = document.querySelectorAll(".am-content1__img-wrap, .am-content2__img-wrap, .img-wrap-full");
	if (iwrap) {
		for (const iterator of iwrap) {
			
			var t188 = scTrigger(iterator, '5% bottom', 'bottom  top', 0);
			t188
			.to(iterator.querySelector("img"), { y: "-40vh"});
		}
	}

	if (document.querySelector(".sCards")) {


		var t1 = scTrigger(".sCards__content--1", '10% bottom');
		t1
			.to(".cards-img-1", { y: "-40%", duration: 3.5 })
			.to(".cards-img-1-2", { y: "-30%", duration: 1.5 }, 0)
			.to(".cards-img-1-3", { y: "-30%", duration: 1.5 }, 0)
			.to(".cards-img-2", { y: "-40%", duration: 2 }, 0)
			.to(".cards-img-3", { y: "-60%", duration: 1.5 }, 0)
			.to(".cards-img-4", { y: "-50%", duration: 1.8 }, 0)
			;

		var t2 = scTrigger(".sCards__content--2");
		t2
			.to(".cards-img-7", { y: "-100%", duration: 1.5 })
			.to(".cards-img-8", { y: "-10%", duration: 3 }, 0)
			.to(".cards-img-9", { y: "-100%", duration: 2.5 }, 0)
			.to(".cards-img-10", { y: "-50%", duration: 1.8 }, 0)
			;
		var t3 = scTrigger(".sCards__content--3");
		t3.from(".cards-img-5", { y: "50%" });

		let lastCard = document.querySelectorAll(".sCards__content--last-card");
		for (const iterator of lastCard) {

			var t4 = scTrigger(iterator);
			t4
				.to(iterator.querySelector(".cards-img-6"), { y: "-8%", duration: 1.5 })
			// .to(".cards-img-11", { y: "-19%", duration: 2 })

		}
	}


	gsap.utils.toArray(" .preload-block").forEach(wow => { 
		const animate = wow.dataset.animate;
		function myfunction() { 
			window.setTimeout( () => { wow.classList.add('start')}, 100);
			window.setTimeout( () => { wow.classList.add('finish')}, 500);
		};
		const rect = wow.getBoundingClientRect(); 
		ScrollTrigger.create({
			scroller: scroller,
			trigger: wow,
			start: '10% bottom', 
			toggleActions: "play none play none",
			onEnter: () => myfunction(),
			onLeaveBack: () => myfunction(),
			invalidateOnRefresh: true,
		});
	})

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

	var wow = new WOW(
		{
			animateClass: 'animate__animated', // animation css class (default is animated)
			mobile: false       // trigger animations on mobile devices (default is true)
		}
	);
	wow.init();



	FilePond.registerPlugin(
		// encodes the file as base64 data
		FilePondPluginFileEncode,

		// validates the size of the file
		FilePondPluginFileValidateSize,

		// corrects mobile image orientation
		FilePondPluginImageExifOrientation,

		// previews dropped images
		FilePondPluginImagePreview
	);

	// Select the file input and use 
	// create() to turn it into a pond
	FilePond.create(
		document.querySelector('.filepond'),
		{
			// labelIdle: `Drag & Drop your picture or <span class="filepond--label-action">Browse</span>`,
			labelIdle: `Перетащите свой файл  <br> или загрузите`,
		}
	);

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

window.onload = function () { 
	let pr = document.querySelector('.preload-block--head');
	if (pr) {
		
		window.setTimeout( () => { pr.classList.add('start')}, 100);
		window.setTimeout( () => { pr.classList.add('finish')}, 500);
	}
}