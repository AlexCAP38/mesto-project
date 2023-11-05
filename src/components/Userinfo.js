export default class UserInfo {
  constructor({ titleSelector, subtitleSelector, avatarSelector }) {
    this._title = document.querySelector(titleSelector);
    this._subtitle = document.querySelector(subtitleSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {

    return {
      name: this._title.textContent,
      about: this._subtitle.textContent,
      avatar: this._avatar.src,
      id: this._avatar.getAttribute('id')
    }
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._title.textContent = name;                                       //присваивает элементам на страницы значение из ответа сервера
    this._subtitle.textContent = about;
    this._avatar.src = avatar;
    this._avatar.id = _id;
  }
}