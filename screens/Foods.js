import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { productsCol, getProducts } from "../firebase";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MenuNavigation from "../components/MenuNavigation";
import Loading from "../components/Loading";
import { ProductsContext } from "../context/ProductsContext";
import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import { RestaurantContext } from "../context/RestaurantContext";

export default function Products() {
  const { storeData } = useContext(RestaurantContext);
  const { products, setProducts } = useContext(ProductsContext);
  const navigation = useNavigation();

  useEffect(() => {
    const unsuscribe = onSnapshot(productsCol, (snapshot) => {
      let products = [];

      snapshot.docs
        .filter((doc) => doc.data().restaurantId === storeData.id)
        .forEach((doc) => {
          products.push({ ...doc.data(), id: doc.id });
        });

      setProducts(products);
    });
  }, []);
  return (
    <>
      <View>
        <View style={styles.header}>
          <MenuNavigation navigation={navigation} />
          <Text style={styles.title}>Products</Text>
        </View>
        <ScrollView>
          {products ? (
            <View>
              {products.map((product, index) => {
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
                        source={{ uri: product.image }}
                      />
                    </View>
                    <View style={{ flex: 2 }}>
                      <Text
                        style={{
                          fontSize: 20,
                        }}
                      >
                        {product.name}
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
        onPress={() => navigation.navigate("AddProduct")}
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
