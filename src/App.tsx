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
import { Button } from "@chakra-ui/react";
import { ButtonsBar } from "./UI/templates/ButtonsBar";
import { WorkStations } from "./UI/templates/WorkStations";
import { WaitingLists } from "./UI/templates/WaitingLists";
import { CustomSlider } from "./UI/slider/CustomSlider";
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
  switch (randomIntFromInterval(1, 20)) {
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
  const [render, setRender] = useState<{ status: LoopStatus; count: number, statusChangeOrigin: "Start" | "Button" | "TimeTickChange", deltaTime: number }>({
    status: "Idle",
    count: 0,
    statusChangeOrigin: "Start",
    deltaTime: DELTA_TIME
  });

  useEffect(() => {
    if (render.status === "Idle") return;
    if (render.status === "Start") {
      start();
      setRender((prev) => ({...prev, status: "Running", count: 1 }));
      return;
    }
    if (render.status === "Running") {
      limitedInterval = setInterval(() => {
        generateRandomOrder();
        workStations.forEach((p) => p.work());
        setRender((prev) => ({ ...prev, count: prev.count + 1 }));
      }, render.deltaTime);
    }

    if (render.status === "Stop") {
      clearInterval(limitedInterval);
      if(render.statusChangeOrigin === "TimeTickChange") setRender((prev) => ({...prev, status: "Start", statusChangeOrigin: "Start"}))
    }

    return () => {
      clearInterval(limitedInterval);
    };
  }, [render.status, render.statusChangeOrigin, render.deltaTime]);

  const onTimeTickChange = (value:number) => {
    setRender({ ...render, status: "Stop",statusChangeOrigin: "TimeTickChange", deltaTime: value });
  }

  return (
    <div className="App">
      <CustomSlider
        label={`Tick : 1s = ${render.deltaTime}ms`}
        minValue={100}
        maxValue={5000}
        step={100}
        value={render.deltaTime}
        onChange={onTimeTickChange}
      />
      <ButtonsBar>
        <Button onClick={() => setRender({ ...render, status: "Start", statusChangeOrigin: "Button" })}>
          START
        </Button>
        <Button onClick={() => setRender({ ...render, status: "Stop", statusChangeOrigin: "Button" })}>
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
