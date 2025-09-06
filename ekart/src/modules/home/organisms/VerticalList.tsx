import { View, Text, StyleSheet, Pressable, FlatList, Image } from 'react-native'
import React, { FC } from 'react'
import { FONTS, screenHeight, screenWidth } from '@utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'
import Icon from '@components/atoms/Icon'
import { navigate } from '@navigation/NavigationUtil'

const VerticalList: FC<{ data:any }> = ({data}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.absoluteView,{backgroundColor:data?.bgColor}]} />

     <Text style={styles.headingText}>
        {data?.title}
     </Text>

    <Pressable style={[styles.button,{backgroundColor:data?.btnColor}]}>
        <Text style={styles.text}>
            Explore More
        </Text>
        <Icon size={16} name='arrow-forward-sharp' iconFamily='Ionicons' color='#fff'/>
    </Pressable>

    <FlatList
    data={data?.data}
    numColumns={2}
    keyExtractor={(item)=>item.id}
    renderItem={({item})=>(
        <Pressable style={styles.itemContainer} onPress={()=>navigate('Categories')}>
            <Image source={{uri:item?.image_uri}} style={styles.image} />
        <Text style={styles.productText}>
            {item?.title}
        </Text>
        <Text style={styles.subTitle}>
            {item?.subTitle}
        </Text>
        </Pressable>
    )}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={styles.contentContainer}
    />

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 10,
        backgroundColor: '#000000',
    },
    absoluteView: {
        width: screenWidth,
        height: 180,
        position: 'absolute',
        top: 0,
        zIndex: -1
    },
    headingText: {
        fontSize: RFValue(16),
        fontFamily: FONTS.heading,
        color: "#222"
    },
    button: {
        padding: 10,
        paddingHorizontal: 18,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        gap: 10,
        borderRadius: 30,
        marginVertical: 10
    },
    text: {
        fontWeight: '400',
        color: '#fff',
        fontSize: RFValue(12)
    },
    itemContainer: {
       width: '48%',
       margin: 5,
       height: 220,
       marginBottom: 20,
       alignSelf: 'flex-start'
    },
    image: {
        width: '100%',
        height: 180,
        resizeMode: 'cover'
    },
    productText: {
        fontSize: RFValue(14),
        color: '#222',
        marginTop: 4,
        fontFamily: FONTS.heading,
    },
    subTitle: {
        fontSize: RFValue(10),
        color: '#666',
        fontWeight: '400',
    },
    contentContainer: {
        paddingBottom: 10,
    },
})

export default VerticalList