# CampusConnect — MERN Capstone

A responsive campus events and opportunities portal built with React, Express, Node.js and MongoDB. Students can browse/search/filter events, workshops, internships, competitions and volunteer opportunities, and submit or delete listings.

## Requirements
- Node.js LTS
- MongoDB Atlas account (or local MongoDB)
- VS Code

## Configure MongoDB
1. In `server`, copy `.env.example` to `.env`.
2. Put your own MongoDB connection string after `MONGO_URI=`. Example format: `mongodb+srv://USERNAME:PASSWORD@YOUR-CLUSTER/campusconnect?retryWrites=true&w=majority`
3. In Atlas, create a database user and allow your current IP in Network Access. Do not share or commit `.env`.

## Run the backend
Open a VS Code terminal:
```bash
cd server
npm install
npm run dev
```
API: `http://localhost:5000`; health check: `http://localhost:5000/api/health`.

## Run the frontend
Open a second terminal:
```bash
cd client
npm install
npm run dev
```
Open the URL Vite prints, usually `http://localhost:5173`.

## API
- `GET /api/health` health/database status
- `GET /api/listings` list; optional `?category=Workshop&search=AI`
- `GET /api/listings/:id` one listing
- `POST /api/listings` create listing
- `DELETE /api/listings/:id` delete listing

## Notes
This starter does not yet implement user accounts/authentication or role permissions. Add and test those only if required by your capstone evaluation. Before final submission, deploy frontend and backend, configure production environment variables/CORS, and add the GitHub URL, hosted URL and screenshots to your report.
