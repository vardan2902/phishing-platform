# Phishing Imitation Backend

<p>A backend service for simulating phishing attempts, tracking user actions, and managing authentication using the <a href="http://nestjs.com/" target="_blank">NestJS</a> framework.</p>

## Description

This repository provides the backend for a phishing simulation platform. The platform is built for security training purposes to help users identify phishing attempts, log actions, and improve their awareness of security risks.

## Installation

```bash
$ npm install
```

## Set up

```bash
$ cp .env.example .env
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Features

- Authentication APIs:
  - User sign-up and login with JWT-based authentication.
	
- Phishing Simulation:
  - Send phishing emails. 
  - ck phishing attempts and user clicks. 
- User Profile Management:
  - w the current user’s profile.
- Swagger Documentation:
  - Comprehensive API documentation available at /docs.

