import { BASE_URL } from "@store/config";
import axios from "axios";

export const loginOrSignup = async (phone: string, address: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/user/login`, {
            phone,
            address
    })
    return response.data.user
    } catch (error)
    {
        console.log("Login or Signup error", error)
        return null;
    }

}

export const getOrderByUserid = async (userId: string) => {
    try {
        const res = await axios.post(`${BASE_URL}/order/${userId}`)
        return res.data.orders
    } catch (error) {
        console.log("Order Error", error)
        return null;
    }
}