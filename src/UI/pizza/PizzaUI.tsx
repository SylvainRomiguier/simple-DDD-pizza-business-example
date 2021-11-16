import { Container } from "@chakra-ui/react";
import { Pizza } from "../../domain/Pizza";

const formatTime = (time: number): string => {
  const minutes = Math.trunc(time / 60);
  const secondsLeft = time - minutes * 60;
  return `${minutes}mn${secondsLeft}s`;
};

export const PizzaUI: React.FC<{ pizza: Pizza }> = ({ pizza }) => {
  return (
    <Container maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" m="10px">
      <div>Customer : {pizza._customer._name.get()}</div>
      <div>{pizza._id.get()}</div>
      <div style={{ color: "green" }}>
        {pizza._orderDateTime.toLocaleDateString("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        })}
      </div>
      <div>Pizza {pizza._pizzaName.get()}</div>
      <div>
        {pizza._steps.get().map((step) => (
          <div key={step.get().type}>
            {step.get().type}&nbsp;{formatTime(step.get().time)}
          </div>
        ))}
      </div>
    </Container>
  );
};
