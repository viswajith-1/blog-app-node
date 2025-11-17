# The Current - Blog Website

`blog-app-node` is a dynamic blog application built with Node.js, Express, EJS, and MongoDB following MVC model. It's designed to be a fast, server-rendered platform for publishing and managing articles.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-A91E50?style=for-the-badge&logo=javascript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

---

## 📋 Screenshots

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5c8b9abe-6782-4226-9887-7fab81ec6f3e" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/9a29d816-fdba-481c-8cf6-4e67a7314292" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f5e74cc8-a985-4ea2-8f06-8fc017a8b676" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/40679eef-9b67-4581-b8aa-0bea877776be" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/75570332-b598-412a-80b7-ad0244de8dad" />






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
    git clone https://github.com/viswajith-1/blog-app-node.git
    cd blog-app-node
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a file named `.env` in the root of the project. You will need to add your MongoDB connection string here.

### ⚡ Running the Project

This uses `nodemon` to automatically restart the server when you save file changes.
    
    ```sh
    nodemon app
    ```

Once running, open your browser and navigate to `http://localhost:3000` (or the port you defined).


