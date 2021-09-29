import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

import router from "./routes/index.js";

dotenv.config();

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Scheduler API",
            version: '1.0.0',
        },
        host: "https://localhost:5000/api/v1",
        basePath: '/',
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                description: 'JWT authorization of an API',
                name: 'Authorization',
                in: 'header',
            },
        },
    },
    apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(fileUpload({}));
app.use(express.static('static'));
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use("/api/v1", router);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();