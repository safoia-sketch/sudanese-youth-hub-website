import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

//fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Serve static files from public
app.use(express.static(path.join(__dirname, "public")));
//set views 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Base routes
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/projects", (req, res) => {
    res.render("projects");
});

app.get("/events", (req, res) => {
    res.render("events");
});

app.get("/gallery", (req, res) => {
    res.render("gallery");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});