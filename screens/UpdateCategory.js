import { View, Text, TextInput, Button} from 'react-native'
import React from 'react'

export default function UpdateCategory() {
  return (
    <View>
        <View style={{
            
            marginHorizontal: 20,
            borderRadius: 10,
            borderColor: "grey",
            borderWidth: 0.5,
            marginTop: 0,
        }}>
           <TextInput
           placeholder="Restaurant Name"
           style={{
               width: "90%",
               
               padding: 10,
               marginLeft: 5,
               }}/>
        </View>
         <View style={{marginTop: 20,
          marginHorizontal: 20,
           }}>
             <Button title='Update' />
             </View>
    </View>
  )
}