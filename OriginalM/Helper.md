# Medical Project

This project is a web-based application aimed at managing medical records and appointments. It provides functionalities for both patients and healthcare providers to interact efficiently.

## Features

- **Patient Management**: Register patients, view their medical history, and schedule appointments.
- **User Authentication**: Secure login and authentication system for patients and healthcare providers.
- **Admin Dashboard**: Admin panel to manage users, appointments, and system settings.

## Technologies Used

### Frontend

- **Framework**: [React](https://reactjs.org/)
- **UI Library**: [Material-UI](https://bootstrap.com/)
- **Routing**: [React Router](https://reactrouter.com/)

### Backend

- **Framework**: [Node.js](https://nodejs.org/)
- **Web Framework**: [Express.js](https://expressjs.com/)
- **Database**: [Mysql](https://www.mysqlworkbench.com/)
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/)
- 
## Installation

### Prerequisites

- Node.js
- MongoDB

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/.git


2. Install dependencies for both frontend and backend:

cd medical/frontend
npm install

cd medical/backend
npm install

3. Migrate the table - I am using healthcare database

npx sequelize-cli db:migrate

4. # Start the backend server
cd backend
npm start

# Start the frontend server
cd ../frontend
npm start
