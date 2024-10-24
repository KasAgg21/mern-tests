# Admin Panel - Employee Management System

This project is an **Employee Management System** built using the **MERN stack (MongoDB, Express, React, Node.js)**. It provides functionalities for managing employee information, including login authentication, employee creation, editing, and validation processes.

---

## Features

### 1. **Login Page**
- **User Name** and **Password** fields with validation.
- Upon successful login, the user is directed to the dashboard; otherwise, an error alert is shown for invalid credentials.
- **Local Storage/Cookies** are used to manage the user session on the dashboard.

### 2. **Admin Dashboard**
- Displays a welcome message and provides an overview of employee management functionalities.
- Allows navigation to the employee list, creation, and logout options.

---

## Database Tables

### **1. t_login**
- **Fields**: `f_sno`, `f_userName`, `f_Pwd`

### **2. t_Employee**
- **Fields**: `f_Id`, `f_Image`, `f_Name`, `f_Email`, `f_Mobile`, `f_Designation`, `f_gender`, `f_Course`, `f_Createdate`

---

## Functionalities

### 1. **Employee List**
- Displays the total count of employees and allows for searching by keyword.
- Shows a table with the following fields: `Unique Id`, `Image`, `Name`, `Email`, `Mobile No`, `Designation`, `Gender`, `Course`, `Create Date`.
- Options to **Edit** or **Delete** an employee record.

### 2. **Create Employee**
- Fields for **Name**, **Email**, **Mobile No**, **Designation**, **Gender**, **Course**, and **Image Upload**.
- **Validation**: All fields are required with server-side (Node.js) and client-side (JavaScript/JQuery) validation.
  - **Email validation** and **duplicate check**.
  - **Numeric validation** for Mobile No.
  - Only accepts **jpg/png** files for image upload.

### 3. **Edit Employee**
- On selecting an employee, their existing data is loaded for editing.
- Allows updates to the employee details, including the option to upload a new image.
- The same validation rules as in the **Create Employee** form apply.

---

## Validations

- **Server-side (Node.js)** and **client-side (JavaScript/JQuery)** validation.
  - **Login Validation**: Checks if the username and password are correct.
  - **Form Validation**: All input fields are validated for correct formats and data integrity.
  - **Email Validation**: Checks for valid email format and ensures no duplicates.
  - **File Upload Validation**: Only allows `jpg/png` formats for images.
  - **Numeric Validation**: Ensures that the Mobile No field contains only numbers.

---

## Technologies Used
- **MongoDB**: For storing employee and login data.
- **Express.js**: Backend framework for building the API.
- **React.js**: Frontend framework for building the UI.
- **Node.js**: For building the server and handling requests.
- **JavaScript** and **JQuery**: For client-side scripting and validations.

---

## Installation and Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/employee-management-system.git
    ```

2. **Install dependencies**:
    ```bash
    cd employee-management-system
    npm install
    ```

3. **Run the application**:
    ```bash
    npm start
    ```

4. **Database setup**:
   - Ensure MongoDB is running locally or set up a cloud instance.
   - Create the necessary collections for login and employee management.

---

## Screenshots

- **Login Page**:
  - Username and Password fields with validation.

- **Admin Dashboard**:
  - Display of employee list with options to create or manage employees.

- **Create Employee Form**:
  - Form with validation for creating a new employee.

- **Edit Employee Form**:
  - Form pre-filled with existing data for editing an employee.

