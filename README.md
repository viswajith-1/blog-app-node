# blog-app-node

`blog-app-node` is a dynamic blog application built with Node.js, Express, EJS, and MongoDB. It's designed to be a fast, server-rendered platform for publishing and managing articles.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-A91E50?style=for-the-badge&logo=javascript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

---

## 📋 Table of Contents

* [Features](#-features)
* [Tech Stack](#-tech-stack)
* [Getting Started](#-getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
    * [Running the Project](#-running-the-project)
* [Project Structure](#-project-structure)
* [Environment Variables](#-environment-variables)
* [License](#-license)

---

## ✨ Features

* **Full CRUD Operations:** Create, Read, Update, and Delete articles.
* **Dynamic Rendering:** Uses EJS for fast server-side rendering of pages.
* **Database:** Connects to MongoDB Atlas (a cloud database) to store all articles.
* **RESTful Routing:** Follows REST principles for a clean and predictable API structure.

---

## 🛠 Tech Stack

* **Backend:** **Node.js**, **Express.js**
* **Frontend (Templating):** **EJS** (Embedded JavaScript)
* **Database:** **MongoDB** with **Mongoose** (using **MongoDB Atlas** for cloud hosting)
* **Environment Variables:** **dotenv**

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

You must have the following installed on your machine:
* [Node.js](https://nodejs.org/en/) (which includes npm)
* [Git](https://git-scm.com/) (for cloning the repo)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/blog-app-node.git](https://github.com/your-username/blog-app-node.git)
    cd blog-app-node
    ```
    *(Remember to replace `your-username` with your actual GitHub username)*

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a file named `.env` in the root of the project. You will need to add your MongoDB connection string here. (See [Environment Variables](#-environment-variables) section below).

### ⚡ Running the Project

1.  **Development Mode:**
    This uses `nodemon` to automatically restart the server when you save file changes.
    ```sh
    npm run dev
    ```
    *(This assumes you have a `dev` script in `package.json` like: `"dev": "nodemon app.js"`)*

2.  **Production Mode:**
    ```sh
    npm start
    ```
    *(This assumes you have a `start` script in `package.json` like: `"start": "node app.js"`)*

Once running, open your browser and navigate to `http://localhost:3000` (or the port you defined).

---

## 📁 Project Structure

Here is a common structure for an EJS/Express project:
