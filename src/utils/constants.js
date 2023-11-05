export const templateCard = document.querySelector('#template-places__card');                            //находит темплейт по id
export const places = document.querySelector('.places');                                                 //найти элемент "основной блок места"
export const popupViewerContainer = document.querySelector('#popup-viewer');                             //находим форму мод. окна
export const profileAddButton = document.querySelector('.profile__add-button');                          //Кнопка "добавление новой карточки"
export const buttonEditAvatar = document.querySelector('.profile__edit-avatar');                         //Кнопка "обновления аватарки"
export const profileEditButton = document.querySelector('.profile__edit-button');                        //Кнопка "Редактирования профиля"
export const options = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_active',
  errorClass: 'popup__errorMessange_active',
  inputErrorClass: 'popup__input_error'
};