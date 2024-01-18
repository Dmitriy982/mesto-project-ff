const cardTemplate = document.querySelector('#card-template').content;

function createCard (element, removeCard, likeCard, openImagePopup) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    cardImage.src = element.link; 
    cardImage.alt = element.name; 
    cardElement.querySelector('.card__title').textContent = element.name;
    
    deleteButton.addEventListener('click', removeCard);
    
    likeButton.addEventListener('click', likeCard);

    cardImage.addEventListener('click', openImagePopup); 
    
    return cardElement;
}

function removeCard (evt) {
    const eventTarget = evt.target.closest('.places__item');
    eventTarget.remove();
}

function likeCard (evt) {
    if (evt.target.classList.contains('card__like-button')){
        evt.target.classList.toggle('card__like-button_is-active');}
}


export {createCard, removeCard, likeCard};