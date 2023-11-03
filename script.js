const board = document.querySelector('.board')
const btnAnime = document.querySelector('.btn-anime')

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
			<img class="card hidden" src="${images}/${cardsArray[i]}.jpeg" alt="${cardsArray[i]}">
			<img class="card" src="${anime}/${cardsArray[i]}.jpeg" alt="${cardsArray[i]}">
		</div>`
	}
}

// --------------------GAME---------------------
// Будет три уровня сложности
// Джун - 8
// middle - 16
// senior - 36

let cardsKit = generateCardsKit(36)
addCardsOnBoard(cardsKit)

const cards = document.querySelectorAll('dev img')

btnAnime.addEventListener('click', function () {
	if (btnAnime.innerText == 'HUMAN') {
		btnAnime.innerText = 'ANIME'
	} else {
		btnAnime.innerText = 'HUMAN'
	}
	cards.forEach(function (card) {
		card.classList.toggle('hidden')
	})
})

// cards.forEach(function (card) {
// 	card.addEventListener('click', function () {

// 	})
// })
