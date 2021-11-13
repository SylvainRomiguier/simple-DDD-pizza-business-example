import {
  Name,
  UniqueId,
  IngredientsList,
  HandlingStepsList,
} from "./ValueObjects";

export class PizzaRecipe {
  _id: UniqueId;
  _name: Name;
  _ingredientsList: IngredientsList;
  _steps: HandlingStepsList;
  constructor(
    name?: string,
    steps?: HandlingStepsList,
    id?: string,
    ingredientsList?: IngredientsList
  ) {
    this._id = new UniqueId(id);
    this._name = new Name(name);
    this._steps = steps || new HandlingStepsList();
    this._ingredientsList = ingredientsList || new IngredientsList();
  }
  getName = () => this._name.get();
  getSteps = () => this._steps;
  setSteps = (steps: HandlingStepsList) => (this._steps = steps);
}
