import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard} from './scripts/card.js';
import {openPopup, closeModal} from './scripts/modal.js';

const cardInput = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const profileAddButton = document.querySelector('.profile__add-button');
const nameInput = popupTypeEdit.querySelector('.popup__input_type_name');
const jobInput = popupTypeEdit.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupInputTypeCardName = document.querySelector('.popup__input_type_card-name');
const popupInputTypeUrl = document.querySelector('.popup__input_type_url');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

initialCards.forEach(function (element){
    cardInput.append(createCard(element));
});


popupTypeNewCard.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('card__like-button')){
        evt.target.classList.toggle('card__like-button_is-active');}
   });

popupTypeNewCard.addEventListener('submit', handlecard);

popupTypeEdit.addEventListener('submit', handleFormSubmit);

profileEditButton.addEventListener('click', function () {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupTypeEdit);
}); 


profileAddButton.addEventListener('click', function () {
    openPopup(popupTypeNewCard);
}); 

function handleFormSubmit(evt) {
    const popup = document.querySelector(".popup_is-opened");
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(popup);
}

function handlecard (evt) {
    const popup = document.querySelector(".popup_is-opened");
    evt.preventDefault();
    let card = {
        name:  popupInputTypeCardName.value,
        link:  popupInputTypeUrl.value,
    }
    cardInput.prepend(createCard(card));
    closeModal(popup);
    popupInputTypeCardName.value = '';
    popupInputTypeUrl.value = '';
}

function imagePopup (evt) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    openPopup(popupTypeImage);
}

export {imagePopup};