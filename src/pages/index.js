import '../pages/index.css';
import FormValidator from '../components/Formvalidator.js';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/Userinfo.js';
import {
  templateCard,
  places,
  profileAddButton,
  buttonEditAvatar,
  profileEditButton,
  options
} from '../utils/constants.js';

//БЛОК Создание Экземпляров
//===========================================================================================
const useApi = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-28',
  headers: {
    authorization: 'bd02b005-4f65-48b7-9e39-fbb8e07fc766',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo({                                                                              //объявляю класс аргументы объект из 2х селекторов
  titleSelector: '.profile__title',
  subtitleSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar'
})

const createCard = new Card(templateCard, {
  deletelikeSRV: (placesLikeIcon) => { return useApi.deletelikeSRV(placesLikeIcon) },
  sendlikeSRV: (placesLikeIcon) => { return useApi.sendlikeSRV(placesLikeIcon) },
  handleCardClick: (url, name) => { showImage.open(url, name) },
  deleteCard: (evnetClickTrashIcon) => {

    //===========================================================================================
    //Блок подтверждения удаления карточки
    //===========================================================================================
    const popupConfirmDelete = new PopupWithForm('#popup-confirm-delete-card', {
      cbApi: (Event) => {
        Event.preventDefault();                                                                               //пропускает отправку и продолжает выполнть следующий код

        useApi.deleteCardsSRV(evnetClickTrashIcon.target.closest('.places__card').getAttribute('id'))         //отправит запрос на удаление карточик
          .then(() => {
            evnetClickTrashIcon.target.closest('.places__card').remove();
            popupConfirmDelete.closePopup();
          })
          .catch((error) => {
            console.log('Ошибка удаления карточки: ' + error);
          })
          .finally(() => {
          })
      }
    });
    popupConfirmDelete.setEventListeners();
    popupConfirmDelete.openPopup();
  }
});

const section = new Section({
  renderer: (element) => { return createCard.createCard(element) }
},
  places);

Promise.all([useApi.getUserProfile(), useApi.getCardsSRV()])
  .then(([infoUser, infoCards]) => {                                                                    //получаем ответы ввиде массивов
    userInfo.setUserInfo(infoUser);
    section.renderer(infoCards);
  })
  .catch((error) => {
    console.log(error + '   <<-- Есть проблема с выполнением запроса !!!');
  });

const showImage = new PopupWithImage('#popup-viewer');                                                  //Создаем экземпляр для отображения картинок
showImage.setEventListeners();

//===========================================================================================
//БЛОК модальное окно "редактирования профиля"
//===========================================================================================
const formValidatorUserProfile = new FormValidator(options, '#edit-profile');                         //создание экземпляра валидации формы
formValidatorUserProfile.enableValidation();                                                          //Валидация инпутов, проверка на корректность ввода

profileEditButton.addEventListener('click', () => {                                                     //событие по нажатию на кнопку "редактирования профиля"

  popupWithFormUserProfile.setInputValues(userInfo.getUserInfo());                                      //вставляет данные в инпуты
  popupWithFormUserProfile.setEventListeners();                                                         //Событие на закрытие окна (клик на всю форму модального окна)
  formValidatorUserProfile.resetValidation();                                                           //сброс ошибки полей ввода
  popupWithFormUserProfile.openPopup();
});


const popupWithFormUserProfile = new PopupWithForm('#edit-profile',
  {
    cbApi: (Event) => {                                                                                 //БЛОК сохранения и отправка формы "редактирования профиля"
      Event.preventDefault();                                                                           //отменыем стандартное поведение события

      popupWithFormUserProfile.renderLoading(true)                                                      //Вызывает метод при нажантие на кнопку меняем название кнопки

      useApi.sendUserProfile(popupWithFormUserProfile._getInputValues())
        .then((response) => {
          document.querySelector('.profile__title').textContent = response.name;                        //полученное имя запишем в дом элемент имя
          document.querySelector('.profile__subtitle').textContent = response.about;                    //полученное имя запишем в дом элемент субтайтл
          popupWithFormUserProfile.closePopup();
        })
        .finally(() => {
          popupWithFormUserProfile.renderLoading(false)                                                 //Вызывает метод при нажантие на кнопку меняем название кнопки
        });
    }
  });

//===========================================================================================
//БЛОК Обновление аватарки на сервере
//===========================================================================================
const formValidatorEditAvatar = new FormValidator(options, '#popup__form-edit-avatar');//создание экземпляра валидации формы
formValidatorEditAvatar.enableValidation();

buttonEditAvatar.addEventListener('click', () => {
  popupWithFormEditAvatar.setEventListeners();
  formValidatorEditAvatar.resetValidation();                                      //сброс ошибки полей ввода
  popupWithFormEditAvatar.openPopup();
});

const popupWithFormEditAvatar = new PopupWithForm('#popup-edit-avatar', {
  cbApi: (Event) => {
    Event.preventDefault();                                                       //пропускает собтыие сабмит и продолжает выполнть следующий код

    popupWithFormEditAvatar.renderLoading(true)                                   //Вызывает метод при нажантие на кнопку меняем название кнопки

    useApi.sendAvatar(popupWithFormEditAvatar._getInputValues())
      .then((response) => {
        userInfo.setUserInfo('', '', response.avatar);                              //Устанавливаем изображение из ответа
        popupWithFormEditAvatar.closePopup();                                     //закрываем попап
      })
      .catch((error) => {
        console.log('Ошибка отправки: ' + error);
      })
      .finally(() => {
        popupWithFormEditAvatar.renderLoading(false)                              //Вызывает метод при нажантие на кнопку меняем название кнопки
      })
  }
});

//===========================================================================================
//БЛОК "Новая карточка" по нажатию на кнопку открывается попап для добавления новой карточки
//===========================================================================================
const formValidatorNewCard = new FormValidator(options, '#popup-new-card');             //создание экземпляра валидации формы
formValidatorNewCard.enableValidation();                                                //Проверка формы

profileAddButton.addEventListener('click', () => {                                      //Событие по нажатию на кнопку "добавление новой карточки"
  popupWithFormNewCard.setEventListeners();                                             //Устанавливает слушатели на закрытие попап
  formValidatorNewCard.resetValidation();                                               //сброс ошибки полей ввода
  popupWithFormNewCard.openPopup();                                                     //Открывает попап
});

const popupWithFormNewCard = new PopupWithForm('#popup-new-card',
  {
    cbApi: (Event) => {                                                                 //событие по нажатию на кнопку сохранить и добавления новой карточки
      Event.preventDefault();                                                           //пропускает отправку и продолжает выполнть следующий код

      popupWithFormNewCard.renderLoading(true)                                          //Вызывает метод при нажантие на кнопку меняем название кнопки

      useApi.sendCardsSRV(popupWithFormNewCard._getInputValues())                       //отправим запрос на сервер о добавление новой карточки
        .then((result) => {                                                             //при успешно добавление
          section.renderer([result]);                                                   //добавим карточку в дом
          popupWithFormNewCard.closePopup();                                            //закрываем попап
        })
        .catch((error) => {
          console.log('Ошибка отправки: ' + error);
        })
        .finally(() => {
          popupWithFormNewCard.renderLoading(false)                                     //Вызывает метод при нажантие на кнопку меняем название кнопки
        });
    }
  });