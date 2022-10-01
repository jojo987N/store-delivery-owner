import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Settings from "../screens/Settings";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  Entypo,
  AntDesign,
} from "@expo/vector-icons";
import Categories from "../screens/Categories";
import Orders from "../screens/Orders";
import Foods from "../screens/Foods";
import { CategoriesNavigator, FoodNavigator, OrdersNavigator } from "./Staks";
import Dashboard from "../screens/Dashboard";
import SignIn from "../screens/authScreens/SignIn";
import DrawerContent from "../components/DrawerContent";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <DrawerContent {...props} />}
      useLegacyImplementation={true}
    >
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: "Dashboard",
          headerShown: false,
          drawerIcon: ({ focussed, size }) => (
            <FontAwesome name="dashboard" color="black" size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="OrdersScreen"
        component={Orders}
        initialParams={{ orderStatus: "all" }}
        options={{
          title: "Orders",
          headerShown: false,
          drawerIcon: ({ focussed, size }) => (
            <FontAwesome name="list-alt" color="black" size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="newOrders"
        component={Orders}
        initialParams={{ orderStatus: "new" }}
        options={{
          title: "New Orders",
          headerShown: false,
          drawerIcon: ({ focussed, size }) => (
            <FontAwesome name="list-alt" color="black" size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="OrdersInProgress"
        component={Orders}
        initialParams={{ orderStatus: "ordersInProgress" }}
        options={{
          title: "Orders in progress",
          headerShown: false,
          drawerIcon: ({ focussed, size }) => (
            <FontAwesome name="list-alt" color="black" size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="ReadyForPickup"
        component={Orders}
        initialParams={{ orderStatus: "readyForPickup" }}
        options={{
          title: "Ready for Pickup",
          headerShown: false,
          drawerIcon: ({ focussed, size }) => (
            <FontAwesome name="list-alt" color="black" size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="CategoriesNavigator"
        component={CategoriesNavigator}
        options={{
          title: "Categories",

          drawerIcon: ({ focussed, size }) => (
            <MaterialIcons name="category" color="black" size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="FoodsScreen"
        component={FoodNavigator}
        options={{
          title: "Foods",
          headerShown: false,
          drawerIcon: ({ focussed, size }) => (
            <Ionicons name="fast-food" color="black" size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Settings",
          headerShown: true,
          drawerIcon: ({ focussed, size }) => (
            <Ionicons name="settings" color="black" size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="SignOut"
        initialParams={{ param: "SignOut" }}
        component={SignIn}
        options={{
          title: "Sign out",
          headerShown: false,
          drawerIcon: ({ focussed, size }) => (
            <Entypo name="log-out" color="black" size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
