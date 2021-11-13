import { Name, PictureURL, Quantity, UniqueId, Unit } from "./ValueObjects";

export class Ingredient {
  _id: UniqueId;
  _name: Name;
  _pictureURL: PictureURL;
  _stock: Quantity;
  _unit: Unit;
  constructor(
    name?: string,
    stock?: number,
    unit?: string,
    pictureURL?: string,
    uniqueId?: string
  ) {
    this._id = new UniqueId(uniqueId);
    this._name = new Name(name);
    this._pictureURL = new PictureURL(pictureURL);
    this._stock = new Quantity(stock);
    this._unit = new Unit(unit);
  }

  addQuantity = (quantity: number) =>
    (this._stock = new Quantity(this._stock.get() + quantity));
  removeQuantity = (quantity: number) =>
    (this._stock = new Quantity(this._stock.get() - quantity));

  get = () =>
    Object.freeze({
      uniqueId: this._id.get(),
      name: this._name.get(),
      pictureURL: this._pictureURL.get(),
      quantity: this._stock.get(),
      unit: this._unit.get(),
    });
}
