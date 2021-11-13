import { PizzasList } from "../../domain/ValueObjects";
import { PizzaUI } from "../pizza/PizzaUI";

export const WaitingList: React.FC<{ title: string; pizzasList: PizzasList }> =
  ({ title, pizzasList }) => {
    return (
      <div
        style={{ display: "flex", flexDirection: "column", minWidth: "350px" }}
      >
        <div>
          {title} ({pizzasList.length()})
        </div>
        {pizzasList.get().map((p) => (
          <PizzaUI key={p._id.get()} pizza={p} />
        ))}
      </div>
    );
  };
