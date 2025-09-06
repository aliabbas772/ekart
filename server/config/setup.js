import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express'
import session from "express-session"
import ConnectMongoDBSession from "connect-mongodb-session";
import Transaction from '../models/transaction.js';
import Product from "../models/product.js";
import User from '../models/user.js';
import Category from "../models/category.js";
import Order from '../models/order.js';
import * as AdminJSMongoose from "@adminjs/mongoose";
import dotenv from 'dotenv';
import { COOKIE_PASSWORD } from './config.js';
import { dark, light, noSidebar } from "@adminjs/themes";

dotenv.config();

AdminJS.registerAdapter(AdminJSMongoose);

const DEFAULT_ADMIN = {
    email: "ali@gmail.com",
    password: "ali777"
}

const authenticate = async (email, password) => {
    if(email == DEFAULT_ADMIN.email && password == DEFAULT_ADMIN.password){
        return Promise.resolve(DEFAULT_ADMIN);
    }
    return null;
}

export const buildAdminJS = async(app) => {
    const admin = new AdminJS({
        resources: [
            { resource: Product },
            { resource: User },
            { resource: Category },
            { resource: Transaction },
            { resource: Order },
        ],
        branding: {
            companyName: "ekart",
            withMadeWithLove: false,
            favicon: "./logo_t.png",
            logo: "./logo_t.png",
        },
        defaultTheme: dark.id,
        availableThemes: [dark, light, noSidebar],
        rootPath: "/admin",
    });

    const MongoDBStore = ConnectMongoDBSession(session);
    const storeSession = new MongoDBStore({
        uri: process.env.MONGO_URI,
        collection: 'sessions',
    })

    const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
        admin,
        {
        authenticate,
        cookieName: "adminjs",
        cookiePassword: COOKIE_PASSWORD,
        },
        null,
        {
            store: storeSession,
            resave: true,
            saveUninitialized: true,
            secret: COOKIE_PASSWORD,
            cookie: {
                httpOnly: process.env.NODE_ENV === "production",
                secure: process.env.NODE_ENV === "production",
            },
            name: "adminjs",
            }
     );

     app.use(admin.options.rootPath, adminRouter);

}
