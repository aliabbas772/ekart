import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import AutoScroll from '@homielab/react-native-auto-scroll'
import Icon from '@components/atoms/Icon'
import { slipData } from '@utils/db'

const FlimSlip = () => {
  return (
    <View>
      <AutoScroll style={styles.container} endPaddingWidth={0} duration={14000} >
      <View style={styles.container}>
        {slipData?.map((item,index)=>(
          <View key={index} style={styles.gridItem}>
            <Text style={styles.gridText}>
              {"   "}{item}
            </Text>
            <Text style={styles.gridTextStar}>
              {"   "}
            </Text>
            <Icon name='star-four-points' iconFamily='MaterialCommunityIcons' color='#888' size={18}/>
            </View>
        ))}
      </View>
      </AutoScroll>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        width: "100%"
        
    },
    gridContainer: {
        flexDirection: "row",
        alignItems: 'center'
    },
    gridItem: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#000",
        flexDirection: 'row',
    },
    gridText: {
        fontSize:RFValue(12),
        color: "#fff",
        textAlign: "center",
        fontWeight: "500"
    },
    gridTextStar: {
        fontSize:RFValue(12),
        color: "#fff",
        textAlign: "center",
        fontWeight: "500"
    }
})

export default FlimSlip