import { View, Text, StyleSheet, Image } from 'react-native'
import React, { FC } from 'react'
import UniversalAdd from '@modules/products/atoms/UniversalAdd'
import { RFValue } from 'react-native-responsive-fontsize'

const OrderItems: FC<{ item: any }> = ({ item }) => {
  return (
    <View style={styles.flexRow}>
     <View style={styles.imageContainer}>
        <Image source={{ uri: item?.image_uri }} style={styles.img} />
        <UniversalAdd item={item} />
     </View>
     <View style={styles.itemContainer}>
        <Text style={styles.itemName}>{item?.name}</Text>
        <Text style={styles.itemDetails}>₹{item?.price} x {item?.quantity}</Text>
        <Text style={styles.itemTotal}>Total: ₹{item?.totalPrice}</Text>
     </View>
    </View>
  )
}

const styles = StyleSheet.create({
    flexRow: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 10,
        marginBottom: 15,
        borderBottomWidth: 5,
        paddingVertical: 10,
        borderColor: '#F0F2F5',
    },
    imageContainer: {
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        resizeMode: 'contain',
        borderWidth: 1,
        height: 90,
        width: '100%',
        borderColor: '#ccc',
        marginBottom: 10,
    },
    itemContainer: {    
        width: '70%',
    },
    itemName: {
        fontSize: RFValue(12),
        color: '#000',
        fontWeight: '500'
    },
    itemDetails: {
        fontSize: RFValue(10),
        color: '#666',
        marginTop: 4,
    },
    itemTotal: {
        fontSize: RFValue(12),
        color: '#000',
        fontWeight: '600',
        marginTop: 8,
    }
})

export default OrderItems