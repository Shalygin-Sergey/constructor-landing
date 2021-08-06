/* new Swiper('.swiper-container', {
	loop: true,
	navigation: {
		nextEl: '.arrow',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 20
		},
		541: {
			slidesPerView: 2,
			spaceBetween: 40
		}
	}
});

const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.header');
menuButton.addEventListener('click', function () {
	menuButton.classList.toggle('menu-button-active');
	menu.classList.toggle('header-active');
}) */
// создаемт функция элемент и добавляет класс
const getElement = (tagName, classNames) => {
	const element = document.createElement(tagName);
	if (classNames) {
		element.classList.add(...classNames)
	}
	return element;
}
// создаем хедер с параметрами
const createHeader = (param) => {
	// всегда создаем элемент с помощью getElement
	const header = getElement('header');
	const container = getElement('div', ["container"]);
	const wrapper = getElement('div', ['header']);

	if (param.header.logo) {
		const logo = getElement('img', ['logo']);
		logo.src = param.header.logo;
		logo.alt = 'Логотип ' + param.title;
		wrapper.append(logo);
	}

	header.append(container);
	container.append(wrapper);
	return header;
}

const movieConstructor = (selector, options) => {
	const app = document.querySelector(selector);
	app.classList.add('body-app');

	// проверка если хедер введен то отрисосываем

	if (options.header) {
		// если есть header в конструкторе то тогда кладем в app
		app.append(createHeader(options));
	}
};



movieConstructor('.app', {
	title: 'Ведьмак',
	header: {
		logo: 'witcher/logo.png',
		social: [
			{
				title: '',
				link: '',
				image: ''
			},
			{
				title: '',
				link: '',
				image: ''
			},
			{
				title: '',
				link: '',
				image: ''
			},
		]
	}
});