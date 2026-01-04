# Intent Weaver

A file management application with intent-based tagging and organization.

## Project Structure

This project consists of two main parts:
- **Frontend**: React application with Vite, TypeScript, and shadcn-ui
- **Backend**: Node.js API with Express, MongoDB, and JWT authentication

## Frontend Setup

### Technologies Used
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd intent-weaver

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Backend Setup

### Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Swagger API Documentation
- Winston Logging
- Multer for file uploads

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

```sh
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your configuration
```

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/intent-weaver
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production
JWT_EXPIRE=7d
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760
FRONTEND_URL=http://localhost:5173
```

### Running the Backend

```sh
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

### API Documentation

Once the server is running, visit `http://localhost:5000/api-docs` for Swagger API documentation.

### Key Features

- **Authentication**: JWT-based user authentication
- **Spaces**: Organize files into categorized spaces
- **File Management**: Upload, download, and organize files
- **Tagging System**: Intent-based file tagging
- **Search**: Full-text search across files and tags
- **User Settings**: Customizable user preferences

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updatedetails` - Update user details
- `PUT /api/auth/updatepassword` - Update password

#### Spaces
- `GET /api/spaces` - Get all user spaces
- `POST /api/spaces` - Create new space
- `GET /api/spaces/:id` - Get space by ID
- `PUT /api/spaces/:id` - Update space
- `DELETE /api/spaces/:id` - Delete space

#### Files
- `GET /api/files` - Get files with filters
- `POST /api/files` - Upload file
- `GET /api/files/:id` - Get file by ID
- `PUT /api/files/:id` - Update file metadata
- `DELETE /api/files/:id` - Delete file
- `GET /api/files/:id/download` - Download file

## Deployment

### Frontend Deployment
Deploy to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

### Backend Deployment
Deploy to any Node.js hosting service (Heroku, Railway, DigitalOcean, etc.) with MongoDB.

## Custom Domain

Configure custom domains through your hosting provider's settings.
