export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._header = config.headers;
  }

  //===========================================================================================
  getUserProfile = () => {                                        //получение информации о профиле от сервера
    return fetch(`${this._baseUrl}/users/me`, {                                 //вернуть результат запроса
      headers: this._header
    })
      .then((response) => {                                        //получили информацию от сервера
        return this._checkAnswer(response);                              //проверка запроса
      })
  }
  //===========================================================================================
  sendUserProfile = (object) => {          //Отправка информации на сервере из профиля
    return fetch(`${this._baseUrl}/users/me`, {                                 //вернуть результат запроса
      method: 'PATCH',
      headers: this._header,
      body: JSON.stringify({
        name: object['popup__input-name'],
        about: object['popup__input-about']
      })
    })
      .then((response) => {                                         //получили обвет об отправке
        return this._checkAnswer(response);                         //проверим его
      })
  }
  //===========================================================================================
  getCardsSRV = () => {                                             //получение информации о карточке от сервера
    return fetch(`${this._baseUrl}/cards`, {                                  //вернуть результат запроса
      headers: this._header
    })
      .then((response) => {                                         //получили информацию от сервера
        return this._checkAnswer(response);                         //проверка запроса
      })
  }

  sendCardsSRV = (object) => {                         //Отправка карточки на сервер
    return fetch(`${this._baseUrl}/cards`, {                                   //вернуть результат запроса
      method: 'POST',
      headers: this._header,
      body: JSON.stringify({
        name: object['popup__input-name'],
        link: object['popup__input-link'],
      })
    })
      .then((response) => {                                           //получили ответ об отправке
        return this._checkAnswer(response);                           //проверка
      })
  }
  //===========================================================================================
  deleteCardsSRV = (idCard) => {                                      //Удаление карточки с сервера
    return fetch(`${this._baseUrl}/cards/${idCard}`, {
      method: 'DELETE',
      headers: this._header
    })
      .then((response) => {                                           //получили информацию от сервера
        return this._checkAnswer(response);                           //проверка запроса
      })
  }
  //===========================================================================================
  sendlikeSRV = (idCard) => {                                         //отправка лайка на сервер
    return fetch(`${this._baseUrl}/cards/likes/${idCard}`, {
      method: 'PUT',
      headers: this._header
    })
      .then((response) => {                                           //получили ответ об отправке
        return this._checkAnswer(response);                           //проверка
      })
  }
  //===========================================================================================
  deletelikeSRV = (idCard) => {                                       //удаление лайка с сервера
    return fetch(`${this._baseUrl}/cards/likes/${idCard}`, {
      method: 'DELETE',
      headers: this._header
    })
      .then((response) => {                                          //получили ответ об отправке
        return this._checkAnswer(response);                          //проверка
      })
  }
  //===========================================================================================
  sendAvatar = (object) => {                                           //отправка запроса на обновления аватарки
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._header,
      body: JSON.stringify({
        avatar: object['popup__input-link']
      })
    })
      .then((response) => {                                           //получили ответ об отправке
        return this._checkAnswer(response);                           //проверка
      })
  }
  //===========================================================================================
  _checkAnswer = (response) => {                                     //проверка ответа

    if (!response.ok) {                                              //если статус true тогда
      return response.json()
        .then(err => {
          Promise.reject(`Ошибка: ${err.message}. Код ошибки: ${response.status}`)
        })
    } else return response.json();                                   //распарсим и вернем объект
  }
}