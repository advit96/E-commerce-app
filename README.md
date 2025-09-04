# MERN E-Commerce App

A full-stack E-Commerce web application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Project Structure
ecommerce/
│── backend/    # Node.js + Express + MongoDB (API, Auth, Image Uploads)
│── frontend/   # React + Vite + TailwindCSS (UI)
│── README.md   # Project documentation

## Features

 User authentication (JWT login/signup)

 Product listing with images

 Add to cart functionality

 Admin: Add, update, and delete products

 Product stock management

## Tech Stack

Frontend: React, Vite, TailwindCSS

Backend: Node.js, Express.js

Database: MongoDB, Mongoose

Authentication: JWT

Image Upload: Multer

## Installation
 Clone the repo
git clone https://github.com/your-username/ecommerce.git
cd ecommerce

## Backend setup
cd backend
npm install


Create a .env file in backend/ with:

MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000


Run backend:

npm run dev

## Frontend setup
cd frontend
npm install
npm run dev

## Screenshots

(Add images later of homepage, product page, cart page)

## Author

Made by Advit Srivastava
