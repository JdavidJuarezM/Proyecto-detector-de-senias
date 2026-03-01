<div align="center">

# 🤟 Sign Language Detector

**A real-time sign language detection web application powered by Machine Learning**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](#)
[![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)](#)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](#)

*An interactive full-stack application that leverages pre-trained TensorFlow.js models in the browser to detect and translate sign language in real-time, backed by a fast Node.js/Express server.*

</div>

<br />

## 📑 Table of Contents
- [✨ Key Features](#-key-features)
- [🏗️ Architecture & Structure](#️-architecture--structure)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Option 1: Run with Docker (Recommended)](#option-1-run-with-docker-recommended)
  - [Option 2: Manual Setup](#option-2-manual-setup)
- [🛠️ Tech Stack](#️-tech-stack)

---

## ✨ Key Features

* **✔️ Real-Time Detection:** Uses computer vision directly in the browser via `TensorFlow.js` to interpret hand signs without heavy server-side processing.
* **✔️ Pre-trained Models:** Integrates optimized, sharded `.bin` / `.json` model files loaded dynamically into the React frontend.
* **✔️ Modern UI/UX:** Built with React, Vite, and Tailwind CSS for a fast, responsive, and clean user experience.
* **✔️ Lightweight Backend:** A decoupled Node.js and Express REST API to handle business logic and configuration.
* **✔️ Containerized Ready:** Fully configured with `Dockerfile`s for both frontend and backend, orchestrated seamlessly via `docker-compose`.

---

## 🏗️ Architecture & Structure

This project follows a decoupled client-server architecture, embedding the Machine Learning models inside the frontend static assets for client-side execution:

```text
Proyecto-detector-de-senias/
├── backend/                       # Node.js & Express API
│   ├── server.js                  # Main server entry point
│   ├── package.json               # Backend dependencies
│   └── Dockerfile                 # Backend container configuration
├── frontend/                      # React SPA
│   ├── public/tfjs_model/         # Exported TensorFlow.js model shards
│   ├── src/                       # React components, styles, and app logic
│   ├── package.json               # Frontend dependencies
│   ├── vite.config.js             # Vite bundler configuration
│   └── Dockerfile                 # Frontend container configuration
└── docker-compose.yml             # Orchestration for the full-stack environment
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
* **Node.js:** v18 or higher (and `npm`)
* **Docker & Docker Compose:** *(Highly recommended for streamlined deployment)*

---

### Option 1: Run with Docker (Recommended)

The easiest way to get both the frontend and backend running simultaneously is using Docker Compose.

1. Clone the repository and navigate to the root directory:
   ```bash
   git clone <your-repository-url>
   cd Proyecto-detector-de-senias
   ```
2. Build and start the containers:
   ```bash
   docker-compose up --build
   ```
*The frontend will typically be available at `http://localhost:5173` and the backend on its respective configured port.*

---

### Option 2: Manual Setup

If you prefer to run the environments manually without Docker:

#### Backend Setup (Node.js)
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Express server:
   ```bash
   npm start
   ```

#### Frontend Setup (React + TF.js)
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

---

## 🛠️ Tech Stack

**Frontend:**
* React + Vite
* Tailwind CSS
* TensorFlow.js (`@tensorflow/tfjs`) for in-browser ML inference

**Backend:**
* Node.js
* Express.js

**Infrastructure & Deployment:**
* Docker
* Docker Compose
* Vercel (Configuration included via `vercel.json`)

<br />

<div align="center">
  <i>Developed with ☕ to bridge communication gaps using AI.</i>
</div>
