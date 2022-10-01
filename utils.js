import BottomSheet from 'reanimated-bottom-sheet'
import { useRef } from 'react'
import * as ImagePicker from "expo-image-picker"
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

const uploadImage = async (uri, setUrl) => {
  const response = await fetch(uri)
  const blob = await response.blob()
  const storage = getStorage();
  const storageRef = ref(storage, uri.substring(uri.lastIndexOf('/') + 1));
  await uploadBytes(storageRef, blob)
  const url = await getDownloadURL(storageRef)
  setUrl(url)
}
export const openImagePickerAsync = async (setImage, setUrl) => {
  let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (permissionResult.granted === false) {
    alert("Permission to acces camera roll is required")
    return;
  }
  let pickerResult = await ImagePicker.launchImageLibraryAsync()
  console.log(pickerResult)
  if (pickerResult.cancelled === true) return;
  uploadImage(pickerResult.uri, setUrl)
  setImage(pickerResult.uri)
}
