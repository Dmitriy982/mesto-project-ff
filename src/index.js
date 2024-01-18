import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, removeCard, likeCard} from './scripts/card.js';
import {openPopup, closePopup, openImagePopup} from './scripts/modal.js';

const cardSection = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEditForm = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const profileAddButton = document.querySelector('.profile__add-button');
const nameInput = popupTypeEditForm.querySelector('.popup__input_type_name');
const jobInput = popupTypeEditForm.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupInputTypeCardName = document.querySelector('.popup__input_type_card-name');
const popupInputTypeUrl = document.querySelector('.popup__input_type_url');
const closeButtons = document.querySelectorAll('.popup__close');

initialCards.forEach(function (element){
    cardSection.append(createCard(element, removeCard, likeCard, openImagePopup));
});

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
  });

popupTypeNewCard.addEventListener('submit', handlecard);

popupTypeEditForm.addEventListener('submit', handleProfileFormSubmit);

profileEditButton.addEventListener('click', function () {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupTypeEditForm);
}); 


profileAddButton.addEventListener('click', function () {
    openPopup(popupTypeNewCard);
}); 

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupTypeEditForm);
}

function handlecard (evt) {
    evt.preventDefault();
    const card = {
        name:  popupInputTypeCardName.value,
        link:  popupInputTypeUrl.value,
    }
    cardSection.prepend(createCard(card, removeCard, likeCard, openImagePopup));
    closePopup(popupTypeNewCard);
    evt.target.reset();
}

