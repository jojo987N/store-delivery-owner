import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Categories from "../screens/Categories";
import UpdateCategory from "../screens/UpdateCategory";
import Foods from "../screens/Foods";
import AddFood from "../screens/AddFood";
import Orders from "../screens/Orders";
import OrderDetails from "../screens/OrderDetails";

import OrderReadyDetails from "../components/OrderReadyDetails";
import AddCategory from "../screens/AddCategory";
import { CategoriesContextProvider } from "../context/CategoriesContext";

const CategoriesStack = createStackNavigator();

export function CategoriesNavigator() {
  return (
    <CategoriesStack.Navigator>
      <CategoriesStack.Screen
        name="Categories"
        component={Categories}
        options={{ headerShown: false }}
      />

      <CategoriesStack.Screen
        name="AddCategory"
        component={AddCategory}
        options={{ title: "Add Category", headerShown: true }}
      />
    </CategoriesStack.Navigator>
  );
}

const FoodStack = createStackNavigator();

export function FoodNavigator() {
  return (
    <FoodStack.Navigator>
      <FoodStack.Screen
        name="Foods"
        component={Foods}
        options={{ headerShown: false }}
      />

      <FoodStack.Screen
        name="AddFood"
        component={AddFood}
        options={{ headerShown: true }}
      />
    </FoodStack.Navigator>
  );
}

const OrdersStack = createStackNavigator();

export function OrdersNavigator() {
  return (
    <OrdersStack.Navigator>
      <OrdersStack.Screen
        name="Orders"
        component={Orders}
        options={{ headerShown: false, headerLeft: null }}
      />

      <OrdersStack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{ headerShown: true }}
      />

      <OrdersStack.Screen
        name="OrderReadyDetails"
        component={OrderReadyDetails}
        options={{ headerShown: false }}
      />
    </OrdersStack.Navigator>
  );
}
