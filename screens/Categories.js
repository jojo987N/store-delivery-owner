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
  addCategoryStore,
  categoriesCol,
  categoriesStoresCol,
  deleteCategoriesStores,
  getCategories,
  getCategoriesStores,
} from "../firebase";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MenuNavigation from "../components/MenuNavigation";
import Loading from "../components/Loading";
import { CategoriesContext } from "../context/CategoriesContext";
import { StoreContext } from "../context/StoreContext";
import { onSnapshot } from "firebase/firestore";

export default function Categories({ navigation }) {
  const { categories, setCategories } = useContext(CategoriesContext);
  const { storeData } = useContext(StoreContext);
  const [addButtons, setAddButtons] = useState();
  const [categoriesStores, setCategoriesStores] = useState();
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

    const unsuscribe = onSnapshot(categoriesStoresCol, (snapshot) => {
      const c = [];
      snapshot.docs.forEach((doc) => {
        c.push({ ...doc.data(), id: doc.id });
      });
      setCategoriesStores(c);
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
          {categories && addButtons && categoriesStores ? (
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
                          !categoriesStores.some(
                            (categorieStore) =>
                              categorieStore.categoryId === category.id &&
                              categorieStore.storeId ===
                                storeData.id
                          )
                        ) {
                          addCategoryStore(
                            category.id,
                            storeData.id
                          ).then((res) => {});
                        } else {
                          deleteCategoriesStores(
                            category.id,
                            storeData.id
                          ).then(() => {});
                        }
                      }}
                      style={{
                        ...styles.addButton,
                        backgroundColor: categoriesStores.some(
                          (categorieStore) =>
                            categorieStore.categoryId === category.id &&
                            categorieStore.storeId ===
                              storeData.id
                        )
                          ? "red"
                          : addButtons[index].backgroundColor,
                      }}
                    >
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        {categoriesStores.some(
                          (categorieStore) =>
                            categorieStore.categoryId === category.id &&
                            categorieStore.storeId ===
                              storeData.id
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
