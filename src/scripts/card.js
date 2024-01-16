import {imagePopup} from './modal.js';
const cardTemplate = document.querySelector('#card-template').content;


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
    
    cardElement.addEventListener('click', function (evt) {
        likeCard(evt);
    });

    cardImage.addEventListener('click', function (evt) {
        imagePopup(evt);
    });
    
    return cardElement;
}

function removeCard (eventTarget) {
    eventTarget.remove();
}

function likeCard (evt) {
    if (evt.target.classList.contains('card__like-button')){
        evt.target.classList.toggle('card__like-button_is-active');}
}


export {createCard, removeCard, likeCard};