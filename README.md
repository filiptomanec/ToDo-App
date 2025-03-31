# Todo App

This application allows task management with support for adding, deleting, editing, and marking tasks as completed.
Tasks are persisted by connecting to a backend service.

![Todo App Screenshot](/src/assets/screenshot.png)

## 🚀 Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/filiptomanec/ToDo-App.git
cd todo-app
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Start the Application

```sh
npm run dev
```

The app will run on `http://localhost:5173/`.

### 4. Start the Backend

The backend runs separately on `http://localhost:8080/`.

## 📌 Features

- Add, delete, and edit tasks
- Mark tasks as completed
- Filter tasks (completed / incomplete)
- Mark all visible tasks as completed
- Bulk delete completed tasks
- Display the count of completed tasks
- Handle error cases when communicating with the backend

## 🛠 Technologies Used

- **React / TypeScript**
- **Redux & Redux Toolkit** – State management
- **RTK Query** – Efficient backend communication
- **Shadcn/ui** – UI components
- **Tailwind CSS** – Styling framework

---
**Author:** Filip Tomanec | [GitHub](https://github.com/filiptomanec)
