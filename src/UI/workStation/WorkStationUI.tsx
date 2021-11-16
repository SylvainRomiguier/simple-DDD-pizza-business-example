import { Container } from "@chakra-ui/layout";
import { WorkStation } from "../../domain/WorkStation";
import { PizzaUI } from "../pizza/PizzaUI";

export const WorkStationUI: React.FC<{
  workStation: WorkStation;
}> = ({ workStation }) => {
  return (
    <Container maxW="lg" borderWidth="2px" borderRadius="lg" centerContent>
      {workStation._name.get()}&nbsp;:&nbsp;
      {workStation._handlingType}
      {workStation._currentHandledPizzaList.length() > 0 &&
        workStation._currentHandledPizzaList
          .get()
          .map((p) => <PizzaUI key={p._id.get()} pizza={p} />)}
    </Container>
  );
};
