

import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import authRoutes from '../src/routes/auth.routes.js'
import groupRoutes from './routes/group.routes.js'
import resourceRoutes from './routes/resource.routes.js'
import bookingRoutes from './routes/booking.routes.js'
import quizeRoutes from './routes/quiz.routes.js'
import userRoutes from './routes/user.routes.js'
import morgan from 'morgan'

const app = express()

// middlewares
app.use(morgan("dev"))
app.use(cors({
    origin: "https://studysyncfrontend.onrender.com",
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())

// routes 
app.get("/",(req,res)=>{
    res.send("server is running")
})

app.use("/api/auth", authRoutes)
app.use("/api/groups", groupRoutes)
app.use("/api/resources", resourceRoutes)
app.use("/api/bookings", bookingRoutes)
app.use("/api/quizzes", quizeRoutes)
app.use("/api/users", userRoutes)

// app.use((req, res, next) => {
//   console.log("Route hit:", req.method, req.url);
//   next();
// });


export default app;
