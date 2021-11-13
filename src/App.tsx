import { useEffect, useState } from "react";
import "./App.css";
import { v4 as uuid } from "uuid";
import { Customer } from "./domain/Customer";
import { Pizza } from "./domain/Pizza";
import { PizzaRecipe } from "./domain/PizzaRecipe";
import { WorkStation } from "./domain/WorkStation";
import {
  HandlingStep,
  HandlingStepsList,
  PizzasList,
} from "./domain/ValueObjects";
import { DELTA_TIME } from "./globals/globals";
import { WorkStationUI } from "./UI/workStation/WorkStationUI";
import { WaitingList } from "./UI/waitingList/WaitingList";
import { Button } from "./UI/button/Button";
import { ButtonsBar } from "./UI/templates/ButtonsBar";
import { WorkStations } from "./UI/templates/WorkStations";
import { WaitingLists } from "./UI/templates/WaitingLists";
const pizzaReineHandlingSteps = new HandlingStepsList();
pizzaReineHandlingSteps.addItem(new HandlingStep("Preparation", 5 * 60)); // time in seconds
pizzaReineHandlingSteps.addItem(new HandlingStep("Baking", 10 * 60));
const pizzaReine = new PizzaRecipe("Reine", pizzaReineHandlingSteps, uuid());

const pizzaMargaritaHandlingSteps = new HandlingStepsList();
pizzaMargaritaHandlingSteps.addItem(new HandlingStep("Preparation", 6 * 60));
pizzaMargaritaHandlingSteps.addItem(new HandlingStep("Baking", 10 * 60));
const pizzaMargarita = new PizzaRecipe(
  "Margarita",
  pizzaMargaritaHandlingSteps,
  uuid()
);
const customer1 = new Customer("Sylvain", "0624431306", uuid());
const customer2 = new Customer("Sandrine", "0615082941", uuid());
const customer3 = new Customer("Manon", "0615083728", uuid());
const pizzasOrdered = new PizzasList();
const pizzasPrepared = new PizzasList();
const pizzasBaked = new PizzasList();
const workStations: WorkStation[] = [];
workStations.push(new WorkStation("Sergio", "Preparation", 1, uuid()));
workStations.push(new WorkStation("Paulo", "Preparation", 1, uuid()));
workStations.push(new WorkStation("Gianni", "Baking", 2, uuid()));

const start = () => {
  workStations[0].startWorking(pizzasOrdered, pizzasPrepared);
  workStations[1].startWorking(pizzasOrdered, pizzasPrepared);
  workStations[2].startWorking(pizzasPrepared, pizzasBaked);
};

type LoopStatus = "Idle" | "Start" | "Running" | "Stop";
let limitedInterval: NodeJS.Timeout;

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const getRandomCustomer = () => {
  switch (randomIntFromInterval(1, 3)) {
    case 1:
      return customer1;
    case 2:
      return customer2;
    case 3:
      return customer3;
    default:
      return customer1;
  }
};

const getRandomPizza = () => {
  switch (randomIntFromInterval(1, 2)) {
    case 1:
      return pizzaMargarita;
    case 2:
      return pizzaReine;
    default:
      return pizzaMargarita;
  }
};

const generateRandomOrder = () => {
  switch (randomIntFromInterval(1, 5)) {
    case 1:
      pizzasOrdered.addItem(
        new Pizza(getRandomCustomer(), getRandomPizza(), uuid(), new Date())
      );
      break;
    default:
      return;
  }
};

function App() {
  const [render, setRender] = useState<{ status: LoopStatus; count: number }>({
    status: "Idle",
    count: 0,
  });

  useEffect(() => {
    if (render.status === "Idle") return;
    if (render.status === "Start") {
      start();
      setRender({ status: "Running", count: 1 });
      return;
    }
    if (render.status === "Running") {
      limitedInterval = setInterval(() => {
        generateRandomOrder();
        workStations.forEach((p) => p.work());
        setRender((prev) => ({ ...prev, count: prev.count + 1 }));
      }, DELTA_TIME);
    }

    if (render.status === "Stop") {
      clearInterval(limitedInterval);
    }

    return () => {
      clearInterval(limitedInterval);
    };
  }, [render.status]);

  return (
    <div className="App">
      <ButtonsBar>
        <Button onClick={() => setRender({ ...render, status: "Start" })}>
          START
        </Button>
        <Button onClick={() => setRender({ ...render, status: "Stop" })}>
          STOP
        </Button>
      </ButtonsBar>
      <WorkStations>
        <WorkStationUI workStation={workStations[0]} />
        <WorkStationUI workStation={workStations[1]} />
        <WorkStationUI workStation={workStations[2]} />
      </WorkStations>
      <WaitingLists>
        <WaitingList title="Waiting Orders" pizzasList={pizzasOrdered} />
        <WaitingList title="Waiting for baking" pizzasList={pizzasPrepared} />
        <WaitingList title="Ready to deliver" pizzasList={pizzasBaked} />
      </WaitingLists>
    </div>
  );
}

export default App;
