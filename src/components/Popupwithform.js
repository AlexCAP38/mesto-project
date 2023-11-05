import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { cbApi }) {
    super(popupSelector);
    this._submitBtn = this._popup.querySelector('.popup__button')                                       //находим кнопку в попапе
    this._submitBtnText = this._submitBtn.textContent                                                   //записываем первоначальное значение
    this.popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._cbApi = cbApi;
  }

  _getInputValues() {                                                                                   //обход инпутов
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;                                                                            //возвращает содержимое в виде объекта
  }

  setEventListeners() {
    super.setEventListeners();
    this.popupForm.addEventListener('submit', this._cbApi);                                             //находим форму навешиваем слушатель на событие сабмит
  }

  closePopup() {
    super.closePopup();
    this.popupForm.reset();                                                                             //При закрытие сьрасываем форму
    this.popupForm.removeEventListener('submit', this._cbApi);                                          //при закрытие удаляем слушатель
  }

  renderLoading(isLoading, loadingText = 'Сохранение...') {                                             //изменяет состояние кнопки
    if (isLoading) {                                                                                    //если true то меняем текст кнопки на сохранение
      this._submitBtn.textContent = loadingText;
    } else {                                                                                            //иначе восстанавливаем начальное состояние
      this._submitBtn.textContent = this._submitBtnText;
    }
  }

  setInputValues(data) {                                                                                //метод вставляет данные в инпуты
    this._inputList.forEach(inputElement => {                                                           //в значение инпута подставляем значения взятые аргумента равный названию инпута
      inputElement.value = data[inputElement.name.replace('popup__input-', '')];                        //popup__input-name т.к. в аргументе не совсем корретные данные преобразуем до нужного формата
    });                                                                                                 //name и about
  }


}