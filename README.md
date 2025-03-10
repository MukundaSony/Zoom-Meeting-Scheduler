# Zoom Meeting Scheduler

This is a Node.js application that allows users to schedule Zoom meetings using Zoom's Server-to-Server OAuth authentication.

## Features
- Fetch Zoom API access token automatically
- Schedule Zoom meetings via API
- Configurable meeting settings

## Prerequisites
Ensure you have the following:
- **Node.js** installed
- A **Zoom App** with Server-to-Server OAuth
- `.env` file with the required credentials

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/MukundaSony/Zoom-Meeting-Scheduler.git
   cd Zoom-Meeting-Scheduler
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add:
   ```env
   ZOOM_CLIENT_ID=your_client_id
   ZOOM_CLIENT_SECRET=your_client_secret
   ZOOM_ACCOUNT_ID=your_account_id
   ```

## Usage

1. **Run the application:**
   ```sh
   node index.js
   ```
   or with Nodemon (if installed):
   ```sh
   npm run dev
   ```

2. **Schedule a Zoom Meeting:**
   Send a `POST` request to:
   ```sh
   http://localhost:3000/schedule-meeting
   ```
   With the following JSON payload:
   ```json
   {
     "topic": "Team Sync Meeting",
     "start_time": "2024-09-20T15:00:00Z",
     "duration": 60,
     "timezone": "UTC"
   }
   ```

## API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/schedule-meeting` | Schedules a new Zoom meeting |

## Project Structure
```
/Zoom-Meeting-Scheduler
│── index.js         # Main application file
│── package.json     # Dependencies and scripts
│── .env             # Environment variables (DO NOT SHARE)
│── README.md        # Documentation
```

## Notes
- **DO NOT** commit your `.env` file. Add it to `.gitignore` to keep credentials safe.
- Ensure your Zoom App is configured for API access.

## License
This project is licensed under the [MIT License](LICENSE).

---
### Author
Developed by **Mukunda Sony** 🚀

