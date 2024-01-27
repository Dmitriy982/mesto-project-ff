import {config, response, getInitialCards, getInformation, editProfile, addNewCard, deleteCard, addLike, removeLike} from './api.js';

const cardTemplate = document.querySelector('#card-template').content;


function createCard (element, removeCard, likeCard, openImagePopup, profileId) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likesCounter = cardElement.querySelector('.card__like-counter');

    cardImage.src = element.link; 
    cardImage.alt = element.name;

    likesCounter.textContent = element.likes.length;

    cardElement.querySelector('.card__title').textContent = element.name;
    
    if (profileId !== element.owner._id) {
        deleteButton.classList.add('card__delete-display-none');
    } else {
        deleteButton.addEventListener('click', (evt) => {
            removeCard(evt, profileId);
        });
    }
    
    likeButton.addEventListener('click', (evt) => {
        likeCard(evt, element.owner._id, likesCounter);
    });

    cardImage.addEventListener('click', openImagePopup); 
    
    return cardElement;
}



function removeCard (evt, id) {
    deleteCard(id)
        .then(() => evt.target.closest('.card').remove())
        .catch((err) => {
            console.log(err);
          })
}


function likeCard (evt, cardId, likesCounter) {
    if (evt.target.classList.contains('card__like-button') &&
        evt.target.classList.toggle('card__like-button_is-active')) {
            addLike(cardId)
                .then((res) => {
                    evt.target.classList.add('card__like-button_is-active');
                    likesCounter.textContent = res.likes.length;
                })
                .catch((err) => {
                    console.log(err);
                  })
        } else {
            removeLike(cardId)
                .then((res) => {
                    evt.target.classList.remove('card__like-button_is-active');
                    likesCounter.textContent = res.likes.length;
                })
                .catch((err) => {
                    console.log(err);
                  })
        };
}


export {createCard, removeCard, likeCard};