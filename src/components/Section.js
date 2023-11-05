export default class Section {
  constructor({ renderer }, places) {

    this._renderer = renderer;
    this._container = places;

  }

  addItem(item) {
    this._container.prepend(item);                           //добавит карточку на страницу
  }

  renderer(infoCards) {
    infoCards.forEach((element) => {                          //обойдем массив карточек
      this.addItem(this._renderer(element));
    });
  }
}