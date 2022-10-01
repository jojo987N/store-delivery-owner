import { View, Text, SafeAreaView, StatusBar, Pressable, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import BottomSheet from 'reanimated-bottom-sheet'
import Animated from "react-native-reanimated";
import { useContext, useEffect, useRef, useState } from 'react'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker"
import * as Permissions from 'expo-permissions'
import { Camera } from "expo-camera"
import { updateProduct, updateRestaurant } from "../firebase"
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import SettingsComponent from "../components/SettingsComponent";
import { RestaurantContext } from "../context/RestaurantContext";

export default function Upload({ route, navigation }) {
  const { restaurantData, setRestaurantData } = useContext(RestaurantContext)
  const uploadImage = async (uri) => {
    const response = await fetch(uri)
    const blob = await response.blob()
    const storage = getStorage();
    const storageRef = ref(storage, uri.substring(uri.lastIndexOf('/') + 1));
    await uploadBytes(storageRef, blob)
    const url = await getDownloadURL(storageRef)
    updateRestaurant(restaurantData.id, url)
  }
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to acces camera roll is required")
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync()
    console.log(pickerResult)
    if (pickerResult.cancelled === true) return;
    uploadImage(pickerResult.uri)
    setRestaurantData({
      ...restaurantData,
      image: pickerResult.uri
    })
  }
  const renderContent = () => (
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
      <TouchableOpacity onPress={
        () => openImagePickerAsync()
      }>
        <View style={{
          marginTop: 30,
          backgroundColor: "red",
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
        backgroundColor: "red",
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
        backgroundColor: "red",
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
  useEffect(() => {
    setTimeout(() => {
      bs.current.snapTo(2)
    }, 2000)
  }, [])
  return (
    <GestureHandlerRootView style={{
      backgroundColor: "#eee",
      flex: 1,
      alignItems: "center",
    }}>
      <BottomSheet
        ref={bs}
        snapPoints={["47%", "90%", 0]}
        renderContent={renderContent}
      />
      <View style={{
      }}>
      </View>
     
      <SettingsComponent bs={bs} />
    </GestureHandlerRootView>
  );
}
