# 🚗 Car Rental Project 🏎️

<!-- This repository contains a Car Rental Project with a Next.js frontend and a Spring Boot backend. -->

## 📝 Prerequisites 

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18.17 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) (version 11 or later)
- [Apache Maven](https://maven.apache.org/) (for building the Spring Boot application)
- [MySQL](https://dev.mysql.com/downloads/) (for database support)

## 📂 Project Structure

```
CaRENTALS/
├── client/   # Next.js frontend
└── server/   # Spring Boot backend
```

## 📌 Contributing to the Project

If you are a contributor, follow these steps to clone the repository and create a new branch for development:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Parth-GECA-IT/CaRENTALS.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd CaRENTALS
   ```

3. **Create a New Branch:**

   ```bash
   git checkout -b your-branch-name
   ```

4. **Make Changes and Commit:**

   ```bash
   git add .
   git commit -m "Commit message"
   ```

5. **Push Your Branch to GitHub:**

   ```bash
   git push origin your-branch-name
   ```

6. **Create a Pull Request:**

   - Go to the repository on GitHub.
   - Click on "Compare & pull request".
   - Add a description and submit the pull request for review.

## 🚀 Setting Up the Frontend (Next.js)

1. **Navigate to the **`.client`** directory:**

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

   The frontend should now be running at [http://localhost:3000](http://localhost:3000).

## Setting Up the Backend (Spring Boot)

1. **Open in Spring Tool Suite 4 (STS4) or any IDE:**

   - Import the project as a **Maven Project** in STS4 or IntelliJ.

2. **Configure the Database:**

   - Open `src/main/resources/application.properties` and update:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/carentals
     spring.datasource.username=root
     spring.datasource.password=YourPassword
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

   The backend API should now be running at [http://localhost:8080](http://localhost:8080).

## 📝 Notes

- Ensure the backend is running before starting the frontend for API calls to work.
- Adjust configurations as needed to match your environment.
- For any issues, refer to the official documentation:
  - [Spring Boot Docs](https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started.html)
  - [Next.js Docs](https://nextjs.org/docs/getting-started)

## 👥 Contributors

- **Parth Armarkar** - [LinkedIn](http://www.linkedin.com/in/parth-armarkar-052551289) | [GitHub](https://github.com/Parth-GECA-IT)
- **Pranay Bannagre** - [LinkedIn](https://in.linkedin.com/in/pranay-bannagare-b69b76260) | [GitHub](https://github.com)