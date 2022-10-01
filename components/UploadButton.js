import { View, Text, Pressable, StyleSheet, TouchableOpacity} from 'react-native'
import React, {useRef, useState}from 'react'
import { AntDesign } from '@expo/vector-icons'
import BottomSheet from 'reanimated-bottom-sheet'


export default function UploadButton() {
     
    const bs = useRef()
    const [image, setImage] = useState(null) 

    const renderContent = ()=>(
        <View style={styles.renderContainer}>
             
            <View style={styles.buttonBottomSheet}> 
            <Text style={styles.textButtonBottomShet}>Upload Photo</Text>
          </View>
           
           <TouchableOpacity  onPress={
            ()=>openImagePickerAsync()
          }> 
          <View style={styles.buttonBottomSheet}> 
            <Text style={styles.textButtonBottomShet}>Take a Photo</Text>
          </View>
          </TouchableOpacity>
          <View style={styles.buttonBottomSheet}> 
            <Text style={styles.textButtonBottomShet}>Choose From Library</Text>
          </View>
          <View style={styles.buttonBottomSheet}> 
            <Text style={styles.textButtonBottomShet}>Cancel</Text>
          </View>
          
        </View>
        
      )
       
  return (
      <View style={{
        justifyContent: "center", borderWidth: 1}}>

<View >
        {image?(<Image source={{uri: image}} 
        style={styles.image}/>):(<></>)}


      </View>

          <Pressable style={{ marginBottom: 50 }} onPress={() => bs.current.snapTo(0)}>
              <AntDesign name="pluscircle" size={24} color="black" />
          </Pressable>

          <BottomSheet
              ref={bs}
              snapPoints={[300, 0, 0]}
              initialSnap={1}
              renderContent={renderContent}
          />

      </View>
  )
}

const styles = StyleSheet.create({

    image: {
        width: 50,
        height:50,
        resizeMode: "contain"
      },
    renderContainer: {
          
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 5,
         
      },

    buttonBottomSheet: {
        marginTop: 10,
        backgroundColor:"red",
        marginHorizontal: 20,
        borderRadius: 10,
        marginBottom: 20
      },
    textButtonBottomShet :{
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold",
        padding: 10,
        color: "white",
      }
})