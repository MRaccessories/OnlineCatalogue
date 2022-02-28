import React, { useEffect, useState } from 'react'
import ProductData from "./item";
import DeleteProductData from "./itemdelete";


export default function ModeSetter(props) {
    const [mode, setMode] = useState(false);
    useEffect(() => {
        if(props.data.data==="editormode"){
            setMode(true);
        }
        if(props.data.data==="viewmode"){
            setMode(false);
        }
        console.log(mode);
    }, [props.data,mode])


  return (
    <>
    {mode? <DeleteProductData SearchData={props.data} /> : <ProductData SearchData={props.data}/>}
    </>
  )
}
