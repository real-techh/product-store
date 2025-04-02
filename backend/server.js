import express from "express";
import dotenv from "dotenv";
import path from "path"
import productRouter from "./routes/product.js"
import {connectDB} from "./config/db.js"
dotenv.config();

const app = express();
//console.clear();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve()

app.use(express.json()); //allow us to accept json data in the req.body

app.use("/api/products/", productRouter)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
})