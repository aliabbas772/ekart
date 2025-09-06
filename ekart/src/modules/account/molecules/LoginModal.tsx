import { View, Text, Alert, Modal, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@store/reduxHook'
import { setData } from '../api/slice'
import { loginOrSignup } from '../api/api'
import { navigate } from '@navigation/NavigationUtil'
import { clearCart } from '@modules/cart/api/slice'
import { modalStyles } from '@styles/modalStyles'
import Icon from '@components/atoms/Icon'
import { Colors } from '@utils/Constants'

const LoginModal:FC<{visible:boolean,onClose:()=>void}> = ({visible,onClose}) => {
  
  const dispatch=useAppDispatch()
  const user = useAppSelector(state=>state.account.user) as any;
  const [number,setNumber] = useState('')
  const [address,setAddress] = useState('')


    const handleLogin = async()=> {
        const data = await loginOrSignup(number, address)
        if(data){
            dispatch(setData(data))
            onClose()
        } else {
            Alert.alert("There was an error")
        }
    }

    useEffect(()=> {
        if(user?.phone){
            setNumber(user?.phone)
            setAddress(user?.address)
        }
        }, [user])

        const handleLogout = async () => {
            onClose()
            navigate("Home")
            setAddress('')
            setNumber('')
            await dispatch(clearCart())
            await dispatch(setData(null))
        }


    return (
    <Modal
    visible={visible}
    animationType="slide"
    transparent={true}
    onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
      <View style={modalStyles.modalContainer}>
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={modalStyles.keyboardAvoidingView}
        >
          <ScrollView contentContainerStyle={modalStyles.scrollViewContent}>
        <View style={modalStyles.modalContent}>
          <TouchableOpacity style={modalStyles.closeIcon} onPress={onClose}>
            <Icon size={20} color='#fff' name='close' iconFamily='Ionicons' />
          </TouchableOpacity>

        <Text style={modalStyles.title}> Login for best experience</Text>
        <Text style={modalStyles.subTitle}> Enter Your Phone Number to proceed</Text>

        <TextInput
         style={modalStyles.input}
         placeholder='Enter Your Number'
         value={number}
         maxLength={10}
         onChangeText={setNumber}
         keyboardType='number-pad'
         placeholderTextColor={'#ccc'}
         />
         <TextInput
         style={modalStyles.textareainput}
         placeholder='Enter Your address here'
         value={address}
         textAlignVertical='top'
         multiline
         placeholderTextColor={'#ccc'}
         onChangeText={setAddress}
         />

         <View style={modalStyles.buttonContainer}>
            <TouchableOpacity style={modalStyles.button} onPress={handleLogin}>
              <Text style={modalStyles.buttonText}>{!user ? "Login":"Save"}</Text>
            </TouchableOpacity>

            {user && 
            <TouchableOpacity onPress={handleLogin}style={[modalStyles.button,{backgroundColor:"transparent",borderColor:Colors.active,borderWidth:1}]}>
              <Text style={[modalStyles.buttonText, {color:Colors.active}]}> Logout </Text>
              </TouchableOpacity>
            }
         </View>

        </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default LoginModal