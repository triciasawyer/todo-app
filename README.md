# Lab 31

## Project: Context API

### Author: Tricia Sawyer

### Problem Domain

In Phase 1, we’re going to perform some refactoring of a Todo application built by another team. This application mixes application state and user settings at the top level and passes things around. It was a good proof of concept, but we need to make this production ready.

Create a Detailed UML.
Properly modularize the application into separate components, note the proposed file structure below.
Implement the Context API to make some basic application settings available to components.
Show three items by default.
Hide completed items by default.
Add the sort word ‘difficulty’ by default.
Style the application using the Mantine Component API{target:_blank}.
NOTE: The expectation to style this entire component in one day is likely unrealistic. The recommendation is to implement the required functionality, then systematically begin styling with Mantine. Match the comp image(s) as closely as possible. 80% of the design work will likely take 20% of your time. By the end of the week, being mostly there with style is the goal!

## Links and Resources

[Code sandbox deployment](https://37pthk-3000.csb.app/)

### Collaborators

Ryan Gallaway in code review

## UML

![UML](./assets/lab31-UML.png)

### Set up

In the project directory, you can run:

### `npm i to install dependencies`

npm i uuid sass

### `npm start`

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.
