import { Ingredient } from "./Ingredient";
import { Pizza } from "./Pizza";

interface ValueObject<T> {
  _value: T;
  isEqualTo: (object: ValueObject<T>) => boolean;
  get: () => T;
}

export class Name implements ValueObject<string> {
  _value: string = "Name";
  constructor(name?: string) {
    if (!name || !name.match(/^(?=.*[A-Za-z])[A-Za-z\d ]{3,}$/))
      throw new Error(
        "Name should contain at least one letter and 3 characters."
      );
    this._value = name;
  }
  isEqualTo = (object: Name) => object.get() === this._value;
  get = () => this._value;
}

export class Quantity implements ValueObject<number> {
  _value: number = 0;
  constructor(quantity?: number) {
    if (quantity === undefined || quantity === null || quantity < 0)
      throw new Error("Quantity should not be less than zero.");
    this._value = quantity;
  }
  isEqualTo = (object: Quantity) => object.get() === this._value;
  get = () => this._value;
}

export class PictureURL implements ValueObject<string> {
  _value: string = "http://localhost:8080/assets/no-picture.jpg";
  constructor(pictureURL?: string) {
    if (pictureURL && !pictureURL.match(/^(https?:\/\/.*\.(?:png|jpg))$/))
      throw new Error("the picture URL is not valid.");
    if (pictureURL) this._value = pictureURL;
  }
  isEqualTo = (object: PictureURL) => object.get() === this._value;
  get = () => this._value;
}

export class UniqueId implements ValueObject<string | undefined> {
  _value: string | undefined;
  constructor(uniqueId?: string) {
    if (
      uniqueId &&
      !uniqueId.match(
        /^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$/
      )
    )
      throw new Error("Invalid GUID.");
    this._value = uniqueId;
  }
  isEqualTo = (object: UniqueId) => object.get() === this._value;
  get = () => this._value;
}

export class Unit implements ValueObject<string> {
  _value: string = "ml";
  constructor(unit?: string) {
    if (!unit || (unit !== "ml" && unit !== "g"))
      throw new Error("Unit should be ml or g.");
    this._value = unit;
  }
  isEqualTo = (object: Unit) => object.get() === this._value;
  get = () => this._value;
}

export class IngredientQuantity
  implements
    ValueObject<{ ingredient: Ingredient; quantity: Quantity } | undefined>
{
  _value: { ingredient: Ingredient; quantity: Quantity } | undefined;
  isEqualTo = (object: IngredientQuantity) =>
    JSON.stringify(object.get()) === JSON.stringify(this._value);
  get = () => this._value;
}

interface ValueObjectList<T> {
  _value: T[];
  _maxLength: number;
  isEqualTo: (object: ValueObjectList<T>) => boolean;
  get: () => T[];
  length: () => number;
  addItem: (item: T) => void;
  removeItem: (item: T) => void;
  unstack: (count: number) => T[];
}

export class PizzasList implements ValueObjectList<Pizza> {
  _value: Pizza[] = [];
  _maxLength: number;
  constructor(maxLength: number = 1000) {
    this._value = [] as Pizza[];
    this._maxLength = maxLength;
  }
  isEqualTo = (object: PizzasList) => {
    if (JSON.stringify(object.get()) === JSON.stringify(this.get()))
      return true;
    return false;
  };
  get = () => this._value;
  length = () => this._value.length;
  addItem = (pizza: Pizza) => {
    if (this._value.length === this._maxLength)
      throw new Error(
        `This could not contain more than ${this._maxLength} elements`
      );
    if (!this._value.find((i) => i.isEqualTo(pizza))) this._value.push(pizza);
  };
  removeItem = (pizza: Pizza) => {
    this._value = this._value.filter((i) => !i.isEqualTo(pizza));
  };
  unstack = (count: number) => {
    const subsetToUnstack = [];
    let _count = count;
    while (this.length() > 0 && _count > 0) {
      const first = this._value[0];
      subsetToUnstack.push(first);
      this.removeItem(first);
      _count--;
    }
    return subsetToUnstack;
  };
}

export class IngredientsList implements ValueObjectList<IngredientQuantity> {
  _value: IngredientQuantity[] = [];
  _maxLength: number = 40;
  constructor() {
    this._value = [] as IngredientQuantity[];
  }
  isEqualTo = (object: IngredientsList) => {
    if (JSON.stringify(object.get()) === JSON.stringify(this.get()))
      return true;
    return false;
  };
  get = () => this._value;
  length = () => this._value.length;
  addItem = (ingredientQuantity: IngredientQuantity) => {
    if (this._value.length === this._maxLength)
      throw new Error(
        `This could not contain more than ${this._maxLength} elements`
      );
    if (!this._value.find((i) => i.isEqualTo(ingredientQuantity)))
      this._value.push(ingredientQuantity);
  };
  removeItem = (ingredientQuantity: IngredientQuantity) => {
    this._value = this._value.filter((i) => !i.isEqualTo(ingredientQuantity));
  };
  unstack = (count: number) => {
    const subsetToUnstack = [];
    let _count = count;
    while (this.length() > 0 && _count > 0) {
      const first = this._value[0];
      this.removeItem(first);
      subsetToUnstack.push(first);
      _count--;
    }
    return subsetToUnstack;
  };
}

export class PhoneNumber implements ValueObject<string | undefined> {
  _value: string | undefined;
  constructor(phoneNumber?: string) {
    if (
      phoneNumber &&
      !phoneNumber.match(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/)
    )
      throw new Error("Invalid phone number.");
    this._value = phoneNumber;
  }
  isEqualTo = (object: PhoneNumber) => object.get() === this._value;
  get = () => this._value;
}

export type HandlingType = "Preparation" | "Baking";
export class HandlingStep
  implements ValueObject<{ type: HandlingType; time: number }>
{
  _value: { type: HandlingType; time: number };

  constructor(type: HandlingType, time: number) {
    if (time < 0) throw new Error("Time of handling can not be less than 0");
    this._value = {
      type,
      time,
    };
  }

  isEqualTo = (object: ValueObject<{ type: HandlingType; time: number }>) =>
    JSON.stringify(object.get()) === JSON.stringify(this._value);
  get = () => this._value;
}

export class HandlingStepsList implements ValueObjectList<HandlingStep> {
  _value: HandlingStep[];
  _maxLength: number;
  constructor() {
    this._value = [] as HandlingStep[];
    this._maxLength = 40;
  }
  isEqualTo = (object: ValueObjectList<HandlingStep>) =>
    JSON.stringify({ value: this._value, maxLength: this._maxLength }) ===
    JSON.stringify({ value: object.get(), maxLength: object._maxLength });
  get = () => this._value;
  length = () => this._value.length;
  addItem = (item: HandlingStep) => {
    if (this.length() === this._maxLength)
      throw new Error(
        `This could not contain more than ${this._maxLength} elements`
      );
    if (!this._value.find((i) => i.isEqualTo(item))) this._value.push(item);
  };
  removeItem = (item: HandlingStep) => {
    this._value = this._value.filter((i) => !i.isEqualTo(item));
  };
  unstack = (count: number) => {
    const subsetToUnstack = [];
    let _count = count;
    while (this.length() > 0 && _count > 0) {
      const first = this._value[0];
      subsetToUnstack.push(first);
      this.removeItem(first);
      _count--;
    }
    return subsetToUnstack;
  };
}

export type StepStatus = "Finished" | "In Progress";
