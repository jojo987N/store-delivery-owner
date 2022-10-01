import { View, Text,} from 'react-native'
import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Home from '../screens/Settings';
import DrawerNavigator from './DrawerNavigator';
import UpdateCategory from '../screens/UpdateCategory';
import { CategoriesNavigator, OrdersNavigator } from './Staks';
import SignIn from '../screens/authScreens/SignIn';
import Upload from '../screens/Upload';
import { RestaurantContext } from '../context/RestaurantContext';
import OrderDetails from '../screens/OrderDetails';
import SignUp from '../screens/authScreens/SignUp';
import { CategoriesContextProvider } from '../context/CategoriesContext';
import { FoodsContextProvider } from '../context/FoodsContext';
import OrderReadyDetails from '../components/OrderReadyDetails';

export default function RootNavigation() {
    const Stack = createStackNavigator();
    const [restaurantData, setRestaurantData] = useState()
  return (
    <NavigationContainer>
      <RestaurantContext.Provider value={{restaurantData, setRestaurantData}}> 
        <CategoriesContextProvider> 
          <FoodsContextProvider> 
        <Stack.Navigator
         screenOptions={{headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignIn}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator}/>
        <Stack.Screen name="Upload" component={Upload}/>
        <Stack.Screen name="OrderReadyDetails" component={OrderReadyDetails}/>
        <Stack.Screen name="OrderDetails" component={OrderDetails}/>
        </Stack.Navigator>
        </FoodsContextProvider>
        </CategoriesContextProvider>
        </RestaurantContext.Provider>
    </NavigationContainer>
  )
}