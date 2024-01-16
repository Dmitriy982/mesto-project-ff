
function openPopup(popupElement) {
    const closeButton = popupElement.querySelector('.popup__close');
    popupElement.classList.add('popup_is-opened');
    popupElement.classList.add('popup_is-animated');
    closeButton.addEventListener('click', function(){
        closeModal(popupElement);
    });
    document.addEventListener('mousedown', closeByOverlayClick);
    document.addEventListener('keydown', closeOnEsc);
}

function closeModal(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeOnEsc);
    document.removeEventListener('mousedown', closeByOverlayClick);
}

function closeByOverlayClick(evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
        closeModal(evt.target);
    }
}

function closeOnEsc(evt) {
    if (evt.key === "Escape") {
      const popup = document.querySelector(".popup_is-opened");
      closeModal(popup);
    }
  }

function imagePopup (evt) {
    const popupTypeImage = document.querySelector('.popup_type_image');
    const popupImage = document.querySelector('.popup__image');
    const popupCaption = document.querySelector('.popup__caption');
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    openPopup(popupTypeImage);
}

export {openPopup, closeModal, imagePopup};