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
import { StoreContext } from '../context/StoreContext';
import OrderDetails from '../screens/OrderDetails';
import SignUp from '../screens/authScreens/SignUp';
import { CategoriesContextProvider } from '../context/CategoriesContext';
import { ProductsContextProvider } from '../context/ProductsContext';
import OrderReadyDetails from '../components/OrderReadyDetails';

export default function RootNavigation() {
    const Stack = createStackNavigator();
    const [storeData, setStoreData] = useState()
  return (
    <NavigationContainer>
      <StoreContext.Provider value={{storeData, setStoreData}}> 
        <CategoriesContextProvider> 
          <ProductsContextProvider> 
        <Stack.Navigator
         screenOptions={{headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignIn}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator}/>
        <Stack.Screen name="Upload" component={Upload}/>
        <Stack.Screen name="OrderReadyDetails" component={OrderReadyDetails}/>
        <Stack.Screen name="OrderDetails" component={OrderDetails}/>
        </Stack.Navigator>
        </ProductsContextProvider>
        </CategoriesContextProvider>
        </StoreContext.Provider>
    </NavigationContainer>
  )
}