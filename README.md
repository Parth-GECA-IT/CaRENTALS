# Car Rental Project

This repository contains a Car Rental Project with a Next.js frontend and a Spring Boot backend.

## Prerequisites
Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18.17 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html) (version 17 or later)
- [Apache Maven](https://maven.apache.org/) (for building the Spring Boot application)
- [MySQL](https://dev.mysql.com/downloads/) (for database support)

## Project Structure
```
CaRENTALS/
├── client/   # Next.js frontend
└── server/   # Spring Boot backend
```

## Setting Up the Frontend (Next.js)

1. **Navigate to the `client` directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   The frontend should now be running at `http://localhost:3000`.

## Setting Up the Backend (Spring Boot)

1. **Open in Spring Tool Suite 4 (STS4) or any IDE:**
   - Import the project as a **Maven Project** in STS4 or IntelliJ.
   
2. **Configure the Database:**
   - Open `src/main/resources/application.properties` and update:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/car_rental_db
     spring.datasource.username=root
     spring.datasource.password=yourpassword
     spring.jpa.hibernate.ddl-auto=update
     ```

3. **Build the project using Maven:**
   ```bash
   mvn clean install
   ```

4. **Run the Spring Boot application:**
   ```bash
   mvn spring-boot:run
   ```
   The backend API should now be running at `http://localhost:8080`.

## Notes
- Ensure the backend is running before starting the frontend for API calls to work.
- Adjust configurations as needed to match your environment.
- For any issues, refer to the official documentation:
  - [Spring Boot Docs](https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started.html)
  - [Next.js Docs](https://nextjs.org/docs/getting-started)

## 👥 Contributors

- **Parth Armarkar** - [LinkedIn](http://www.linkedin.com/in/parth-armarkar-052551289) | [GitHub](https://github.com/Parth-GECA-IT)
- **Pranay Bannagre** - [LinkedIn](https://in.linkedin.com/in/pranay-bannagare-b69b76260) | [GitHub](https://github.com)