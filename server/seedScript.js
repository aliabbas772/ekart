import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from './models/product.js';
import Category from './models/category.js';
import { categoriesData, productData } from './seedData.js';

dotenv.config();

async function seedDatabase(){
    try {
        await mongoose.connect(process.env.MONGO_URI);

        await Product.deleteMany({})
        await Category.deleteMany({})

        const categoryDocs = await Category.insertMany(categoriesData);

        const categoryMap = categoryDocs.reduce((map, category) => {
            map[category.name] = category._id
            return map
        })

        const productsWithCategoryIds = productData.map((product) => ({
            ...product,
            category: categoryMap[product.category]
        }))

        await Product.insertMany(productsWithCategoryIds)

        console.log("DATABASE SEEDED SUCCESSFULLY ✅");

    } catch (error) {
        console.error("Error Seeding database:", error);
    } finally {
        mongoose.connection.close()
    }
}

seedDatabase() 