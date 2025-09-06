import express from "express";
import dotenv from "dotenv";
import userRoutes from './routes/user.js'
import categoryRoutes from './routes/category.js'
import productRoutes from './routes/product.js'
import orderRoutes from './routes/order.js'
import connectDB from "./config/connect.js";
import { buildAdminJS } from "./config/setup.js";
import { PORT } from "./config/config.js";

dotenv.config();

const app = express();

app.use(express.json());

//Routes
app.use('/user', userRoutes)
app.use('/category', categoryRoutes)
app.use('/product', productRoutes)
app.use('/order', orderRoutes)

const start = async () => { 
    try {
        await connectDB(process.env.MONGO_URI);

        await buildAdminJS(app);
        app.listen({ port: PORT, host: "0.0.0.0" }, (err, addr) => {
            if(err){
                console.log(err);
            }
            else{
                console.log(`Server is running on http://localhost:${PORT}/admin`);
            }
         });
    } catch (error) {
        console.log("Error starting server:", error)
    }
};

start(); 