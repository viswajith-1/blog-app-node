const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

// Models
const Blog = require("../models/blogs");
const Contact = require("../models/contact");

// Vercel needs this to prevent hanging
module.exports = async (req, res) => {
  const app = express();

  // Prevent caching
  app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    next();
  });

  app.use(express.urlencoded({ extended: true }));

  // View Engine
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "../views"));

  // Static
  app.use(express.static(path.join(__dirname, "../public")));

  // Connect to MongoDB only once
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  }

  // Routes
  app.get("/", async (req, res) => {
    const blogs = await Blog.find();
    res.render("index", { blogs });
  });

  app.get("/about", (req, res) => res.render("about"));
  app.get("/contact", (req, res) => res.render("contact"));
  app.get("/create", (req, res) => res.render("create"));

  app.post("/create", async (req, res) => {
    await Blog.create(req.body);
    res.redirect("/");
  });

  app.post("/contact", async (req, res) => {
    await Contact.create(req.body);
    res.redirect("/");
  });

  app.get("/topics", async (req, res) => {
    const search = req.query.search || "";
    const filter = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { snippet: { $regex: search, $options: "i" } },
            { author: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.render("topics", { blogs, search });
  });

  app.get("/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.render("blog", { blog });
  });

  return app(req, res);
};
