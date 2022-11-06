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
export const storesCol = collection(db, 'stores')
export const ordersCol = collection(db, 'orders')
export const categoriesStoresCol = collection(db, 'categoriesStores')
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
// export const productsCol = collection(db, 'products')
export const productsCol = collection(db, 'products')
export const getProducts = (storeId) => {
  const products = []
  const q = query(productsCol, where('storeId', '==', storeId), orderBy('createdAt', 'desc'))
  return getDocs(q).then(snapshot => {
    snapshot.docs.forEach((doc) => {
      products.push({ ...doc.data(), id: doc.id })
    })
    return products
  })
}
export const categoriesCol = collection(db, 'categories')
export const getCategories = (storeId) => {
  const categories = []
  return getDocs(categoriesCol).then(snapshot => {
    snapshot.docs.forEach((doc) => {
      categories.push({ ...doc.data(), id: doc.id })
    })
    return categories
  })
}
export const getCategoriesStores = () => {
  const categoriesStores = []
  return getDocs(categoriesStoresCol).then(snapshot => {
    snapshot.docs.forEach((doc) => {
      categoriesStores.push({ ...doc.data(), id: doc.id })
    })
    return categoriesStores
  })
}
const addProducts = () => {
  getDocs(storesCol)
    .then(snapshot => snapshot.docs.forEach((doc) => {
      doc.data().dishes.forEach((dishe) => {
        if ('name' in dishe)
          addDoc(productsCol, {
            storeID: doc.id,
            ...dishe,
            createdAt: serverTimestamp()
          }).then(() => console.log("ADDED"))
      })
    }))
}
// export const addProduct = (name, description, price) => {
//   return addDoc(productsCol, {
//     storeID: auth.currentUser?.uid,
//     name,
//     description,
//     price,
//     createdAt: serverTimestamp()
//   })
// }
export const addCategory = (name, description, image, storeId) => {
  return addDoc(categoriesCol, {
    storeId,
    name,
    description,
    image,
    createdAt: serverTimestamp()
  })
}
export const addProduct = (name, description, url, price, dPrice, size, category, storeId) => {
  return addDoc(productsCol, {
    name,
    description,
    image: url,
    price,
    size,
    category,
    storeId,
    createdAt: serverTimestamp()
  })
}
export const addCategoryStore = (categoryId, storeId) => {
  return addDoc(categoriesStoresCol, {
    categoryId,
    storeId,
    createdAt: serverTimestamp()
  })
}
export const deleteCategoriesStores = async (categoryId, storeId) => {
  const q = query(categoriesStoresCol, where('categoryId', '==', categoryId), where('storeId', '==', storeId))
  const snapshot = await getDocs(q);
  const docRef = doc(db, 'categoriesStores', snapshot.docs[0].id)
  return deleteDoc(docRef)
}
// export const getStoreId = (uid) => {
//   const q = query(storesCol, where('ownerId', '==', uid))
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
// export const updateStore = (store_id, image) => {
//   const docRef = doc(db, 'stores', store_id)
//   updateDoc(docRef, {
//     image: image,
//   })
//     .then(() => console.log('good'))
// }
export const updateStore = (store_id, image) => {
  const docRef = doc(db, 'stores', store_id)
  updateDoc(docRef, {
    image: image,
  })
    .then(() => console.log('updated'))
}
// export const updateStoreInfos = (storeData, email, name, phone, address, city, setStoreData) => {
//   const docRef = doc(db, 'stores', storeData.id)
//   const data = {
//     email,
//     name,
//     phone,
//     address: address.description,
//     lat: address.location.lat,
//     lng: address.location.lng,
//     city,
//     updatedAt: serverTimestamp()
//   }
//   return updateDoc(docRef, data)
//     .then(() => setStoreData({
//       ...storeData,
//       ...data
//     }))
// }

export const updateStoreInfos = (storeData, email, name, phone, address, city, setStoreData) => {
  const docRef = doc(db, 'stores', storeData.id)
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
    .then(() => setStoreData({
      ...storeData,
      ...data
    }))
}
const getOrder = () => {
  getDocs(ordersCol)
    .then(snapshot => {
      console.log(snapshot.docs[0].data())
    })
}
// export const addStore = (userCredentials, name, phone, address) => {
//   return addDoc(storesCol, {
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