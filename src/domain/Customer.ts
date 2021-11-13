import { Name, PhoneNumber, UniqueId } from "./ValueObjects";

export class Customer {
  _id: UniqueId;
  _name: Name;
  _phoneNumber: PhoneNumber;
  constructor(name?: string, phoneNumber?: string, id?: string) {
    this._id = new UniqueId(id);
    this._name = new Name(name);
    this._phoneNumber = new PhoneNumber(phoneNumber);
  }
}
