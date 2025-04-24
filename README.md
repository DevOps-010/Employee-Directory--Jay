# Employee Directory Application

A full-stack application for managing employee data using React, Node.js, Express, and MySQL.

## Features

- View a list of all employees in a table format
- Add new employees to the directory
- Edit existing employee information
- Delete employees from the directory
- Search/filter employees by name, email, position, or department

## Tech Stack

- **Frontend**: React.js with Bootstrap for styling
- **Backend**: Node.js with Express
- **Database**: MySQL
- **ORM**: Sequelize
- **Containerization**: Docker & Docker Compose

## Project Structure

```
employee-directory/
├── client/                  # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── EmployeeList.js
│   │   │   ├── EmployeeForm.js
│   │   │   └── SearchBar.js
│   │   ├── App.js          # Main application component
│   │   └── index.js        # Entry point
│   └── Dockerfile          # Frontend containerization
├── server/                  # Node.js backend
│   ├── config/             # Configuration files
│   ├── controllers/        # Request handlers
│   ├── models/             # Sequelize models
│   ├── routes/             # API routes
│   └── Dockerfile          # Backend containerization
├── docker-compose.yml      # Multi-service configuration
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites

- Docker and Docker Compose installed on your machine

### Running the Application

1. Clone the repository:
   ```bash
   git clone <https://github.com/DevOps-010/Employee-Directory--Jay>
   cd employee-directory
   ```

2. Start the application using Docker Compose:
   ```bash
   docker-compose up
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api/employees

### Stopping the Application

```bash
docker-compose down
```
