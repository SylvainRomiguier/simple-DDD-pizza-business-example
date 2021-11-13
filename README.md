# Domain Driven Design : my pizza business example

This project intends to demonstrate how to model business logic behavior in DDD

## Business Rules

### main activity

We PREPARE PIZZAS following our CUSTOMERS ORDERS BY PHONE and make them available to DELIVER through an external delivery service AS FAST AS POSSIBLE.

### Process

AN ORDERED PIZZA by a CUSTOMER (with a NAME and a PHONE NUMBER) has a name and HANDLING STEPS such as PREPARATION and BAKING with TIME to achieve each of these HANDLING STEPS coming from a PIZZA RECIPE. We record the DATE/TIME of the CUSTOMER phone call ORDER.

We have some WORK STATIONS such as PREPARATION STATIONS and BAKING STATIONS. Each STATION is responsible of one HANDLING STEP and can HANDLE one or more PIZZAS at the same time. For example ou oven can bake 2 pizzas at the same time but a preparation station can only handle one pizza at a time.

When a PIZZA ORDER is received it is put in the ORDERED PIZZAS LIST.
Then the PREPARATION STATIONS persons, if they are not already working on a pizza, get an ORDERED PIZZA from the LIST and begin PREPARATION STEP.
When the PREPARATION STEP is over, the PIZZA is put on a table WAITING FOR BAKING.

The BAKING STATION person get PIZZAS READY TO BE BAKED from the table and BAKE them in the OVEN, 2 at a time.
As soon as a pizza is baked it is put on a stack READY TO BE DELIVERED.

Of course, the STATIONS persons always GET THE MOST OLD PIZZAS in order to DELIVER THE PIZZAS AS FAST AS POSSIBLE.

#### Next step

In the future we want to MANAGE OUR INGREDIENTS STOCKS. Each PIZZA RECIPE has an INGREDIENTS LIST with NAME and QUANTITY.
Each INGREDIENT has a QUANTITY IN STOCK which should be DECREASED EACH TIME WE PREPARE PIZZAS.

## Domain

### Entities (domain objects which are unique and should be traced through their uniqueness)

- Customer
- Pizza
- Pizza Recipe
- Work Station
- Ingredient (in the future)

### Value Objects (domain objects which are not unique and would be useful only by their value)

#### Value Object

- Name
- Unique Id
- Phone Number
- Quantity
- Picture URL
- Unit (for Ingredient)
- {Ingredient, Quantity} tuple
- Handling Step

  #### Value Object List

- Pizzas List
- Handling Steps List
- {Ingredient, Quantity} List

### Use cases

Here the use cases are included in their respective entities, mainly WorkStation.

## Demo

I have created a render loop with ticks (you will find the tick duration in globals.ts it is called DELTA_TIME, you can change it to accelarate our decelerate the simulation) as it is commonly done in video games but this time using ReactJS.

so `yarn install` to install modules the first time and then `yarn start` to start the project.

Click on _START_ button, some pizzas orders will be randomly created and you will see the automated process running.

You can click click on _STOP_ to pause the simulation.
