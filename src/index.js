import './pages/index.css';
import {createCard, removeCard, likeCard} from './scripts/card.js';
import {openPopup, closePopup, openImagePopup} from './scripts/modal.js';
import {getInitialCards, getInformation, editProfile, addNewCard, changeProfileAvatar} from './scripts/api.js';
import {enableValidation, clearValidation} from './scripts/validation.js';
import { data } from 'autoprefixer';


const cardSection = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');

const popupTypeEditForm = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

const profileAddButton = document.querySelector('.profile__add-button');
const nameInput = popupTypeEditForm.querySelector('.popup__input_type_name');
const jobInput = popupTypeEditForm.querySelector('.popup__input_type_description');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const profileAvatar = profileImage.style;
const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const avatarLink = popupTypeAvatar.querySelector('.popup__input_type_url');

const popupInputTypeCardName = document.querySelector('.popup__input_type_card-name');
const popupInputTypeUrl = document.querySelector('.popup__input_type_url');
const closeButtons = document.querySelectorAll('.popup__close');

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__input-error-active'
}; 

let profileId = '';


closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
  });

popupTypeNewCard.addEventListener('submit', handleCardFormSubmit);

popupTypeEditForm.addEventListener('submit', handleProfileFormSubmit);

profileImage.addEventListener('click', function() {
  openPopup(popupTypeAvatar);
});

profileEditButton.addEventListener('click', function () {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupTypeEditForm);
    clearValidation(popupTypeEditForm, validationSettings);
}); 


profileAddButton.addEventListener('click', function () {
    openPopup(popupTypeNewCard);
}); 

  
enableValidation(validationSettings);


Promise.all([getInformation(), getInitialCards()])
  .then(([profile, cards]) => {
      profileTitle.textContent = profile.name;
      profileDescription.textContent = profile.about;
      profileAvatar.backgroundImage = `url('${profile.avatar}')`;
      profileId = profile._id;
      cards.forEach(function (element){
        cardSection.append(createCard(element, removeCard, likeCard, openImagePopup, profileId));
      });
  })
  .catch((err) => {
    console.log(err);
  });


function handleProfileFormSubmit(evt) {
  const button = popupTypeEditForm.querySelector(".popup__button");
  evt.preventDefault(); 
  button.textContent = "Сохранить...";
  editProfile(nameInput.value, jobInput.value)
  .then(() =>{
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value
    closePopup(popupTypeEditForm);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    button.textContent = "Сохранить";
  });
};


function handleCardFormSubmit (evt) {
  const button = popupTypeNewCard.querySelector(".popup__button");
  evt.preventDefault();
  button.textContent = "Сохранить...";
  addNewCard(popupInputTypeCardName.value, popupInputTypeUrl.value)
  .then((data) => {
    cardSection.prepend(createCard(data, removeCard, likeCard, openImagePopup, profileId));
    closePopup(popupTypeNewCard);
    evt.target.reset();
    button.classList.add(validationSettings.inactiveButtonClass);
    button.disabled = true;
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    button.textContent = "Сохранить";
  });
}

function handleChangeAvatar (evt) {
  const button = popupTypeAvatar.querySelector(".popup__button");
  evt.preventDefault();
  button.textContent = "Сохранить...";
  changeProfileAvatar(avatarLink)
    .then((link) => {
      profileAvatar.backgroundImage = `url('${link.avatar}')`
      closePopup(popupTypeAvatar);
      evt.target.reset();
      button.classList.add(validationSettings.inactiveButtonClass);
      button.disabled = true;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = "Сохранить";
    }); 
}

popupTypeAvatar.addEventListener('submit', handleChangeAvatar);
