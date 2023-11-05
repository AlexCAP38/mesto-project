export default class FormValidator {
  constructor({ ...selectorList }, nameForm) {
    this._selectorList = selectorList;
    this._nameForm = nameForm;                                                            //имя формы

  }

  enableValidation() {                                                                    //основаня функция проверки
    this._formElement = document.querySelector(this._nameForm);                           //полученная форма
    this._setEventListeners();                                                            //навешиваем события

  }

  _setEventListeners() {                                                                  //Установит слушатели на инпуты и проверит их валидность
    this._buttonElement = this._formElement.querySelector(this._selectorList.submitButtonSelector);    //находим кнопку в форме
    this._inputList = Array.from(this._formElement.querySelectorAll(this._selectorList.inputSelector));//ищем все инпуты в форме

    this._inputList.forEach((element) => {                                                //обойдет все инпуты из массива
      element.addEventListener('input', () => {                                           //Событие по вводу
        this.isValid(element);                                                            //Проверяет введенные данные на валидность
        this._toggleButtonState();                                                        //При вводе проверит все инпуты в форме на валидность в зависимости от суммарного состояния всех инпутов активирует либо деактивирует кнопку Submit
      });

    });
  }

  //Отвечает за проверку введенных данных и выдачу сообщенией об ошибках, принимает аргумент один инпут
  isValid(inputElement) {                                                         //принемаем один инпут, и объект из селекторов

    if (!inputElement.validity.valid) {                                           //если состонияние инпута.valid false тогда будет выдавать сообщение об ошибке из validationMessage

      if (inputElement.validity.patternMismatch) {                                //Если регулярные выражения  возвращают true, не прошли провеку
        inputElement.setCustomValidity(inputElement.getAttribute('data-error'));  //создадть кастомное сообащение об ошибке
      } else {
        inputElement.setCustomValidity("");                                       //убрать кастомное сообащение об ошибке
      }
      this._showInputError(inputElement);                                         //Показать ошибку, передаем функции аргументы поле для ошибки и ошибку текущего инпута
    } else {
      this._hidenInputError(inputElement);
    }
  }

  resetValidation() {
   this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hidenInputError(inputElement);
    });

  }


  _toggleButtonState() {                                                                            //Дейстиве с кнопкой SUBMIT если формы не валидны

    if (this._hasInvalidInput()) {                                                                  //если финкция вернет true занчит в полях ввода есть ошибки нужно заблокировать кнопку
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._selectorList.inactiveButtonClass);
    } else {
      this._buttonElement.disabled = false;                                                          // иначе сделай кнопку активной
      this._buttonElement.classList.remove(this._selectorList.inactiveButtonClass);
    }

  }

  _hasInvalidInput() {                                                                              //Проверит инпуты в форме на валидность, функция принимает аргумент список инпутов ввиде массива
    return this._inputList.some((inputElement) => {                                                 //если все инпунты валидны, вернется true
       console.log(inputElement.validity)
      console.log('--------------------')
      return !inputElement.validity.valid;                                                          //возвращает свойство элемента valid
    });
  }

  _showInputError(inputElement) {                                                                   //Показать сообщение об ошибке

    this._fieldErrorMessange(inputElement).textContent = inputElement.validationMessage;
    inputElement.classList.add(this._selectorList.inputErrorClass);
    this._fieldErrorMessange(inputElement).classList.add(this._selectorList.errorClass);
  }

  _hidenInputError(inputElement) {                                                                  //Скрыть сообщение об ошибки
    this._fieldErrorMessange(inputElement).textContent = '';
    this._fieldErrorMessange(inputElement).classList.remove(this._selectorList.errorClass);
    inputElement.classList.remove(this._selectorList.inputErrorClass);
  }


  _fieldErrorMessange(inputElement) {
    return inputElement                                                           //Находит поле для вывода ошибки
      .closest(this._selectorList.formSelector)                                   //находит родителя инпута по классу
      .querySelector(`#${inputElement.id}-error`);                                //ищет в форме "поле для ошибки" по id используя шаблонные строки
  }

}