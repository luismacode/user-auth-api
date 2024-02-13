# User Authentication API

## Summary

The development will consist of a user authentication system.
The objective of this system is to make a REST API that serves as an interface to authenticate a user.
The system data will persist for their continuous use.

## Project Stages

- The initial prototype will meet the minimum required functionality.
- The extension of the initial prototype with new use cases.

Once the initial prototype is validated, it is planned to add progressive improvements to this development.

## Definition Entities

- User: User created in the system, all fields are mandatory.
  - id: Must comply with UUID format.
  - firstname: Length must be between 4 and 30 characters.
  - lastname: Length must be between 5 and 50 characters.
  - username:
    - Length must be between 8 and 30 characters.
    - Must be unique within the app.
  - photo:
    - Must comply with the URL address format.
    - The URL should point to the correct location of the image.
  - email:
    - Must comply with [RFC 5322](https://www.ietf.org/rfc/rfc5322.txt).
    - Must be unique.
  - password:
    - Length must be at least 16 characters.
    - Must include numbers or symbols.
    - Must include uppercase and lowercase characters.
    - Must not start with numbers or symbols.
    - Must not use the same character more than once.
    - Must not use sequential characters, e.g. abc, 789.
    - Must not use Similar characters like l, L, o, O.

## functional requirements

- The system must validate the username (or email) and password against a database of authorized users.
- The system must generate and send a token (or cookie) to the user that contains information about the user's identity.
- The system must allow the user to access the resources they request, as long as they are authenticated or authorized, otherwise reject access.
- The system must allow the user to log out.
- The system must implement a RESTful API that exposes the endpoints necessary for user authentication and authorization.
- The system must integrate with other services or systems that require user authentication, such as the frontend

## Non-functional requirements

- The application must be able to run with the LTS version of Node.JS(20+).
- The application must be made using Typescript version 5+.
- The application must be develop using Express 4+.
- The application persists data in cloud mongoDB.
- Clean architecture must be implemented.
