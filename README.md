
# foodieSerendipity

foodieSerendipity is a food web application built using React, JavaScript, CSS, Node.js, Express.js, and MongoDB. It provides a simple interface for exploring food options and managing food-related operations.

## Tech Stack

- **Frontend:** React.js, JavaScript, CSS, HTML
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Version Control:** Git, GitHub

## Features

- Interactive user interface
- Food browsing interface
- Backend API integration
- MongoDB database connectivity
- Full-stack application architecture

## Project Structure

```text
foodieSerendipity/
├── frontend/
├── backend/
├── README.md
└── .gitignore
```

## Installation and Setup

### Clone the Repository

```bash
git clone <https://github.com/tejal-29/foodieSerendipity-frontend>
cd foodieSerendipity
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Start the backend:

```bash
npm start
```

If your backend uses a development script, you can run:

```bash
npm run dev
```

### Frontend Setup

Open a new terminal and run:

```bash
cd foodieSerendipity/frontend
npm install
npm start
```

If your React application uses Vite, run:

```bash
npm run dev
```

## Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Port used by the backend server |
| `MONGODB_URI` | MongoDB connection string |

## Application Workflow

1. The user interacts with the React frontend.
2. The frontend sends requests to the Express.js backend.
3. The backend processes requests and communicates with MongoDB.
4. MongoDB stores and retrieves application data.
5. The backend returns responses to the frontend.

## Future Improvements

- User authentication
- Food search and filtering
- Shopping cart
- Order tracking
- Online payment integration

## License

This project is intended for learning and development purposes.

