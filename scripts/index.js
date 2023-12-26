const cardTemplate = document.querySelector('#card-template').content;
const cardInput = document.querySelector('.places__list');


initialCards.forEach(function (element) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    
    cardElement.querySelector('.card__image').src = element.link;
    cardElement.querySelector('.card__image').alt = element.name;
    cardElement.querySelector('.card__title').textContent = element.name;
    
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardInput.append(cardElement);

    deleteButton.addEventListener('click', function (evt) {
        const eventTarget = evt.target.closest('.places__item');
        remove__card(eventTarget);
      }); 
  })

  
function remove__card (eventTarget) {
    eventTarget.remove();
}


