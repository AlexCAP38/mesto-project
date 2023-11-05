export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);                                                  //находим форму в ДОМЕ
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handlePopupClose = this._handlePopupClose.bind(this);
  }

  openPopup() {                                                                                           //Функция открытия попапа
    this._popup.classList.add('popup_opened');                                                            //открываем попап
  }

  closePopup() {                                                                                          //Функция закрытия попапа
    this._popup.classList.remove('popup_opened');                                                         //получает элемент попап как аргумент и удаляем у него клас "открывающий попап"
    document.removeEventListener('keydown', this._handleEscClose);                             //Удалить событие нажатия клавиши
    this._popup.removeEventListener('click', this._handlePopupClose);                          //Удалить событие клик
  }

  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);                                //Устанавливаем слушатель на весь документ. отслеживаем нажатие клавиш.
    this._popup.addEventListener('click', this._handlePopupClose);                             //слушатель закрытия попапа
  }

  _handlePopupClose(event) {                                                                              //Функция клика мыши
    if (event.target.classList.contains('popup') ||                                                       //Если клик по оверлаю тогда
      event.target.classList.contains('popup__close')) {                                                  //Если клик по крестику тогда
      this.closePopup();                                                                                  //закрыть попап
    }

  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {                                                                          //Если нажата клавиша Escape, вызовим функция закрытия попапа
      this.closePopup();
    }
  }

}











