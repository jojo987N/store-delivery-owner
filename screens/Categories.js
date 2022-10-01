import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  addCategoryRestaurant,
  categoriesCol,
  categoriesRestaurantsCol,
  deleteCategoriesRestaurants,
  getCategories,
  getCategoriesRestaurants,
} from "../firebase";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MenuNavigation from "../components/MenuNavigation";
import Loading from "../components/Loading";
import { CategoriesContext } from "../context/CategoriesContext";
import { RestaurantContext } from "../context/RestaurantContext";
import { onSnapshot } from "firebase/firestore";

export default function Categories({ navigation }) {
  const { categories, setCategories } = useContext(CategoriesContext);
  const { restaurantData } = useContext(RestaurantContext);
  const [addButtons, setAddButtons] = useState();
  const [categoriesRestaurants, setCategoriesRestaurants] = useState();
  useEffect(() => {
    onSnapshot(categoriesCol, (snapshot) => {
      let _categories = snapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
      setCategories(_categories);
      setAddButtons(
        new Array(_categories.length).fill({
          text: "Add",
          backgroundColor: "blue",
        })
      );
    });

    const unsuscribe = onSnapshot(categoriesRestaurantsCol, (snapshot) => {
      const c = [];
      snapshot.docs.forEach((doc) => {
        c.push({ ...doc.data(), id: doc.id });
      });
      setCategoriesRestaurants(c);
    });
  }, []);
  return (
    <>
      <View>
        <View style={styles.header}>
          <MenuNavigation navigation={navigation} />
          <Text style={styles.title}>Categories</Text>
        </View>
        <ScrollView>
          {categories && addButtons && categoriesRestaurants ? (
            <View>
              {categories.map((category, index) => {
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
                        source={{ uri: category.image }}
                      />
                    </View>
                    <View style={{ flex: 2 }}>
                      <Text
                        style={{
                          fontSize: 20,
                        }}
                      >
                        {category.name}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        if (
                          !categoriesRestaurants.some(
                            (categorieRestaurant) =>
                              categorieRestaurant.categoryId === category.id &&
                              categorieRestaurant.restaurantId ===
                                restaurantData.id
                          )
                        ) {
                          addCategoryRestaurant(
                            category.id,
                            restaurantData.id
                          ).then((res) => {});
                        } else {
                          deleteCategoriesRestaurants(
                            category.id,
                            restaurantData.id
                          ).then(() => {});
                        }
                      }}
                      style={{
                        ...styles.addButton,
                        backgroundColor: categoriesRestaurants.some(
                          (categorieRestaurant) =>
                            categorieRestaurant.categoryId === category.id &&
                            categorieRestaurant.restaurantId ===
                              restaurantData.id
                        )
                          ? "red"
                          : addButtons[index].backgroundColor,
                      }}
                    >
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        {categoriesRestaurants.some(
                          (categorieRestaurant) =>
                            categorieRestaurant.categoryId === category.id &&
                            categorieRestaurant.restaurantId ===
                              restaurantData.id
                        )
                          ? "Remove"
                          : addButtons[index].text}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          ) : (
            <Loading />
          )}
        </ScrollView>
      </View>
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
  addButton: {
    justifyContent: "center",
    width: 100,
    height: 50,
    alignItems: "center",
    borderRadius: 10,
  },
});
