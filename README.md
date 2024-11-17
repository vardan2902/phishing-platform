# Phishing Simulation Platform - Dockerized Deployment

This repository contains a **Phishing Simulation Platform** built to simulate phishing attempts, manage authentication, and track user actions.

---

## Application Overview

- **Backend**: Built with NestJS, provides APIs for authentication, phishing simulation, and user management.
- **Frontend**: React + TypeScript application for interacting with the phishing platform.
- **Database**: MongoDB for storing data related to users, phishing attempts, and logs.

---

## Prerequisites

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed on your system.

---

## Setup and Usage

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd phishing-platform
   ```

2. Start the application:
   ```bash
   docker-compose up -d
   ```

3. Access the services:
    - **Frontend**: [http://localhost](http://localhost)
    - **Backend API**: [http://localhost:4000](http://localhost:4000)
    - **Swagger Documentation**: [http://localhost:4000/docs](http://localhost:4000/docs)
    - **MongoDB**: Accessible on port `27017` (if needed for debugging).

4. Stop the services:
   ```bash
   docker-compose down
   ```

---

## Environment Variables

### Backend (`server/.env`)
```env
DATABASE_URL=<mongodb_url_with_credentials>
PORT=4000
EMAIL_USER=<gmail_address>
EMAIL_PASSWORD=<gmail_app_password>
JWT_USER_SECRET=secret
JWT_USER_TOKEN_EXPIRES_IN=1d
BASE_URL=http://localhost:4000

```

### Frontend (`app/.env`)
```env
VITE_API_BASE_URL=http://localhost:4000
```

---

## Directory Structure

```plaintext
phishing-platform/
├── app/                      # Frontend service (React + Vite)
├── server/                   # Backend service (NestJS)
├── db_data/                  # MongoDB persistent storage
├── docker-compose.yml        # Docker Compose file
└── README.md                 # Project documentation
```

---

## Key Commands

- **View running containers**:
  ```bash
  docker ps
  ```

- **View logs for a specific service**:
  ```bash
  docker-compose logs <service-name>
  ```

- **Restart a specific service**:
  ```bash
  docker-compose restart <service-name>
  ```

- **Stop and remove containers**:
  ```bash
  docker-compose down
  ```

---
