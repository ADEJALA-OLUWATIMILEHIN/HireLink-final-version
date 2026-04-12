
import express, {NextFunction, Request,Response} from "express";
import sequelize from "./config/sequelize";




import authRouter from "./route/auth";
import jobRouter from "./route/job";
import applicationRouter from "./route/application";
import bookmarkRouter from "./route/bookmark";
import dashboardRouter from "./route/dashboard";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";


const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", // or your deployed frontend
  credentials: true
}));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "HireLink API",
      version: "1.0.0",
      description: "API documentation for HireLink job portal"
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server"
      }
    ]
  },
  apis: ["./route/*.ts", "./models/*.ts",] 
};

const SwaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(SwaggerSpec));

app.use("/api/v1/auth", authRouter);
 app.use("/api/v1/jobs",jobRouter);
app.use("/api/v1/application",applicationRouter);
app.use("/api/v1/bookmarks",bookmarkRouter);
 app.use("/api/v1/dashboard",dashboardRouter);

 /**
  * @swagger
  * /:
  * get:
  * summary: Welcome message
  * description: Returns a welcome message for the HireLink API
  * responses:
  *  * 200:
  * description: Welcome message returned successfully
  */

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to HireLink API");
}
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', async() => {
  await sequelize.authenticate();
  console.log(`Server is running on port ${PORT}`);
});



