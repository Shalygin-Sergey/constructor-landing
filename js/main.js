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
const getElement = (tagName, classNames, attributes) => {
	const element = document.createElement(tagName);
	if (classNames) {
		//  добавить через спред оператор все классы
		element.classList.add(...classNames)
	}

	if (attributes) {
		for (const attribute in attributes) {
			// перебираем все свойства атрибута и переносим их в элемент
			element[attribute] = attributes[attribute];
		}
	}


	return element;
}
// создаем хедер с параметрами
const createHeader = (param) => {
	// всегда создаем элемент с помощью getElement
	const header = getElement('header');
	const container = getElement('div', ["container"]);
	const wrapper = getElement('div', ['header']);

	// берем из параметров свойство logo если есть то создаем
	if (param.header.logo) {
		// создаем элемент img class logo
		const logo = getElement('img', ['logo'], {
			src: param.header.logo,
			alt: 'Логотип ' + param.title,
		}); 
		
		wrapper.append(logo); // вставляем в wrapper logo
	}

	if (param.header.menu) {
		// const menuWrapper = getElement('div', ['menu-list']);
		// const allMenu = param.header.menu.map((item) => {
		// 	const menuLink = getElement('a', ['menu-link']) 
		// 	menuLink.href = item.link;
		// 	menuLink.textContent = item.title;
		// 	return menuLink;
		// });

		// menuWrapper.append(... allMenu);
		// wrapper.append(menuWrapper);

		const nav = getElement('nav', ['menu-list']);
		const allMenuLink = param.header.menu.map((item) => {
			const link = getElement('a', ['menu-link'], {
				href: item.link,
				textContent: item.title,
			});
			return link;
		});
		nav.append(...allMenuLink);
		wrapper.append(nav);
	};

	if (param.header.social) {
		const socialWrapper = getElement('div', ['social']);
		const allSocial = param.header.social.map((item) => {
			const socialLink = getElement('a', ['social-link']);
			socialLink.append(getElement('img', [], {
				src: item.image,
				alt: item.title,
			}));
			socialLink.href = item.link;
			return socialLink;
		});
		socialWrapper.append(... allSocial);
		wrapper.append(socialWrapper);
	}

	

	// вставляем наши элеменеты через class
	header.append(container);
	container.append(wrapper);
	return header;
}

const movieConstructor = (selector, options) => {
	const app = document.querySelector(selector);
	app.classList.add('body-app');

	app.style.backgroundImage = options.background ?
		`url('${options.background}')` : '';

	// задаем title для страницы
	document.title = options.title;

	// проверка если хедер введен то отрисосываем

	if (options.header) {
		// если есть header в конструкторе то тогда кладем в app
		app.append(createHeader(options));
	};

	if (options.main) {
		app.append(createMain(options));
	};
};

// деструктуризация свойства param сразу несколько создаем в виде переменных
const createMain = ({
	title, 
	main: {genre, rating, description, trailer}}) => {
		// создаем элемент main а далее вложенные элементы, даем им класс и отрисовываем
		const main = getElement('main');
		const container = getElement('div', ['container']);
		main.append(container);
		const wrapper = getElement('div', ['main-content']);
		container.append(wrapper);
		const content = getElement('div', ['content']);
		wrapper.append(content);

		
		// <span class="genre animated fadeInRight">2019,фэнтези</span>
		if (genre) {
			const genreSpan = getElement('span', 
			['genre', 'animated', 'fadeInRight'],
			{textContent: genre});

			content.append(genreSpan);
		}

		// <div class="rating animated fadeInRight">
		if (rating) {
			const ratingBlock = getElement('div', ['rating', 'animated', 'fadeInRight']);
			const ratingStars = getElement('div', ['rating-stars']);
			const ratingNumber = getElement('div', ['rating-number'], {
				textContent: `${rating}/10`
			});

			for (let i = 0; i < 10; i++) {
				const star = getElement('img', ['star'], {
					alt: i ? '' : `Рейтинг ${rating} из 10`,
					src: i < rating ? 'img/star.svg' : 'img/star-o.svg'
				});
				ratingStars.append(star);
			}

			ratingBlock.append(ratingStars, ratingNumber);
			content.append(ratingBlock);
		}


		return main;
	
}


movieConstructor('.app', {
	title: 'Ведьмак',
	background: 'witcher/background.jpg',
	header: {
		logo: 'witcher/logo.png',
		social: [
			{
				title: 'Twitter',
				link: 'https://twitter.com',
				image: 'witcher/social/twitter.svg'
			},
			{
				title: 'Instagram',
				link: 'https://instagram.com',
				image: 'witcher/social/instagram.svg'
			},
			{
				title: 'Facebook',
				link: 'https://facebook.com',
				image: 'witcher/social/facebook.svg'
			},
		],
		menu: [
			{
				title: 'Описание',
				link: '#',
				
			},
			{
				title: 'Трейлер',
				link: '#',
				
			},
			{
				title: 'Отзывы',
				link: '#',
				
			},
		],
	},
	main: {
		genre: '2019, фэнтези',
		rating: '8',
		description: 'Ведьмак Геральт, мутант и убийца чудовищ, на своей верной лошади по кличке Плотва путешествует по Континенту. За тугой мешочек чеканных монет этот мужчина избавит вас от всякой настырной нечисти — хоть от чудищ болотных, оборотней и даже	заколдованных принцесс.',
		trailer: 'https://www.youtube.com/watch?v=P0oJqfLzZzQ',
	},
});

