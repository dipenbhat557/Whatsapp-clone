# WhatsApp Clone

WhatsApp Clone is a web-based chat application inspired by WhatsApp. This project includes both the frontend, built with React, and the backend, built with Spring Boot.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

- Real-time chat functionality.
- User authentication and registration.
- Group chat creation.
- Sending text messages and attachments.
- User profile management.
- Message timestamps and read receipts.

## Technologies Used

- Frontend:

  - React
  - Redux for state management
  - Material-UI for UI components
  - WebSocket for real-time messaging
  - Tailwind CSS

- Backend:
  - Spring Boot
  - Spring Security for authentication
  - Spring Data JPA for data persistence
  - WebSocket for real-time messaging
  - MySQL for database storage

## Getting Started

Follow these instructions to set up and run the WhatsApp Clone on your local machine.

### Prerequisites

- Node.js and npm - [Download and Install Node.js](https://nodejs.org/)
- Java Development Kit (JDK) - [Download and Install JDK](https://adoptopenjdk.net/)

### Installation

1. Clone the repository:

   git clone git@github.com:dipenbhat557/Whatsapp-clone.git

2. Navigate to the frontend directory:

cd whatsapp-clone/frontend

3. Install frontend dependencies:

npm install

4. Navigate to the backend directory:

cd ../backend

5. Open the application.properties file and configure your database settings and JWT secret:

spring.datasource.url=jdbc:mysql://localhost:3306/whatsapp
spring.datasource.username=root
spring.datasource.password=password
...
jwt.secret=your-secret-key

6. Build and run the backend:

./mvnw spring-boot:run

7. Now, navigate back to the frontend directory:

cd ../frontend

8. Start the React development server:

npm start

9. The WhatsApp Clone should now be running. Access it in your web browser at http://localhost:3000.

**Usage**

1. Register a new account or log in with an existing one.
2. Create or join group chats.
3. Start sending and receiving messages in real-time.
4. Manage your user profile and settings.

**Contributing**
I welcome contributions from the community! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: git checkout -b feature/my-feature or git checkout -b bugfix/my-bugfix.
3. Commit your changes and push them to your fork: git commit -m "Add a new feature" and git push origin feature/my-feature.
4. Create a pull request to the main branch of the original repository.
