import { navigate } from "@navigation/NavigationUtil"
import { BASE_URL } from "@store/config"
import axios from "axios"
import { Alert } from "react-native"
import RazorpayCheckout from "react-native-razorpay"

export const createTransaction = async (amount: number, userId: string) => {
    try {
        //  Alert.alert(BASE_URL.toString())
        const res = await axios.post(`${BASE_URL}/order/transaction`,{
            amount: amount * 100,
            userId
        })
        
        return res.data
    } catch (error:any) {
        Alert.alert(error.message)
        return null
    }
}

export const createOrder = async (
    key: string,
    amount: number,
    order_id: string,
    cart: any,
    userId: string,
    address: string,
) => {
    try{
        let option = {
            description: " Ecommerce Shopping",
            image: 'https://i.postimg.cc/ZRCCXLgg/temp-Imagef-Coi-ZY.avif',
            currency: 'INR',
            key:key,
            amount: amount,
            name: "ekart",
            order_id: order_id,
            theme: {
                color: '#53a20e',
            }
        }
  Alert.alert('Pad')
        RazorpayCheckout.open(option).then(async(data)=>{
            const today = new Date();
            const sevenDaysFromNow = new Date();
            sevenDaysFromNow.setDate(today.getDate() + 7);

            const res = await axios.post(`${BASE_URL}/order`, {
                razorpay_order_id: order_id,
                razorpay_payment_id: data?.razorpay_payment_id,
                razorpay_signature: data?.razorpay_signature,
                userId: userId,
                cartItems: cart,
                deliveryDate: sevenDaysFromNow,
                address: address,
            })
            navigate("PaymentSuccess",{
                price: amount/100,
                address: address
            })
        }).catch((error:any)=>{
            console.log(error);
            return{type: 'error', message: error?.description}
        })


    } catch (error) {
        console.error("Error creating order", error);
        return { type: 'error', message: 'Error creating order' };
    }
}