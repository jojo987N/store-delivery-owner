import { View, Text, TextInput, StyleSheet, Button, Image, Pressable} from 'react-native'
import React, {useContext, useEffect, useRef, useState} from 'react'
import { addCategory, addProduct } from '../firebase'
import { useNavigation } from '@react-navigation/native';
import PickImage from '../components/PickImage';
import { RestaurantContext } from '../context/RestaurantContext';
import BottomSheet from 'reanimated-bottom-sheet'
import { CategoriesContext } from '../context/CategoriesContext';

export default function AddCategory() {
    const {restaurantData} = useContext(RestaurantContext)
    const {categories, setCategories} = useContext(CategoriesContext)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const navigation = useNavigation()
    const [image, setImage] = useState()
    const [url, setUrl] = useState()
    const bs = useRef()
    useEffect(()=>{
      bs.current.snapTo(2)
    }, [])
  return (
    <>
    <View style={{marginTop: 20}}>
      <Pressable 
      onPress={()=>  bs.current.snapTo(0) }
      style={styles.imageContainer}>
        <Image source={{uri: image}} style={styles.image} />
      </Pressable>
      <View style={styles.inputView}>
          <TextInput
          placeholder='Name'
          style={styles.inputText}
          value={name}
          onChangeText={(text)=>setName(text)}/>
      </View>
      <View style={styles.inputView}>
          <TextInput
          placeholder='Description'
          style={styles.inputText}
          value={description}
          onChangeText={(text)=>setDescription(text)}/>
      </View>
       <View style={{marginVertical: 30, marginHorizontal: 20, marginTop: 40}}>
        <Button title="Pick an image from camera roll" onPress={()=> bs.current.snapTo(0) } color="#841584"/>
      </View>
      <View style={{marginTop: 20,
          marginHorizontal: 20,
           }}>
             <Button title='Add' onPress={
                 ()=>{
                    addCategory(name, description, url, restaurantData.id)
                    .then(()=> setCategories([
                      ...categories,
                       {
                         name,
                         description,
                         image: url,
                         id: restaurantData.id
                       }
                    ]))
                 }
             }/>
             </View>
    </View>
    <BottomSheet 
        ref={bs}
        snapPoints={["35%","90%", 0]}
        renderContent={PickImage(setImage, setUrl)}
              />
    </>
  )
}
const styles = StyleSheet.create({
    imageContainer: { 
      alignItems: "center", 
    },
    image: {
      width: 100, 
      height: 100,
      overflow: 'hidden',
      borderRadius: 100 / 2,
    },
    inputView : {
      marginTop: 40,
      borderWidth: 0.3,
      borderColor: "grey",
      marginHorizontal: 20
    },
    inputText:{
     padding : 10,
     fontSize: 17
    }
})