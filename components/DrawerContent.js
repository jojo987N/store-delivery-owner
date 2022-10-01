import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import { Avatar, Icon } from 'react-native-elements'
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { RestaurantContext } from '../context/RestaurantContext'

export default function DrawerContent(props) {
    const { restaurantData } = useContext(RestaurantContext)
    const [isSignedIn, setIsSignedIn] = useState(true)
    const navigation = useNavigation()
    const signOutUser = () => {
        AsyncStorage.getAllKeys().then(k => AsyncStorage.multiRemove(k))
            .then(() => {
                signOut(auth)
                    .then(() => {
                        navigation.navigate('SignIn')
                    })
            })
    }
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: 20,
                }}>
                    <Avatar
                        rounded
                        avatarStyle={styles.avatar}
                        size={75}
                        source={{ uri: restaurantData.image }} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 18,
                        }}>{restaurantData.name}</Text>
                        <Text style={{
                            fontSize: 14,
                        }}>{
                                restaurantData.address
                            }</Text>
                    </View>
                </View>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    avatar: {
        borderWidth: 4,
        borderColor: "white",
    }
})