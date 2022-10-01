import { View, Text } from 'react-native'
import React from 'react'
import {GooglePlacesAutocomplete}  from 'react-native-google-places-autocomplete'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign' 
import { apikey } from '../global'

export default function SearchBar({searchbar, cityHandler, style, setAddress, setCity}) {
  return (
    <View style={{marginTop: 15, flexDirection: "row"}}>
      <GooglePlacesAutocomplete 
      ref={searchbar}
      query={{ 
        key: apikey,
        language: 'en',
      }}
      fetchDetails
      onPress={(data, details=null)=>{
          const city = data.description.split(',')[0];
          if(!style)
          cityHandler(city)
          if(style){
          setAddress({
            description: data.description,
            location: details?.geometry?.location
          })
          setCity(city)
        }
      }}
      placeholder={!style?"Search":"Address"}
      styles={{
        textInput :{
            backgroundColor: !style?'#eee':style.backgroundColor,
            borderRadius : 20,
            fontWeight: "700",
            marginTop: 7,
        },
        textInputContainer:{
            backgroundColor: !style?'#eee':style.backgroundColor,
            borderRadius: !style?50:0,
            flexDirection: "row",
            alignItems: "center",
            ...style?{borderBottomWidth: style.borderBottomWidth, borderBottomColor: style.borderBottomColor}:{}
        }  
          }}
          renderLeftButton={()=>(
            <View style={{marginLeft: 10}}>
                <Ionicons name="location-sharp" size={24} />
            </View>
          )} 
          renderRightButton={!style?()=>(
          <View style={{
             flexDirection: "row",
             marginRight: 8,
             backgroundColor:"white",
             padding: 9,
             borderRadius: 30,
             alignItems: "center",
          }}>
              <AntDesign name='clockcircle' size={11}
               style={{marginRight: 6}}/>
              <Text>Search</Text>
          </View>
          ):()=>{}}
          textInputProps={{
            defaultInputValue: "bonjour",
          }}/>
    </View>
  )
}