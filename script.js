const board = document.querySelector('.board')
const btnChangeTheme = document.querySelector('.btn-anime')

const images = './images/humans'
const anime = './images/anime'

// Создаёт массив с набором парных карточек
function generateCardsKit(quantity) {
	let arrayCards = []

	for (let i = 1; i <= quantity / 2; i++) {
		arrayCards.push(i)
		arrayCards.push(i)
	}
	// Перемешивает карточки в массиве
	for (let i = arrayCards.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[arrayCards[i], arrayCards[j]] = [arrayCards[j], arrayCards[i]]
	}
	return arrayCards
}

// Добавляет карты на доску и добавляет порядковый номер в id для каждой карточки
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

// --------------------GAME---------------------

let cardsKit = generateCardsKit(36)
addCardsOnBoard(cardsKit)
let theme = 1

const containers = document.querySelectorAll('.cards-container')

containers.forEach(function (container) {
	container.addEventListener('click', function () {

		const shirt = container.children[0]
		shirt.classList.toggle('hidden')
		const cards = container.children[theme]
		cards.classList.toggle('hidden')
	})
})


btnChangeTheme.addEventListener('click', function () {
	theme = 1 + (theme % 2) // выбор 1 или 2 для темы карточек
	const logo = document.querySelector("p")
	logo.classList.toggle("text-fire")
		logo.classList.toggle('logo')

	containers.forEach(function (container) {
		const cards = container.children
		if (!cards[0].classList.contains('hidden')) {
			return
		}
		cards[1].classList.toggle('hidden')
		cards[2].classList.toggle('hidden')
	})
})


