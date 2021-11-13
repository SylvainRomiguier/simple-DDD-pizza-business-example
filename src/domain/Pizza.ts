import { Customer } from "./Customer";
import { PizzaRecipe } from "./PizzaRecipe";
import {
  HandlingStep,
  HandlingStepsList,
  Name,
  UniqueId,
} from "./ValueObjects";

export class Pizza {
  _id: UniqueId;
  _orderDateTime: Date;
  _customer: Customer;
  _pizzaName: Name;
  _steps: HandlingStepsList;
  constructor(customer: Customer, recipe: PizzaRecipe, id: string, date: Date) {
    this._id = new UniqueId(id);
    this._orderDateTime = date;
    this._customer = customer;
    this._pizzaName = new Name(recipe.getName());
    this._steps = new HandlingStepsList();
    recipe
      .getSteps()
      .get()
      .forEach((step) =>
        this._steps.addItem(new HandlingStep(step.get().type, step.get().time))
      );
  }

  isEqualTo = (pizza: Pizza) => pizza._id.isEqualTo(this._id);
}
