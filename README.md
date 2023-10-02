# Context API

## Author: Tricia Sawyer

### Project Overview

This project is divided into several phases, each aimed at enhancing the functionality and user experience of a Todo application while improving its production readiness.

### Phase 1

In Phase 1, I focus on refactoring an existing Todo application and modularizing it for production use. Key tasks include:

- Creating a detailed UML diagram.
- Modularizing the application into separate components with a proposed file structure.
- Implementing the Context API to provide basic application settings to components.
- Displaying three items by default.
- Hiding completed items by default.
- Adding the default sorting option 'difficulty.'
- Styling the application using the Mantine Component API.

### Phase 2

Phase 2 extends the application's functionality by allowing users to customize its behavior. This phase includes:

- Implementing the Context API to make application settings available to components.
- Allowing users to specify how many To Do items to display at once.
- Enabling users to choose whether or not to show completed items.
- Providing a settings form component accessible via the main navigation.
- Rendering updated settings on the right side of the form.
- Saving user preferences in Local Storage.
- Retrieving and applying user preferences from Local Storage during application startup.

### Phase 3

Phase 3 introduces user authentication and access control. New user stories include:

- Allowing users to create new accounts.
- Enabling user login functionality.
- Restricting access to To Do items for authenticated users only.
- Controlling item creation, updates, and deletions based on user type.
- Implementing role-based access control to determine user permissions.

### Phase 4

In Phase 4, this project is finalized by connecting to live servers for login, authorization, and data access. Key technical requirements include:

- Revising the Add, Toggle Complete, and Delete functions to use an Authenticated API server.
- Fetching the current item list from the database upon application start.
- Updating the state instantly when adding, updating, or deleting items.
- Considering synchronization strategies with the server.
- Altering the Login Context to use the server for user authentication.
- Storing authentication tokens in both state and cookies for future reference.

### Deployment

[CodeSandbox](https://56gqkc-3000.csb.app/)

### Links and Resources

[Mantine theming doc](https://mantine.dev/theming/colors/)

[Tabler icons](https://tabler.io/icons)

### Collaborators

- Special thanks to Ryan Gallaway for providing valuable feedback during code reviews.
- Utilized Chat GPT for assistance with test writing and debugging.

### UML Diagram

![UML Diagram](./assets/lab31-UML.png)

### Setup and Functionality

To experience the application, follow these steps:

1. Install project dependencies with `npm i`.
2. Start the application with `npm start`.
3. Run tests using `npm test`.

You can access the deployed application in your browser through the provided CodeSandbox deployment link. Log in using the following credentials:

User: `admin`

Pass: `ADMIN`

</br>

User: `editor`

Pass: `EDITOR`

</br>

User: `user`

Pass: `USER`
