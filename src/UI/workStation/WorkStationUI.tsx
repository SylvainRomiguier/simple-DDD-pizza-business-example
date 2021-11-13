import { WorkStation } from "../../domain/WorkStation";
import { PizzaUI } from "../pizza/PizzaUI";

export const WorkStationUI: React.FC<{
  workStation: WorkStation;
}> = ({ workStation }) => {
  return (
    <div
      style={{
        padding: "5px",
        border: "2px solid blue",
        borderRadius: "10px",
        height: "250px",
        minWidth: "350px",
      }}
    >
      {workStation._name.get()}&nbsp;:&nbsp;
      {workStation._handlingType}
      {workStation._currentHandledPizzaList.length() > 0 &&
        workStation._currentHandledPizzaList
          .get()
          .map((p) => <PizzaUI key={p._id.get()} pizza={p} />)}
    </div>
  );
};
