# Lab 31-32

## Project: Context API

### Author: Tricia Sawyer

### Problem Domain

- Lab 31 features

In Phase 1, we’re going to perform some refactoring of a Todo application built by another team. This application mixes application state and user settings at the top level and passes things around. It was a good proof of concept, but we need to make this production ready.

Create a Detailed UML.
Properly modularize the application into separate components, note the proposed file structure below.
Implement the Context API to make some basic application settings available to components.
Show three items by default.
Hide completed items by default.
Add the sort word ‘difficulty’ by default.
Style the application using the Mantine Component API {target:_blank}.
NOTE: The expectation to style this entire component in one day is likely unrealistic. The recommendation is to implement the required functionality, then systematically begin styling with Mantine. Match the comp image(s) as closely as possible. 80% of the design work will likely take 20% of your time. By the end of the week, being mostly there with style is the goal!

- Lab 32 features

In Phase 2, we’re going to extend the functionality of our application by allowing the user to make some decisions on how they would like the application to function. Specifically, we’ll let them make changes to 2 settings.

Implement the Context API to make some basic application settings available to components.
How many To Do Items to show at once.
Whether or not to show completed items.
Hint: if reusing the custom useForm() hook, event validation may be necessary if using any Mantine component other </br>
than "< TextInput />".

Provide the users with a form where they can change the values for those settings.
This should be given in the form of a new component, perhaps linked to from the main navigation.
Hint: Use Browser Router to create the page/route/component for this.
Once settings are updated, render the updated settings to the right of the “form”. Consider using "< Grid />", "< Card />", and "< When />" components.
Save the users choices in Local Storage.
Retrieve their preferences from Local Storage and apply them to the application on startup.

### Links and Resources

[Code sandbox deployment](https://37pthk-3000.csb.app/)

[Code sandbox deployment - branch for lab 32](https://3zlv3x-3000.csb.app/)

[Mantine theming doc](https://mantine.dev/theming/colors/)

[Tabler icons](https://tabler.io/icons)

### Collaborators

Ryan Gallaway in code review

### UML

![UML](./assets/lab31-UML.png)

### Set up

In the project directory, you can run:

#### `npm i to install dependencies`

npm i uuid sass

#### `npm start`

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.
