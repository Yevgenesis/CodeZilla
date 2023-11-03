let board = document.querySelector('.board')
let imgPath = './images/'

// Создаёт массив с набором парных карточек
function generateCardsKit(quantity) {
	let arrayCards = []

	for (let i = 1; i <= quantity / 2; i++) {
		arrayCards.push({ id: 0, name: i, state: false })
		arrayCards.push({ id: 0, name: i, state: false })
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
		board.innerHTML += `<img id="${i}" class="card" src="${imgPath}${cardsArray[i].name}.jpeg" alt="${cardsArray[i].name}">`
        cardsArray[i].id = i
	}
}

// --------------------GAME---------------------
// Будет три уровня сложности 
// Джун - 
let cardsKit = generateCardsKit(36) 
addCardsOnBoard(cardsKit)

let currentCard = { id: null, name: 0 }

let cards = document.querySelectorAll('.card')
cards.forEach(function (card) {
	card.addEventListener('click', function () {
		const idCard = card.getAttribute('id')
		const nameCard = card.getAttribute('alt')
		if (currentCard.id == null) {
			currentCard.id = idCard
			currentCard.name = nameCard
		} else if (currentCard.name == nameCard && currentCard.id != idCard) {
			console.log('Угадал МОЛОДЕЦ!')
			currentCard.id = null
		} else if (currentCard.name != nameCard) {
			console.log('Эх! Не то(((')
			currentCard.id = null
		}
	})
})
