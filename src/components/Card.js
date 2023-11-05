export default class Card {

  constructor(templateCard, { deletelikeSRV, sendlikeSRV, handleCardClick, deleteCard }) {
    this._selector = templateCard;
    this.deleteLikeSRV = deletelikeSRV;
    this.sendlikeSRV = sendlikeSRV;
    this._handleCardClick = handleCardClick;
    this._deleteCard = deleteCard;
    this._userID = document.querySelector('.profile__avatar');
  }

  _getElement() {                                                                             //имещ в шаблон для клонирования, записываем ее в переменную
    return this._selector.content.querySelector('.places__card').cloneNode(true);
  }

  _deleteMyCard(getObjcard) {                                                                 //показывает иконку для удаление своей карточки
   // this._trashIcon = newCard.querySelector('.places__trash-icon');                         //найти иконку "иконка корзина"
    if (getObjcard.owner._id === this._userID.id) {                                             //если полученный id карточки равен моему, дать возможность удалять
      this._trashIcon.classList.remove('places__trash-icon_disable');                       //удалит класс скрывающий кнопку
      //this._setEventListeners();
    }
  }

  _findMyLike = (getObjcard, myId, placesLikeIcon) => {                                   //получает объект карточек и мой id
    if (getObjcard.likes.length > 0) {                                                    //Если длина 0 то лайков нет
      getObjcard.likes.forEach(elm => {                                                   //обходим каждый элемент в объекте likes
        if (elm._id === myId) {                                                           //Ищем наш id
          placesLikeIcon.classList.add('places__like-icon_active');                       //сделать лайк активным
        }
      })
    }
  }

  _deleteLikeSRV(placesLikeIcon) {                                       //удалим лайк с сервера и деактивируем иконку
    this.deleteLikeSRV(placesLikeIcon.closest('.places__card').id)
      .then((answer) => {
        placesLikeIcon.classList.remove('places__like-icon_active');
        this._likeCounter.textContent = answer.likes.length;                                                    //установить счетчик лайков из ответа
      })
      .catch((error) => {
        console.log('Ошибка удаления лайка: ' + error);
      });

  }

  _sendlikeSRV(placesLikeIcon) {
    this.sendlikeSRV(placesLikeIcon.closest('.places__card').id)
      .then((answer) => {                                                                         //добавил иконку на серве и ативиурем лайк
        placesLikeIcon.classList.add('places__like-icon_active');
        this._likeCounter.textContent = answer.likes.length;                                                           //установить счетчик лайков из ответа
      })
      .catch((error) => {
        console.log('Ошибка добавления лайка: ' + error);
      });
  }

  _setEventListeners () {
    this._placesLikeIcon.addEventListener('click', (event) => {
      if (event.target.classList.contains('places__like-icon_active')) {               //Если иконка содержит класс (активная)
        this._deleteLikeSRV(event.target);                          //вызвать метод удаления лайка
      } else {
        this._sendlikeSRV(event.target);                            //вызвать метод установки лайка
      }
    });

    this._placesImage.addEventListener('click', (event) => {                                        //событие по нажатию на фотографию
      this._urlImage = event.target.src;
      this._titleImage = event.target.closest('.places__card').querySelector('.places__title').textContent;
      this._handleCardClick(this._urlImage, this._titleImage);                         //при нажание на картинку вызываем функцию открытия попапа
    });

    this._trashIcon.addEventListener('click', (event) =>{                                      //событие по клику Удаление карточки
      this._deleteCard(event);                                                   //показать попап подтверждения удаления => удалить карточку
    });
  }

  createCard = (getObjcard) => {                                                              //Метод создает новую карточку из шаблона и возвращает ее в переменной
    this._cardElement = this._getElement();                                                   //передаем в переменную шаблон
    this._placesLikeIcon = this._cardElement.querySelector('.places__like-icon');             //найти шаблоне "иконка лайка"
    this._placesImage = this._cardElement.querySelector('.places__image');                    //найти шаблоне "фотографию"
    this._likeCounter = this._cardElement.querySelector('.places__like-counter');             //найти шаблоне "счетчик лайков"
    this._placeTitle = this._cardElement.querySelector('.places__title');                     //найти шаблоне "название"
    this._trashIcon = this._cardElement.querySelector('.places__trash-icon');                         //найти иконку "иконка корзина"

    this._placeTitle.textContent = getObjcard.name;                                           //присваиваем значения из инпутов в карточку
    this._placesImage.src = getObjcard.link;
    this._placesImage.alt = 'Изображение ' + getObjcard.name;

    this._cardElement.id = getObjcard._id;                                                      //присвоит иникальный индификатор карточке взятый с сервера

    if (getObjcard.likes.length >= 0) {                                                        //проверить на наличие лайков
      this._likeCounter.textContent = getObjcard.likes.length;                                 //присвоить кол-во лайков
    }

    this._deleteMyCard(getObjcard, this._cardElement);                                          //метод удаления моей карточки
    this._findMyLike(getObjcard, this._userID.id, this._placesLikeIcon);                           //Функция нахождения моих лайков
    this._setEventListeners(getObjcard);                                                                  //установка событий
    return this._cardElement
  }
}