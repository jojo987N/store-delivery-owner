import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Categories from "../screens/Categories";
import UpdateCategory from "../screens/UpdateCategory";
import Products from "../screens/Products";
import AddProduct from "../screens/AddProduct";
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

const ProductStack = createStackNavigator();

export function ProductNavigator() {
  return (
    <ProductStack.Navigator>
      <ProductStack.Screen
        name="Products"
        component={Products}
        options={{ headerShown: false }}
      />

      <ProductStack.Screen
        name="AddProduct"
        component={AddProduct}
        options={{ headerShown: true }}
      />
    </ProductStack.Navigator>
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
