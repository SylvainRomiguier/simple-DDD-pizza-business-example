import { Pizza } from "../../domain/Pizza";

const formatTime = (time: number): string => {
  const minutes = Math.trunc(time / 60);
  const secondsLeft = time - minutes * 60;
  return `${minutes}:${secondsLeft}`;
};

export const PizzaUI: React.FC<{ pizza: Pizza }> = ({ pizza }) => {
  return (
    <div
      style={{
        margin: "5px",
        padding: "5px",
        border: "1px solid black",
        borderRadius: "10px",
      }}
    >
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
    </div>
  );
};
