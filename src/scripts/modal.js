const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
function openPopup(popupElement) {
    popupElement.classList.add("popup_is-animated");  
    setTimeout(() => {
    popupElement.classList.add("popup_is-opened");  
    }, 1); 
    document.addEventListener('mousedown', closeByOverlayClick);
    document.addEventListener('keydown', closeOnEsc);
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeOnEsc);
    document.removeEventListener('mousedown', closeByOverlayClick);
}

function closeByOverlayClick(evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
        closePopup(evt.target);
    }
}

function closeOnEsc(evt) {
    if (evt.key === "Escape") {
      const popup = document.querySelector(".popup_is-opened");
      closePopup(popup);
    }
  }

function openImagePopup (evt) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    openPopup(popupTypeImage);
}

export {openPopup, closePopup, openImagePopup};