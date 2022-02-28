
import React, { useState, useEffect } from "react";
import Catalog from "react-catalog-view";
import Axios from "axios";
import Buffer from 'buffer';
import data from './data.js'



function ProductData(props){
   const [products, setProduct] = useState([]);
   useEffect(() => {
      let products=[];
   Axios.get(data.baseurl+"/getitems").then((response) => {
      // console.log(`data:${response.data[0].imgcontentType};base64,`+btoa(response.data[0].imgdata.data));
      // console.log(Buffer.Buffer(response.data[0].imgdata.data).toString('base64'));
      response.data.forEach(element => {
      if(props.SearchData.cond){
         if(element.name.toLowerCase().includes(props.SearchData.data.toLowerCase())){
         products.push({
            id: element._id,
            title: element.name,
            description: element.description,
            image: `data:${element.imgcontentType};base64,`+Buffer.Buffer(element.imgdata.data).toString('base64'),
            price: element.price,
            discounted:element.discounted,
            currency:"₹",
         })
      }
   }
   else{
      products.push({
         id: element._id,
         title: element.name,
         description: element.description,
         image: `data:${element.imgcontentType};base64,`+Buffer.Buffer(element.imgdata.data).toString('base64'),
         price: element.price,
         discounted:element.discounted,
         currency:"₹",
      })
   }
      });
      setProduct(products);
   });
}, [props.SearchData.data]);
   

  const CONTENT_KEYS = 
  {             
     imgKey: "image",
     cardTitleKey: "title",
     cardDescriptionKey: "description",
     priceKey: "price",
     discountedPriceKey: "discounted",
     priceCurrencyKey: "currency",
     discountCurrencyKey: "currency"
  };

  return(<>
    <Catalog
       data = {products}		
       // Array of JSON Objects (required)
       contentKeys={CONTENT_KEYS}  
       // JSON Object defining the keys that will be 
       // used from the data array, keys should match. (required)
       cardSize="sm"
       // Card sizes, sm, md and lg for small, medium  and large
       btnOneText="View"
       // Enter text for action button one 
       // or pass empty string to hide.  
       btnTwoText="Buy"
       // Enter text for action button two 
       // or pass empty string to hide.
       btnOneHandler={(args, event, objectData)=>{
        // 'objectData' returns object data
        // any arguments passed will be before 'event' 
        // and 'objectData'
       }}
       btnTwoHandler={(args, event, row)=>{
        // 'objectData' returns object data
        // any arguments passed will be before 'event' 
        // and 'objectData'
       }}
       skeleton={0}
       // Any non zero number will override default cards
       // and will show that many skeleton cards.
    />
    </>
  )
}


export default ProductData;