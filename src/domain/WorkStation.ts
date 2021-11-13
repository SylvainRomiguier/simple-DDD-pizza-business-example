import { Pizza } from "./Pizza";
import {
  HandlingStep,
  HandlingType,
  Name,
  PizzasList,
  Quantity,
  StepStatus,
  UniqueId,
} from "./ValueObjects";

export class WorkStation {
  _id?: UniqueId;
  _name: Name;
  _pizzasInList?: PizzasList;
  _pizzasOutList?: PizzasList;
  _currentHandledPizzaList: PizzasList;
  _maxConcurrentPizzaHandling: Quantity;
  _handlingType: HandlingType;

  constructor(
    name?: string,
    handlingType?: HandlingType,
    maxConcurrentPizzaHandling?: number,
    id?: string
  ) {
    this._id = new UniqueId(id);
    this._name = new Name(name);
    this._maxConcurrentPizzaHandling = new Quantity(maxConcurrentPizzaHandling);
    this._currentHandledPizzaList = new PizzasList(maxConcurrentPizzaHandling);
    this._handlingType = handlingType || "Preparation";
  }

  startWorking = (pizzasInList: PizzasList, pizzasOutList: PizzasList) => {
    this._pizzasInList = pizzasInList;
    this._pizzasOutList = pizzasOutList;
  };

  private handlePizza = (pizza: Pizza): StepStatus => {
    const steps = pizza._steps.get();
    if (steps[0].get().type !== this._handlingType)
      throw new Error(
        `Not the awaited handling type: ${
          steps[0].get().type
        } is different from ${this._handlingType}`
      );
    steps[0] = new HandlingStep(steps[0].get().type, steps[0].get().time - 1);
    if (steps[0].get().time === 0) {
      pizza._steps.unstack(1);
      return "Finished";
    }
    return "In Progress";
  };

  work = () => {
    // If station in not working at full capacity and there still pizzas needed to be handled then get them to full capacity
    const pizzasToGetToFullCapacity =
      this._maxConcurrentPizzaHandling.get() -
      this._currentHandledPizzaList.length();
    if (
      pizzasToGetToFullCapacity > 0 &&
      this._pizzasInList &&
      this._pizzasInList.length() > 0
    ) {
      this._pizzasInList
        .unstack(pizzasToGetToFullCapacity)
        .forEach((p) => this._currentHandledPizzaList.addItem(p));
    }

    // Handle all pizzas in current handled pizza list
    // if some are finished then remove them from current
    // and put them in the out list

    const finishedPizzas: Pizza[] = [];

    this._currentHandledPizzaList.get().forEach((p) => {
      const response = this.handlePizza(p);
      if (response === "Finished") {
        finishedPizzas.push(p);
      }
    });

    finishedPizzas.forEach((p) => {
      this._currentHandledPizzaList.removeItem(p);
      this._pizzasOutList?.addItem(p);
    });
  };
}
