import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { foodsCol, getFoods } from "../firebase";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MenuNavigation from "../components/MenuNavigation";
import Loading from "../components/Loading";
import { FoodsContext } from "../context/FoodsContext";
import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import { RestaurantContext } from "../context/RestaurantContext";

export default function Foods() {
  const { restaurantData } = useContext(RestaurantContext);
  const { foods, setFoods } = useContext(FoodsContext);
  const navigation = useNavigation();

  useEffect(() => {
    const unsuscribe = onSnapshot(foodsCol, (snapshot) => {
      let foods = [];

      snapshot.docs
        .filter((doc) => doc.data().restaurantId === restaurantData.id)
        .forEach((doc) => {
          foods.push({ ...doc.data(), id: doc.id });
        });

      setFoods(foods);
    });
  }, []);
  return (
    <>
      <View>
        <View style={styles.header}>
          <MenuNavigation navigation={navigation} />
          <Text style={styles.title}>Foods</Text>
        </View>
        <ScrollView>
          {foods ? (
            <View>
              {foods.map((food, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      borderBottomWidth: 0.5,
                      padding: 30,

                      flexDirection: "row",
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Image
                        style={styles.image}
                        source={{ uri: food.image }}
                      />
                    </View>
                    <View style={{ flex: 2 }}>
                      <Text
                        style={{
                          fontSize: 20,
                        }}
                      >
                        {food.name}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          ) : (
            <Loading />
          )}
        </ScrollView>
      </View>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          margin: 30,
        }}
        onPress={() => navigation.navigate("AddFood")}
      >
        <AntDesign name="pluscircle" size={44} color="blue" />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    marginLeft: 10,
  },
  title: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    height: 40,
    aspectRatio: 1,
    borderRadius: 40,
  },
});
