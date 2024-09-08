# GameHub

GameHub is a comprehensive Angular application designed for gamers to manage their game libraries, connect with friends, and maintain user profiles. It serves as a centralized platform for gaming enthusiasts to organize their digital game collections, interact with other players, and keep track of their gaming activities.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Angular-Specific Features](#angular-specific-features)
4. [Project Structure](#project-structure)
5. [Technologies Used](#technologies-used)
6. [Setup and Installation](#setup-and-installation)
7. [Available Routes](#available-routes)
8. [Development](#development)
9. [Test User](#test-user)
10. [Contact](#contact)

## Project Overview

GameHub leverages modern web technologies to create a responsive and interactive user experience. Built with Angular and integrated with Firebase, it offers real-time data synchronization and secure authentication. The application's modular structure allows for easy maintenance and scalability.

Key aspects of the project include:

- **User-Centric Design**: Focused on providing an intuitive interface for managing games and social interactions.
- **Responsive Layout**: Utilizes Angular Material for a consistent and mobile-friendly design.
- **Secure Authentication**: Implements Firebase authentication to ensure user data protection.
- **Real-Time Updates**: Leverages Firebase's real-time database for instant updates across user interactions.
- **Modular Architecture**: Structured with reusable components and services for maintainability.

## Features

- User authentication and authorization
- Game library management
- Friends list and social networking
- User profiles with customization options
- Responsive design with Angular Material
- Real-time data synchronization
- Search and filter capabilities for games and friends

## Angular-Specific Features

GameHub leverages several Angular-specific features to create a robust and efficient application:

1. **Modular Architecture**: Utilizes Angular's module system for better organization and lazy-loading capabilities.

2. **Component-Based Structure**: Built with reusable components for improved maintainability and code reuse.

3. **Angular Router**: Implements client-side routing for a smooth, single-page application experience.

4. **Reactive Forms**: Uses Angular's Reactive Forms for complex form handling with real-time validation.

5. **Angular Material**: Integrates Angular Material for a consistent and responsive UI design.

6. **Services**: Employs Angular services for shared logic and data management across components.

7. **Dependency Injection**: Utilizes Angular's powerful dependency injection system for better testability and modularity.

8. **Guards**: Implements route guards (AuthGuard) for protecting routes and managing navigation based on user authentication.

9. **Observables**: Leverages RxJS observables for handling asynchronous operations and data streams.

10. **Angular Fire**: Integrates with Firebase using AngularFire for real-time database operations and authentication.

These Angular features contribute to a scalable, maintainable, and performant application architecture.

## Project Structure

The application is structured as follows:

- `components/`: Contains main view components
  - `login/`: User authentication
  - `games/`: Game management
  - `library/`: User's game library
  - `friends/`: Friends list management
  - `profile/`: User profile management
  - `page-not-found/`: 404 error page
- `shared/components/`: Reusable components
  - `navbar/`: Navigation bar
  - `cards/`: Card list component
  - `card/`: Individual card component
- `guards/`: Contains AuthGuard for route protection

## Technologies Used

- Angular 13.2.6
- Angular Material
- AngularFire (Firebase integration)
- Reactive Forms

## Setup and Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Set up your Firebase configuration in `src/environments/environment.ts`
4. Run `ng serve` for a dev server
5. Navigate to `http://localhost:4200/`

## Available Routes

- `/login`: User login page
- `/games`: Game management
- `/library`: User's game library
- `/friends`: Friends list
- `/profile`: User profile
- `/`: Redirects to login page
- `**`: Catches all other routes and displays a 404 page

All routes (except login and 404) are protected by AuthGuard.

## Development

- Run `ng generate component component-name` to generate a new component
- Run `ng build` to build the project
- Run `ng test` to execute unit tests via Karma
- Run `ng e2e` to execute end-to-end tests

## Test User

For testing purposes, you can use the following credentials until August 10, 2024:

- Email: test@gmail.com
- Password: 12345qwerty

**Note:** This is a test account valid until 10/8/2024. Do not use it for storing sensitive information. After this date, the account may be deactivated or its credentials may change.

## Contact

Ruslan Labza - [LinkedIn](https://www.linkedin.com/in/ruslanlabza)

Project Link: [https://github.com/RuslanLabza/angular-template-driven-form](https://github.com/RuslanLabza/angular-template-driven-form)
