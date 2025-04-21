const header = document.querySelector('.header');

const headerHeight = header.offsetHeight; // 요소의 총 높이

document.addEventListener('scroll', () => {
	if( window.scrollY > headerHeight ) {
		header.classList.add('header--dark');
	} else {
		header.classList.remove('header--dark');
	}
});

const home = document.querySelector('.home__container');
const homeHeight = home.offsetHeight;
document.addEventListener('scroll', () => {
	home.style.opacity = 1 - window.scrollY / homeHeight;
})

/* 에로우 헨들링 */
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
	if(window.scrollY > homeHeight / 2) {
		arrowUp.style.opacity = 1;
	} else {
		arrowUp.style.opacity = 0;
	}
})
arrowUp.addEventListener('click', (e) => {
	e.preventDefault(); // a태그의 기본 동작을 제거
	window.scrollTo({ top:0, behavior: 'smooth' });
})

const navbarMenu = document.querySelector('.header__menu');
const navMenu = document.querySelector('.header__nav')
const navbarToggle = document.querySelector('.header__meun__button');
navbarToggle.addEventListener('click', (e) => {
	navbarMenu.classList.toggle('-on')
	navMenu.classList.toggle('-on')
})

const menuItems = document.querySelectorAll('.header__meun__item');

menuItems.forEach(item => {
	item.addEventListener('click', function() {
		menuItems.forEach(otherItem => {
			otherItem.classList.remove('-active');
		});
		this.classList.add('-active');
	});
});

function mediaTamp(){
	if( window.innerWidth <= 768 ){
		navbarToggle.style.display = 'block'
		navMenu.classList.add('tamplet-change')
	} else {
		navbarToggle.style.display = 'none'
		navMenu.classList.remove('tamplet-change')
	}
}

mediaTamp()
window.addEventListener('resize', mediaTamp)