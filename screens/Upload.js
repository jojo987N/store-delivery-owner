import { View, Text, SafeAreaView, StatusBar, Pressable, Image, TouchableOpacity} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import BottomSheet from 'reanimated-bottom-sheet'
import Animated from "react-native-reanimated";
import {useRef, useState} from 'react'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker"
import * as Permissions from 'expo-permissions'
import {Camera} from "expo-camera"
import { updateProduct } from "../firebase"
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage'

export default function Upload({route}) {

    const {product_id} = route.params
    const uploadImage = async (uri)=>{
    const response = await fetch(uri)
    const blob = await response.blob()
    const storage = getStorage();
    const storageRef = ref(storage, 'restaurant/bonmange');

    getDownloadURL(storageRef) 
    .then(url=> updateProduct(product_id,url))
  }
  const blobFromUrl = async (uri)=>{
   const response = await fetch(uri)
   const blob = await response.blob()
  }
  const getBlobFromUri = (uri)=>{
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = ()=>{
      console.log(xhr.response)
    }
    xhr.responseType = "blob";
    xhr.open("GET", uri, true)
    xhr.send()
  }
  const [image, setImage] = useState(null) 
  const getPermissionAsync = async ()=>{
    const {status} = await Camera.requestCameraPermissionsAsync();
  }
  let openImagePickerAsync = async ()=>{
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(permissionResult.granted === false){
    alert("Permission to acces camera roll is required")
    return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync()
   console.log(pickerResult)
   if(pickerResult.cancelled === true) return;
  uploadImage(pickerResult.uri)
   setImage(pickerResult.uri)
  }
  const pickImage = async () =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result)
  }
  const renderContent = ()=>(
    <View style={{
      backgroundColor: "white",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      elevation: 5,
    }}>
        <View style={{
        marginTop: 30
      }}> 
        <Text style={{
          textAlign: "center",
          fontSize: 20,
          fontWeight: "bold"
        }}>Upload Photo</Text>
      </View>
       <TouchableOpacity  onPress={
        ()=>openImagePickerAsync()
      }> 
      <View style={{
        marginTop: 30,
        backgroundColor:"red",
        marginHorizontal: 20,
        borderRadius: 10
      }}> 
        <Text style={{
          textAlign: "center",
          fontSize: 15,
          fontWeight: "bold",
          padding: 10,
          color: "white"
        }}>Take a Photo</Text>
      </View>
      </TouchableOpacity>
      <View style={{
        marginTop: 10,
        backgroundColor:"red",
        marginHorizontal: 20,
        borderRadius: 10
      }}> 
        <Text style={{
          textAlign: "center",
          fontSize: 15,
          fontWeight: "bold",
          padding: 10,
          color: "white"
        }}>Choose From Library</Text>
      </View>
      <View style={{
        marginTop: 10,
        backgroundColor:"red",
        marginHorizontal: 20,
        borderRadius: 10,
        marginBottom: 20
      }}> 
        <Text style={{
          textAlign: "center",
          fontSize: 15,
          fontWeight: "bold",
          padding: 10,
          color: "white",
        }}>Cancel</Text>
      </View>
    </View>
  )
   const bs = useRef()
  return (
    <GestureHandlerRootView style={{
      backgroundColor: "#eee",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}>
      <BottomSheet 
      ref={bs}
      snapPoints={[450, 300, 0]}
      renderContent={renderContent}
            />
      <Text>Upload Image</Text>
      <View style={{
      }}>
        {image?(<Image source={{uri: image}} 
        style={{
          width: 400,
          height:400,
          alignSelf: "flex-start",
          resizeMode: "contain"
        }}/>):(<></>)}
      </View>
      <Pressable style={{marginTop: 10}}
      onPress={
        ()=>bs.current.snapTo(0)
      }
      >
           <AntDesign name="pluscircle" size={24} color="black" />
        </Pressable>
    </GestureHandlerRootView>
  );
}
