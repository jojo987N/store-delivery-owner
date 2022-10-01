import { AntDesign } from '@expo/vector-icons'
import { useState } from 'react'
import { TextInput, TouchableOpacity, View, StyleSheet, Text } from 'react-native'

const Size = ({ title, size, setSize }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Small</Text>
                <View style={styles.input}>
                    <TextInput placeholder='Price' style={styles.textInput} keyboardType="numeric"
                    value={size.small}
                     onChangeText={(text) => {
                       setSize({
                           ...size,
                           small: text
                       })
                      }}
                    />
                </View>
            </View>
            <View style={styles.inputContainer}>
            <Text style={styles.label}>Middle</Text>
                <View style={styles.input}>
                    <TextInput placeholder='Amount' style={styles.textInput} keyboardType="numeric"
                    value={size.middle}
                     onChangeText={(text) => {
                        setSize({
                            ...size,
                            middle: text
                        })
                      }}
                    />
                </View>
            </View>
            <View style={styles.inputContainer}>
            <Text style={styles.label}>Big</Text>
                <View style={styles.input}>
                    <TextInput placeholder='Amount' style={styles.textInput} keyboardType="numeric"
                    value={size.big}
                     onChangeText={(text) => {
                        setSize({
                            ...size,
                            big: text
                        })
                      }}
                    />
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 25,
        marginTop: 10,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        fontSize: 25,
        fontWeight: "bold"
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    label: {
      fontSize: 15,
      fontWeight: "bold",
      textAlign: "center",
      marginRight: 5,
      width: 100,
    },
    input: {
        backgroundColor: "white",
        borderBottomWidth: 0.7,
        borderBottomColor: "grey",
        marginVertical: 10,
        width: 100
    },
    textInput: {
        padding: 5,
        paddingHorizontal: 10
    },
})
export default Size