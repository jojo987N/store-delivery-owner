import React, {createContext, useState} from 'react'

export const FoodsContext = createContext()

export const FoodsContextProvider = (props)=>{

    const [foods, setFoods] = useState()
    return (
        <FoodsContext.Provider value={{foods, setFoods}}>

            {props.children}

        </FoodsContext.Provider>

    )
}

  