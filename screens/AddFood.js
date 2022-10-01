import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Image,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { addFood, addProduct, getCategories } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { CheckBox } from "react-native-elements";
import AddInput from "../components/AddInput";
import { AntDesign } from "@expo/vector-icons";
import Size from "../components/Size";
import { openImagePickerAsync } from "../utils";
import { FoodsContext } from "../context/FoodsContext";
import SelectDropdown from "react-native-select-dropdown";
import { RestaurantContext } from "../context/RestaurantContext";

export default function AddFood() {
  const { restaurantData } = useContext(RestaurantContext);
  const { foods, setFoods } = useContext(FoodsContext);
  const [categories, setCategories] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [dPrice, setDPrice] = useState();
  const [size, setSize] = useState({
    small: "",
    middle: "",
    big: "",
  });
  const navigation = useNavigation();
  const [inputs, setInputs] = useState([]);
  const [image, setImage] = useState();
  const [url, setUrl] = useState();
  const [category, setCategory] = useState();
  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Image
          source={
            image ? { uri: image } : require("../assets/images/dishes.png")
          }
          style={styles.image}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Name"
          style={styles.inputText}
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Description"
          style={styles.inputText}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ ...styles.inputView, width: 150 }}>
          <TextInput
            placeholder="Price"
            style={styles.inputText}
            value={price}
            onChangeText={(text) => setPrice(text)}
          />
        </View>
        <View style={{ ...styles.inputView, width: 150 }}>
          <TextInput
            placeholder="Discounted Price"
            style={styles.inputText}
            value={dPrice}
            onChangeText={(text) => setDPrice(text)}
          />
        </View>
      </View>

      <View style={styles.inputView}>
        {categories ? (
          <SelectDropdown
            data={categories
              .filter((category) => category.type)
              .map((category) => category.name)}
            onSelect={(selectedItem, index) => {
              setCategory(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            defaultButtonText="Select Category"
            buttonStyle={{ width: "100%" }}
          />
        ) : (
          <></>
        )}
      </View>

      <Size
        title="Size"
        inputs={inputs}
        setInputs={setInputs}
        size={size}
        setSize={setSize}
      />
      <View style={{ marginVertical: 30, marginHorizontal: 20, marginTop: 20 }}>
        <Button
          title="Pick an image from camera roll"
          onPress={() => openImagePickerAsync(setImage, setUrl)}
          color="#841584"
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Add"
          onPress={() => {
            if (url)
              addFood(
                name,
                description,
                url,
                price,
                dPrice,
                size,
                category,
                restaurantData.id
              )
                .then(() =>
                  setFoods([
                    ...foods,
                    {
                      name,
                      description,
                      image: url,
                      price,
                      size,
                      category,
                      restaurantId: restaurantData.id,
                    },
                  ])
                )
                .then(() => navigation.navigate("Foods"));
          }}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    overflow: "hidden",
    borderRadius: 100 / 2,
  },
  addons: {
    marginHorizontal: 20,
    marginVertical: 20,
    flexDirection: "row",
  },
  inputView: {
    marginTop: 20,
    borderWidth: 0.3,
    borderColor: "grey",
    marginHorizontal: 20,
  },
  inputText: {
    padding: 10,
    fontSize: 17,
  },
  button: {
    marginTop: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
});
