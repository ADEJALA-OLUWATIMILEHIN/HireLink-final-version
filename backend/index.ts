
import express, {NextFunction, Request,Response} from "express";
import sequelize from "./config/sequelize";




import authRouter from "./route/auth";
import jobRouter from "./route/job";
// import applicationRouter from "./route/application";
import bookmarkRouter from "./route/bookmark";
import dashboardRouter from "./route/dashboard";
import cors from "cors";



const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors())


app.use("/api/v1/auth", authRouter);
 app.use("/api/v1/jobs",jobRouter);
// app.use("/api/v1/application",applicationRouter);
app.use("/api/v1/bookmarks",bookmarkRouter);
 app.use("/api/v1/dashboard",dashboardRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to HireLink API");
}
);

app.listen(PORT, async() => {
  await sequelize.authenticate();
  console.log(`Server running on http://localhost:${PORT}`);
});


