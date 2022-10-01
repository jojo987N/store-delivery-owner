 import { View, Text, StatusBar, SafeAreaView} from 'react-native'
 import React from 'react'
import RootNavigation from './navigation'
 
 export default function App() {
   return (
    <SafeAreaView style={{
       paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      backgroundColor: "#eee",
      flex: 1
    }}>

     <RootNavigation />

    </SafeAreaView>
   )
 }