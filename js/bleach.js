

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
const createHeader = ({title, header:{logo, menu, social}}) => {
	// всегда создаем элемент с помощью getElement
	const header = getElement('header');
	const container = getElement('div', ["container"]);
	const wrapper = getElement('div', ['header']);

	// берем из параметров свойство logo если есть то создаем
	if (logo) {
		// создаем элемент img class logo
		const logoElem = getElement('img', ['logo'], {
			src: logo,
			alt: 'Логотип ' + title,
		}); 
		
		wrapper.append(logoElem); // вставляем в wrapper logo
	}

	if (menu) {
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
		const allMenuLink = menu.map((item) => {
			const link = getElement('a', ['menu-link'], {
				href: item.link,
				target: '_blank',
				textContent: item.title,
			});
			return link;
		});
		nav.append(...allMenuLink);
		wrapper.append(nav);

		const menuBtn = getElement('button', ['menu-button']);
		menuBtn.addEventListener('click', () => {
			menuBtn.classList.toggle('menu-button-active');
			wrapper.classList.toggle('header-active');
		})
		container.append(menuBtn);
	};

	if (social) {
		const socialWrapper = getElement('div', ['social']);
		const allSocial = social.map((item) => {
			const socialLink = getElement('a', ['social-link']);
			socialLink.append(getElement('img', [], {
				src: item.image,
				alt: item.title,
			}));
			socialLink.href = item.link;
			socialLink.target = '_blank';
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

	// меняем свйоство color на то что получаем от options
	app.style.color = options.fontColor || '';
	app.style.backgroundColor = options.backgroundColor || '';
	//если есть сабколор то меняем в документе то что есть на то что передаем
	if(options.subColor) {
		document.documentElement.style.setProperty('--sub-color', options.subColor);
	}


	// проверяем и создаем фавикон при отрисовке страницы
	if (options.favicon) {
		const index = options.favicon.lastIndexOf('.'); // находим индекс точки в пути фавикона
		const type = options.favicon.substring(index + 1); // находим тип фавикона
		

		const favicon = getElement('link', null, {
			rel: 'icon',
			href: options.favicon,
			type: 'image/' + (type === 'svg' ? 'svg-xml' : type),
		});
		document.head.append(favicon); // вставляем в хэад
	}

	app.style.backgroundImage = options.background ?
		`url('${options.background}')` : '';

	// задаем title для страницы
	document.title = options.title;
	

	// проверка если хедер введен то отрисовываем

	if (options.header) {
		// если есть header в конструкторе то тогда кладем в app
		app.append(createHeader(options));
	}

	if (options.main) {
		app.append(createMain(options));
	}

	if(options.footer) {
		app.append(createFooter(options));
	}
};

// деструктуризация свойства param сразу несколько создаем в виде переменных
const createMain = ({
	title, 
	main: {genre, rating, description, trailer, slider}}) => { // создаем аргументы и в них же будем передавать значения
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
			// создаем элементы звездочек по рейтингу
			const ratingBlock = getElement('div', ['rating', 'animated', 'fadeInRight']);
			const ratingStars = getElement('div', ['rating-stars']);
			const ratingNumber = getElement('div', ['rating-number'], {
				textContent: `${rating}/10`
			});

			// пишем цикл отрисовки звездочек, через создание атрибутов 
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
		// добавляем элменет h1 с текстом и классами
		content.append(getElement('h1', ['main-title', 'animated', 'fadeInRight'], {
			textContent: title},
		))

		// если дескрипшон есть
		if (description) {
			// мы в контент аппендим то что вернет наша функция getElement
			content.append(getElement('p', ['main-description', 'animated', 'fadeInRight'], {
				textContent: description},
			));
		}
		// создаем правило по трейлеру
		if (trailer) {
			const youtubeLink = getElement('a', 
			['button', 'animated', 'fadeInRight', 'youtube-modal'],
			{
				href: trailer,
				textContent: 'Смотреть трейлер',
			})

			const youtubeImageLink = getElement('a', ['play', 'youtube-modal'],
			{
				href: trailer,
				ariaLabel: 'Смотреть трейлер'
			})

			const iconPlay = getElement('img', ['play-img'],
			{
				src: 'img/play.svg',
				alt: '',
				ariaHidden: true,
			})

			content.append(youtubeLink); // в контент добавляем главную кнопку
			wrapper.append(youtubeImageLink); // в обертку добавляем кнопку по центру экрана
			youtubeImageLink.append(iconPlay); // иконку добавляем в кнопку что по центру
		}

		if (slider) {
			const sliderBlock = getElement('div', ['series']);
			const swiperBlock = getElement('div', ['swiper-container']);
			const swiperWrapper = getElement('div', ['swiper-wrapper']);
			const arrow = getElement('button', ['arrow']);

			// обращаемся к массиву с помощью мап
			const sliders = slider.map((item) => {

				

				// создаем элементы слайдера и даем им классы

				const swiperSlide = getElement('div', ['swiper-slide']);
				const card = getElement('figure', ['card']);
				const cardImage = getElement('img', ['card-img'], {
					src: item.img,
					alt: ((item.title ? item.title + ' ' : '') + (item.subtitle ? item.subtitle : '')).trim(),

				});

				card.append(cardImage);

				// делаем проверку если есть title или subtitle то выводим если нет пустая строка
				if (item.title || item.subtitle) {
					const cardDescription = getElement('figcaption', ['card-description']);
					cardDescription.innerHTML = `
						${item.title ? `<p class="card-title">${item.title}</p>` : ''}
						${item.subtitle ? `<p class="card-subtitle">${item.subtitle}</p>` : ''}
					`;

					card.append(cardDescription);
				}

				swiperSlide.append(card);
				return swiperSlide;
			});

			swiperWrapper.append(...sliders);
			swiperBlock.append(swiperWrapper);
			sliderBlock.append(swiperBlock, arrow);

			container.append(sliderBlock);

			new Swiper(swiperBlock, {
				loop: true,
				navigation: {
					nextEl: arrow,
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

			// const menuButton = document.querySelector('.menu-button');
			// const menu = document.querySelector('.header');
			// menuButton.addEventListener('click', function () {
			// 	menuButton.classList.toggle('menu-button-active');
			// 	menu.classList.toggle('header-active');
			// })

		}


		return main;
	
}


const createFooter = ({footer:{leftBlock, navMenu}}) => {
	const footer = getElement('footer', ['footer']);
	const container = getElement('div', ['container']);
	footer.append(container);	
	const footerContent = getElement('div', ['footer-content']);
	container.append(footerContent);
	const left = getElement('div', ['left']);
	const right = getElement('div', ['right']);
	footerContent.append(left, right);

	// если левый блок есть то создаем элемент спан и отображаем текст контент который есть в нем через объект
	if (leftBlock) {
		const span = getElement('span', ['copyright'], {textContent: leftBlock});
		left.append(span);
	}
	
	// если есть навменю то с помощью MAP отрисовываем солько бы не было их, ссылка и текст берется из объекта
	if (navMenu) {
		const nav = getElement('nav', ['footer-menu']);
		const allNavLink = navMenu.map((item) => {
			const link = getElement('a', ['footer-link'], {
				href: item.link,
				textContent: item.title,
			});
			return link; // возвращаем линк
		});
		nav.append(...allNavLink)
		right.append(nav);
	}

	return footer; // возвращаем футер

};




/* movieConstructor('.app', {
	title: 'Блич',
	background: 'witcher/bleach/background.jpg',
	favicon: 'witcher/bleach/logo.jpg',
	fontColor: '#ffffff',
	backgroundColor: '#000000',
	subColor: '#9D2929',
	header: {
		logo: 'witcher/bleach/logo.jpg',
		social: [
			{
				title: 'Twitter',
				link: 'https://twitter.com/hashtag/BLEACH?src=hashtag_click',
				image: 'witcher/social/twitter.svg'
			},
			{
				title: 'Instagram',
				link: 'https://www.instagram.com/official.bleach',
				image: 'witcher/social/instagram.svg'
			},
			{
				title: 'Facebook',
				link: 'https://www.facebook.com/BLEACHMOBILEGAMES/',
				image: 'witcher/social/facebook.svg'
			},
		],
		menu: [
			{
				title: 'Описание',
				link: 'https://thealmanach.ru/social/blich-opisanie-personazhei-anime-blich-opisanie-syuzheta-osnovnye.html',
				
			},
			{
				title: 'Трейлер',
				link: 'https://www.youtube.com/watch?v=6fsK9PT1nG0',
				
			},
			{
				title: 'Отзывы',
				link: 'https://otzovik.com/reviews/multserial_bleach/',
				
			},
		],
	},
	main: {
		genre: '2006, аниме',
		rating: '9',
		description: 'Bleach: Memories of Nobody — анимационный фильм, снятый по мотивам манги «Блич» Тайто Кубо, но никак не связанный с основной сюжетной линией. Сценарий написан Масаси Сого',
		trailer: 'https://www.youtube.com/watch?v=6fsK9PT1nG0',
		slider: [
			{
				img: 'witcher/bleach/series/series-1.jpg',
				title: 'Шинигами',
				subtitle: 'Серия №1',
			},
			{
				img: 'witcher/bleach/series/series-2.jpg',
				title: 'Общество душ',
				subtitle: 'Серия №2',				
			},
			{
				img: 'witcher/bleach/series/series-3.jpg',
				title: 'Пустые',
				subtitle: 'Серия №3',				
			},
			{
				img: 'witcher/bleach/series/series-4.jpg',
				title: 'Аранкары',
				subtitle: 'Серия №4',					
			},
			{
				img: 'witcher/bleach/series/series-5.jpg',
				title: 'Квинси',
				subtitle: 'Серия №5',					
			},
			{
				img: 'witcher/bleach/series/series-6.jpg',
				title: 'Кучики Рукия',
				subtitle: 'Серия №6',					
			},
		]
	},
	footer: {
		leftBlock: '© 2020 The Witcher. All right reserved.',
		navMenu: [
			{
				title: 'Privacy Policy',
				link: '#',
			},
			{
				title: 'Terms of Service',
				link: '#',
			},
			{
				title: 'Legal',
				link: '#',
			},
			
		]
	}
}); */

// что бы не скакал белый экран
// overflow-x hidden в боди и в хтмл и Position relative