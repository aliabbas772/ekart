import React , { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@modules/home';
import Splash from '@modules/onboard';
import { navigationRef } from './NavigationUtil.tsx'
import MainNavigator from './MainNavigator.tsx';
import Products from '@modules/products/index.tsx';
import Cart from '@modules/cart';
import PaymentSuccess from '@modules/payment_success/index.tsx';
// import ARViewer from '@modules/ar_viewer/index.tsx';

const Stack = createNativeStackNavigator()

const Navigation:FC = () => {

        return (
            <NavigationContainer ref = { navigationRef }>
                <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName = 'Splash'
                >
                    <Stack.Screen name="Splash" component={Splash} />
                    <Stack.Screen name="MainNavigator" component={MainNavigator} />
                    <Stack.Screen name="Products" component={Products} />
                    <Stack.Screen name="Cart" component={Cart} />
                    {/* <Stack.Screen name="ARViewer" component={ARViewer} /> */}
                    <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />

                </Stack.Navigator>
            </NavigationContainer>
        )
    }

    export default Navigation