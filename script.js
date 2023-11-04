const board = document.querySelector('.board')
const btnChangeTheme = document.querySelector('.btn-anime')

const images = './images/humans'
const anime = './images/anime'

// Создаёт шаблон-массив из 36 элементов
// (16 пар с именами картинок)
function generateCardsKit(quantity) {
	let arrayCards = []

	for (let i = 1; i <= quantity / 2; i++) {
		arrayCards.push(i)
		arrayCards.push(i)
	}
	// Перемешивает имена в шаблон-массиве
	for (let i = arrayCards.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[arrayCards[i], arrayCards[j]] = [arrayCards[j], arrayCards[i]]
	}
	console.log(arrayCards)
	return arrayCards
}

// Для каждого элемента из шаблон-массива, создаёт контейнеры с id и
// тремя элементами (обложка, карта, карта-аниме), устанавливает обложу видимой
// и добавляет контейнер на доску
function addCardsOnBoard(cardsArray) {
	for (let i = 0; i < cardsArray.length; i++) {
		board.innerHTML += `
		<div id="${i}" class="cards-container">
			<img class="shirt" src="./images/shirt.jpeg" alt="shirt">
			<img class="card hidden" src="${images}/${cardsArray[i]}.jpeg" alt="${cardsArray[i]}">
			<img class="card hidden" src="${anime}/${cardsArray[i]}.jpeg" alt="${cardsArray[i]}">
		</div>`
	}
}

// Переворачивает карту
function turnOverTheCard(cardContainer) {
	const shirt = cardContainer.children[0] // Достаёт обложку (перевёрнутая карта)
	shirt.classList.toggle('hidden') // Устанавливает обложку невидимой
	const cards = cardContainer.children[cardsTheme]
	cards.classList.toggle('hidden') // Устанавливает видимой карту с текущей темой
}

// --------------------GAME---------------------

let cardsKit = generateCardsKit(36)
addCardsOnBoard(cardsKit)
let cardsTheme = 1 // 1-фото, 2-картинки-аниме
let pastCard = {}
let countCurrentCards = 0
let MistakeCounter = 0 

const containers = document.querySelectorAll('.cards-container')
containers.forEach(function (cardContainer) {
	cardContainer.addEventListener('click', function () {
		const cards = cardContainer.children
		const cardName = cards[cardsTheme].getAttribute("alt")

		if (cards[0].classList.contains('hidden') || countCurrentCards == 2) {
			return
		}

		if (countCurrentCards === 0) {
			countCurrentCards = 1
			
			pastCard = {id: cardContainer.id,name: cardName}
			turnOverTheCard(cardContainer)
			// проверить конец игры
			return
		} else {
			turnOverTheCard(cardContainer)
			countCurrentCards = 2

			if (cardName == pastCard.name) {
				console.log('GOOOD!')
				countCurrentCards = 0
				pastCard = {}
			} else {
				console.log('NO!')
				const pastCardContainer = document.getElementById(pastCard.id)
				setTimeout(function () {
					turnOverTheCard(cardContainer)
					turnOverTheCard(pastCardContainer)
					countCurrentCards = 0
				}, 1500)
				pastCard= {}
			}
		}
	})
})

// Нажатие на кнопку смены темы
btnChangeTheme.addEventListener('click', function () {
	cardsTheme = 1 + (cardsTheme % 2) //  меняет темы карточек: 1 или 2
	const logo = document.querySelector('p')
	logo.classList.toggle('text-fire') // Включает эффект огня на лого

	// Перебирает все открытые карты и меняет в них тему
	containers.forEach(function (container) {
		const cards = container.children
		if (!cards[0].classList.contains('hidden')) {
			return
		}
		cards[1].classList.toggle('hidden')
		cards[2].classList.toggle('hidden')
	})
})
