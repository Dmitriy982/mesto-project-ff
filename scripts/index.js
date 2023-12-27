const cardTemplate = document.querySelector('#card-template').content;
const cardInput = document.querySelector('.places__list');

function removeCard (eventTarget) {
    eventTarget.remove();
}


function createCard (element) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardImage.src = element.link; 
    cardImage.alt = element.name; 
    cardElement.querySelector('.card__title').textContent = element.name;
    
    deleteButton.addEventListener('click', function (evt) {
        const eventTarget = evt.target.closest('.places__item');
        removeCard(eventTarget);
      }); 
    
    return cardElement;
}


initialCards.forEach(function (element){
    cardInput.append(createCard(element));
});
