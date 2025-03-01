# 🎉 EventGlory

EventGlory is an event management application that allows organizers to create and efficiently manage events. Participants can register, make payments, and track their events in a simple and intuitive way.

## 🚀 Features

Event creation and management: Administrators can create events, set dates, locations, and configure registrations.
Participant registration: Users can sign up for events and track their registrations.
Integrated payments: Option to make payments directly through the system.
RESTful API: Endpoints developed with Django REST Framework for seamless integration with other applications.
Authentication:  OAuth2-based authentication using drf_social_oauth2 for secure user access.

## 🛠️ Technologies

- **Backend:** Django + Django REST Framework + PostgreSQL
- **Authentication:**  Django Auth / drf_social_oauth2
- **Dependency Management:** Poetry

# How to Use

## Requirements:

- **Pyenv**
- **Poetry**
- **Docker**

## Setup Instructions:

### 1️⃣ Install the required Python version:

```
pyenv install 3.13.2
```

### 2️⃣ Set the Python version for the project in the backend directory:

```
pyenv local 3.13.2
```

### 3️⃣ Activate the virtual environment:

```
poetry shell
```

### 4️⃣ Install dependencies:

```
poetry install
```
### 5️⃣ Set up the .env file in the backend directory:
```
SECRET_KEY=
ALLOWED_HOSTS=
POSTGRES_NAME=
POSTGRES_USER=
POSTGRES_PASSWORD=
DEBUG=
```

### 6️⃣ Set the Python interpreter path in your IDE:

1. Run the following command to get the virtual environment path:
   ```
   poetry env info
   ```
2. Copy the path of the Python executable and manually add it as the interpreter in your IDE.

### 6️⃣ Run the application with Docker Compose:

```
docker compose up
```
