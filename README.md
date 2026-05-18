# Warehouse Stock Management System

A full-stack web application for managing warehouse inventory, 
built as a Bachelor's thesis project.

## Tech Stack

**Backend:** Java, Spring Boot, Maven  
**Frontend:** React, TypeScript  
**Database:** PostgreSQL  
**Infrastructure:** Docker, Docker Compose

## Features

- Real-time stock tracking (add, update, delete products)
- Inventory reports generation
- Role-based access control (Administrator / Employee)
- Responsive and user-friendly interface

## Project Structure
├── managementstocuri-backend/   # Spring Boot REST API <br />
├── managementstocuri-frontend/  # React + TypeScript UI <br />
└── docker-compose.yaml          # Full stack setup



## Getting Started

### Prerequisites
- Docker & Docker Compose
- Java 17+
- Node.js 18+

### Run with Docker

```bash
docker-compose up --build
```

The app will be available at `http://localhost:3000`

### Run manually

**Backend:**
```bash
cd managementstocuri-backend
./mvnw spring-boot:run
```

**Frontend:**
```bash
cd managementstocuri-frontend
npm install
npm run dev
```

## Author

Andrei-Cătălin Ureche  
Bachelor in Computer Science — "Vasile Alecsandri" University of Bacău
