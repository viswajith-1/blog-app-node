const express = require("express");
const serverless = require("serverless-http");
require("dotenv").config();
const path = require("path");

const Blog = require("../models/blogs");
const Contact = require("../models/contact");

// Cached DB connection function
const { connectDB } = require("./db");

const app = express();

// Disable cache (very important for Vercel)
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

app.use(express.urlencoded({ extended: true }));

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Static folder (optional; if you have no /public it won't break)
app.use(express.static(path.join(__dirname, "../public")));

// ROUTES
app.get("/favicon.ico", (req, res) => res.status(204).end());

app.get("/", async (req, res) => {
  try {
    await connectDB(); // 🔥 Always await DB here

    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .lean()
      .maxTimeMS(5000);

    res.render("index", { blogs: blogs || [] });
  } catch (err) {
    console.error("Error in / :", err);
    res.render("index", { blogs: [] });
  }
});

app.get("/topics", async (req, res) => {
  try {
    await connectDB();

    const searchQuery = req.query.search || "";
    let filter = {};

    if (searchQuery) {
      filter = {
        $or: [
          { title: { $regex: searchQuery, $options: "i" } },
          { snippet: { $regex: searchQuery, $options: "i" } },
          { author: { $regex: searchQuery, $options: "i" } },
        ],
      };
    }

    const blogs = await Blog.find(filter)
      .sort({ createdAt: -1 })
      .limit(50)
      .lean()
      .maxTimeMS(5000);

    res.render("topics", { blogs, search: searchQuery });
  } catch (err) {
    console.error("Error in /topics :", err);
    res.render("topics", { blogs: [], search: "" });
  }
});

app.get("/about", (req, res) => res.render("about"));
app.get("/contact", (req, res) => res.render("contact"));
app.get("/create", (req, res) => res.render("create"));

app.post("/create", async (req, res) => {
  try {
    await connectDB();
    await Blog.create(req.body);
    res.redirect("/");
  } catch (err) {
    console.error("Error in POST /create:", err);
    res.redirect("/");
  }
});

app.post("/contact", async (req, res) => {
  try {
    await connectDB();
    await Contact.create(req.body);
    res.redirect("/");
  } catch (err) {
    console.error("Error in POST /contact:", err);
    res.redirect("/");
  }
});

app.get("/:id", async (req, res) => {
  try {
    await connectDB();

    const blog = await Blog.findById(req.params.id)
      .lean()
      .maxTimeMS(5000);

    if (!blog) return res.status(404).render("404");

    res.render("blog", { blog });
  } catch (err) {
    console.error("Error in /:id :", err);
    res.status(500).render("404");
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    await connectDB();

    await Blog.findByIdAndDelete(req.params.id)
      .maxTimeMS(3000);

    res.json({ redirect: "/" });
  } catch (err) {
    console.error("Error in DELETE /delete:", err);
    res.json({ redirect: "/" });
  }
});

// GLOBAL ERROR HANDLER (very important for Vercel logs)
app.use((err, req, res, next) => {
  console.error("Unhandled Express Error:", err);
  res.status(500).send("Server Error");
});

// Export for Vercel
module.exports = serverless(app);
