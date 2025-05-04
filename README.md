# Virtual Pet Adoption Center

## Node + React CRUD Application

This is a full-stack web application developed using Node.js (Express) for the backend and React.js for the frontend. It performs CRUD (Create, Read, Update, Delete) operations for user management, using MongoDB as the database.

## 📂 Project Structure

-
- - backend
- - frontend
- - ScreenShots (all Screen shot of the system)


## 🌳 Branch-wise Development Workflow (total 10)

| Branch Name        | Purpose                                              |
|--------------------|------------------------------------------------------|
| `master`             | Production-ready, fully tested codebase              |
| `div`             | Development integration or staging branch              |
| `backend/pet`          | Backend development with Express & MongoDB           |
| `testing/pet`         | testing backend with `PostMan`                   |
| `frontend/pet`   | Frontend development with React.js `(not in-use)`  |
| `frontend/vite/pet`    | Migration or configuration using Vite + React.js    |
| `optionaltask/PetPersonalityQuiz`             | Optional task: Implementing a pet personality quiz       |
| `optionaltask/petAdpotCertificate`             | Optional task: Generating and downloading adoption certificates (PDF)       |
| `optionaltask/notifications`             | Optional task: Notifications       |
| `optionaltask/confetti`             | Optional task: Confetti animations for celebrations (e.g., on adoption)       |

### Important

in backend/controllers have 2 controllers

- petController.js (all required task according to the pet)
- OPTController.js (all Bonus Features (Optional) task in here)

in backend/routes have 2 controllers

- OPTRoute.js (all required task routes)
- petRoute.js (all Bonus Features (Optional) task routes)

- - other all task add with comments in code


## 🚀 Setup Instructions
1. Clone the Repository

```bash

    git clone https://github.com/BackendExpert/Virtual-Pet-Adoption-Center.git
    cd Virtual-Pet-Adoption-Center

```

2. Install Backend Dependencies

```bash

    cd backend
    npm install


```

3. Configure MongoDB

- Ensure MongoDB is running locally or provide a connection string.
- Edit `.env` file in the `backend` folder

```bash

    PORT=5000
    MONGO_URI=mongodb://localhost:27017/crud_db

```

4. Run the Backend

```bash

    npm start


```

- The backend should be running at `http://localhost:5000`.


5. Install Frontend Dependencies

- Open a new terminal tab:

```bash

    cd frontend
    npm install

```

6. Run the Frontend

```bash

    npm run dev

```

The frontend should be available at `http://localhost:5173`.
- if you start many project this port will change



## 🔧 Features
- Add new pet

- View all pet

- Update pet information

- Delete pet

- Adopt Pets

- Genarate Apdotion Certificate

- Get Notifications 


## 🖼️ Screenshots

- all screen shorts in /ScreenShot folder


