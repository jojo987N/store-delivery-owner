import { View, Text} from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

export const ArrowBack = (props)=>{
    return (
      <View style={{}}>
      <AntDesign 
        name="arrowleft"
        color="black"
        size={25}
        onPress={()=>props.navigation.goBack()}
      />
  </View>
    )
  }