import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupViewerImage = this._popup.querySelector('.popup__image');               //в форме ищем элемент для картинки
    this._popupViewerTitle = this._popup.querySelector('.popup__title');               // в форме ище элемент для наименование
  }

  open(url, name) {
    super.openPopup();
    this._popupViewerImage.setAttribute('src', url);                                    //присваиваем урл атрибут
    this._popupViewerImage.setAttribute('alt', 'Изображение ' + name);                  //присваиваем алт атрибут
    this._popupViewerTitle.textContent = name;                                          //присваиваем название изображения
  }
}