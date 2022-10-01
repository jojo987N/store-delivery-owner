import { initializeApp } from 'firebase/app'
import {
  addDoc, getFirestore, collection, getDocs, doc, deleteDoc, orderBy, query, limit,
  where, onSnapshot, serverTimestamp, updateDoc, setDoc
} from 'firebase/firestore'
import { LogBox } from 'react-native';
import { getAuth } from 'firebase/auth';
LogBox.ignoreLogs(['Setting a timer'])
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core'])

const firebaseConfig = {

  apiKey: {/* Your firebase config here */ },

  authDomain: {/* Your firebase config here */ },

  projectId: {/* Your firebase config here */ },

  storageBucket: {/* Your firebase config here */ },

  messagingSenderId: {/* Your firebase config here */ },

  appId: {/* Your firebase config here */ },

  apiKey: "AIzaSyDgDMdmkB50rwTRdaMXL4fAdcgYksET2-s",
  authDomain: "store-delivery-43cb0.firebaseapp.com",
  projectId: "store-delivery-43cb0",
  storageBucket: "store-delivery-43cb0.appspot.com",
  messagingSenderId: "283406701144",
  appId: "1:283406701144:web:d05dbea3aded6c00d5b02d"


};
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp)
export const db = getFirestore()
export const restaurantsCol = collection(db, 'restaurants')
export const storesCol = collection(db, 'stores')
export const ordersCol = collection(db, 'orders')
export const categoriesRestaurantsCol = collection(db, 'categoriesRestaurants')
export const getOrders = (setOrders) => {
  const orders = []
  const unsuscribe = onSnapshot(ordersCol, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      if (doc.data().createdAt && doc.data().status === 'pending') {
        orders.push(doc.data())
      }
    })
    setOrders(orders)
  })
}
export const productsCol = collection(db, 'products')
export const foodsCol = collection(db, 'foods')
export const getFoods = (restaurantId) => {
  const foods = []
  const q = query(foodsCol, where('restaurantId', '==', restaurantId), orderBy('createdAt', 'desc'))
  return getDocs(q).then(snapshot => {
    snapshot.docs.forEach((doc) => {
      foods.push({ ...doc.data(), id: doc.id })
    })
    return foods
  })
}
export const categoriesCol = collection(db, 'categories')
export const getCategories = (restaurantId) => {
  const categories = []
  return getDocs(categoriesCol).then(snapshot => {
    snapshot.docs.forEach((doc) => {
      categories.push({ ...doc.data(), id: doc.id })
    })
    return categories
  })
}
export const getCategoriesRestaurants = () => {
  const categoriesRestaurants = []
  return getDocs(categoriesRestaurantsCol).then(snapshot => {
    snapshot.docs.forEach((doc) => {
      categoriesRestaurants.push({ ...doc.data(), id: doc.id })
    })
    return categoriesRestaurants
  })
}
const addProducts = () => {
  getDocs(restaurantsCol)
    .then(snapshot => snapshot.docs.forEach((doc) => {
      doc.data().dishes.forEach((dishe) => {
        if ('name' in dishe)
          addDoc(productsCol, {
            restaurantID: doc.id,
            ...dishe,
            createdAt: serverTimestamp()
          }).then(() => console.log("ADDED"))
      })
    }))
}
export const addProduct = (name, description, price) => {
  return addDoc(productsCol, {
    restaurantID: auth.currentUser?.uid,
    name,
    description,
    price,
    createdAt: serverTimestamp()
  })
}
export const addCategory = (name, description, image, restaurantId) => {
  return addDoc(categoriesCol, {
    restaurantId,
    name,
    description,
    image,
    createdAt: serverTimestamp()
  })
}
export const addFood = (name, description, url, price, dPrice, size, category, restaurantId) => {
  return addDoc(foodsCol, {
    name,
    description,
    image: url,
    price,
    size,
    category,
    restaurantId,
    createdAt: serverTimestamp()
  })
}
export const addCategoryRestaurant = (categoryId, restaurantId) => {
  return addDoc(categoriesRestaurantsCol, {
    categoryId,
    restaurantId,
    createdAt: serverTimestamp()
  })
}
export const deleteCategoriesRestaurants = async (categoryId, restaurantId) => {
  const q = query(categoriesRestaurantsCol, where('categoryId', '==', categoryId), where('restaurantId', '==', restaurantId))
  const snapshot = await getDocs(q);
  const docRef = doc(db, 'categoriesRestaurants', snapshot.docs[0].id)
  return deleteDoc(docRef)
}
// export const getRestaurantId = (uid) => {
//   const q = query(restaurantsCol, where('ownerId', '==', uid))
//   return getDocs(q)
// }

export const getStoreId = (uid) => {
  const q = query(storesCol, where('ownerId', '==', uid))
  return getDocs(q)
}

export const updateOrder = (order_Id, status, cookingTime) => {
  const docRef = doc(db, 'orders', order_Id)
  return updateDoc(docRef, {
    status: status,
    cookingTime
  })
    .then(() => console.log('good'))
}

export const updateRemainingTime = (order_Id, remainingTime) => {
  const docRef = doc(db, 'orders', order_Id)
  return updateDoc(docRef, {
    remainingTime
  })
    .then(() => console.log('updated'))
}
export const updateStatus = (order_Id, status) => {
  const docRef = doc(db, 'orders', order_Id)
  return updateDoc(docRef, {
    status
  })
    .then(() => console.log('updated'))
}
export const updateTimeForPickup = (order_Id, pickupTime) => {
  const docRef = doc(db, 'orders', order_Id)
  return updateDoc(docRef, {
    pickupTime
  })
    .then(() => console.log('updated'))
}

export const readyForPickup = (order_Id, status) => {
  const docRef = doc(db, 'orders', order_Id)
  return updateDoc(docRef, {
    status,
    remainingTime: 40
  })
    .then(() => console.log('updated'))
}

export const updateProduct = (product_id, image) => {
  const docRef = doc(db, 'products', product_id)
  updateDoc(docRef, {
    image: image,
  })
    .then(() => console.log('good'))
}
export const updateRestaurant = (restaurant_id, image) => {
  const docRef = doc(db, 'restaurants', restaurant_id)
  updateDoc(docRef, {
    image: image,
  })
    .then(() => console.log('good'))
}
export const updateRestaurantInfos = (restaurantData, email, name, phone, address, city, setRestaurantData) => {
  const docRef = doc(db, 'restaurants', restaurantData.id)
  const data = {
    email,
    name,
    phone,
    address: address.description,
    lat: address.location.lat,
    lng: address.location.lng,
    city,
    updatedAt: serverTimestamp()
  }
  return updateDoc(docRef, data)
    .then(() => setRestaurantData({
      ...restaurantData,
      ...data
    }))
}
const getOrder = () => {
  getDocs(ordersCol)
    .then(snapshot => {
      console.log(snapshot.docs[0].data())
    })
}
// export const addRestaurant = (userCredentials, name, phone, address) => {
//   return addDoc(restaurantsCol, {
//     ownerId: userCredentials.user.uid,
//     name: name,
//     ownerEmail: userCredentials.user.email,
//     name,
//     phone,
//     address,
//     createdAt: serverTimestamp()
//   })
// }

export const addStore = (userCredentials, name, phone, address) => {
  return addDoc(storesCol, {
    ownerId: userCredentials.user.uid,
    name: name,
    ownerEmail: userCredentials.user.email,
    name,
    phone,
    address,
    createdAt: serverTimestamp()
  })
}