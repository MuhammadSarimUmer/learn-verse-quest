
# LearnVerse Quest - Backend Server

This is the backend server for the LearnVerse Quest programming learning platform. It provides APIs for user authentication, challenge management, project tracking, and user progress tracking.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository
2. Navigate to the server directory
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user
- `GET /api/auth/me`: Get current user

### Users

- `GET /api/users/:id`: Get a user by ID
- `PUT /api/users/:id`: Update user profile

### Challenges

- `GET /api/challenges`: Get all challenges
- `GET /api/challenges/:id`: Get a specific challenge
- `POST /api/challenges/:id/submit`: Submit a challenge solution

### Projects

- `GET /api/projects`: Get all projects
- `GET /api/projects/:id`: Get a specific project
- `POST /api/projects/:id/save`: Save project progress

### Progress

- `GET /api/progress/:language`: Get user progress for a language
- `PUT /api/progress/skill/:language/:skillId`: Update skill progress
- `PUT /api/progress/streak`: Update user streak

## Models

### User

- Username
- Email
- Password (hashed)
- Name
- Profile Picture
- Level
- XP
- Streak
- Last Active Date

### UserProgress

- User Reference
- Language
- Skills Array
- Completed Challenges
- Completed Projects
- Current Course

### Challenge

- Title
- Description
- Difficulty
- Points
- Time Estimate
- Language
- Topics
- Instructions
- Starting Code
- Test Cases
- Solution
- Hints

### Project

- Title
- Description
- Difficulty
- Time Estimate
- Category
- Languages
- Topics
- Popularity
- Steps
- Requirements

## Technologies Used

- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt.js for password hashing
