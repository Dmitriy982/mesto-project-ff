const showInputError = (formElement, inputElement, errorMessage, validationSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationSettings.errorClass);
};

const hideInputError = (formElement, inputElement, validationSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorElement.classList.remove(validationSettings.errorClass);
    errorElement.textContent = '';
  };

const checkInputValidity = (formElement, inputElement, validationSettings) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
    } else {
      hideInputError(formElement, inputElement, validationSettings);
    }
};

const toggleButtonState = (inputList, buttonElement, validationSettings) =>{
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(validationSettings.inactiveButtonClass);
      buttonElement.disabled = true;

    } else {
      buttonElement.classList.remove(validationSettings.inactiveButtonClass);
      buttonElement.disabled = false;
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputList) => {
      return !inputList.validity.valid;
    });
};

const setEventListeners = (formElement, validationSettings) => {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationSettings);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, validationSettings);
        toggleButtonState(inputList, buttonElement, validationSettings);
      });
    });
  };
  
const enableValidation = (validationSettings) => {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      setEventListeners(formElement, validationSettings);    
    });
  };

const clearValidation = (formElement, validationSettings) => {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
    inputList.forEach((inputElement) =>{
      hideInputError(formElement, inputElement, validationSettings);
    });
    toggleButtonState(inputList, buttonElement, validationSettings);
}

export {enableValidation, clearValidation};