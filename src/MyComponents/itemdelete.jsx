import './itemdelete.css';

import React, { useState, useEffect } from "react";
import Catalog from "react-catalog-view";
import Axios from "axios";
import Buffer from 'buffer';
import data from './data.js'
import axios from "axios";



function DeleteProductData(props){
   const [products, setProduct] = useState([]);
   const [alterData,setalterdata]= useState([]);
   const [UpdatedData,setUpdatedData]= useState({});


   useEffect(() => {
      const products=[];
      Axios.get(data.baseurl+"/getitems").then((response) => {
      alterData.push(response.data[0]);
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
      setalterdata(alterData);
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
  <div className='centerchild'>
  <button id='addbutton' onClick={()=>{
   axios.post(data.baseurl+"/add").then((response) => {
      window.location.reload();
   })  
      }}>Add Item</button>
</div>
  <div className="modal" id="modal">
         <div className="modal-header">
            <div className="title">
               Update Item
            </div>
            <button className="close-button"onClick={
               ()=>{
                  document.getElementById("modal").classList.toggle('active')
                  document.getElementById("overlay").classList.toggle('active')
               }
            }>
               &times;
            </button>
         </div>
         <div className="modal-body">
         <div className="body">
         <form action={data.baseurl+"/updateitem"} method="POST" encType="multipart/form-data">
            <input type="hidden" name="id" value={alterData.id} />
            <div className="inputrow">
               <label>Name:</label>
               <input type="text" name="name" id='name' defaultValue={alterData.title} onChange={
                  (event)=>{
                     UpdatedData.name=event.target.value;
                     setUpdatedData(UpdatedData);
                     console.log(UpdatedData);
                  }
               }/>
            </div>
            <div className="inputrow">
               <label>Description:</label>
               <input type="text" name="description" id='description' defaultValue={alterData.description} onChange={
                  (event)=>{
                     UpdatedData.description=event.target.value;
                     setUpdatedData(UpdatedData);
                     console.log(UpdatedData);
                  }
               }/>
            </div>
            <div className="inputrow">
               <label>Price:</label>
               <input type="text" name="price" id='price'defaultValue={alterData.price} onChange={
                  (event)=>{
                     UpdatedData.price=event.target.value;
                     setUpdatedData(UpdatedData);
                     console.log(UpdatedData);
                  }
               }/>
            </div>
            <div className="inputrow">
               <label>Discounted:</label>
               <input type="text" name="discounted" id='discounted'defaultValue={alterData.discounted} onChange={
                  (event)=>{
                     UpdatedData.discounted=event.target.value;
                     setUpdatedData(UpdatedData);
                     console.log(UpdatedData);
                  }
               }/>
            </div>
            <div className="inputrow">
               <label>Category:</label>
               <input type="text" name="category" id='category'defaultValue={alterData.category} onChange={
                  (event)=>{
                     UpdatedData.category=event.target.value;
                     setUpdatedData(UpdatedData);
                     console.log(UpdatedData);
                  }
               }/>
            </div>
            <div className="inputrow">
                <label htmlFor="itemImage">Upload Image</label>
                <input type="file" id="itemImage" 
                 name="itemImage" value={UpdatedData.image} onChange={
                   (event)=>{
                     UpdatedData.image=event.target.value
                     setUpdatedData(UpdatedData);
                     console.log(UpdatedData);
                     }
                   }/>
            </div>
            <button type="submit" onClick={(event)=>{
               document.getElementById("modal").classList.toggle('active')
               document.getElementById("overlay").classList.toggle('active')
            }}>Submit</button>
         </form>
         </div>
         </div>
  </div>
<div id="overlay" onClick={
   ()=>{
      document.getElementById("modal").classList.toggle('active')
      document.getElementById("overlay").classList.toggle('active')
   }
}></div>

    <Catalog
       data = {products}		
       // Array of JSON Objects (required)
       contentKeys={CONTENT_KEYS}  
       // JSON Object defining the keys that will be 
       // used from the data array, keys should match. (required)
       cardSize="sm"
       // Card sizes, sm, md and lg for small, medium  and large
       btnOneText="Edit"
       // Enter text for action button one 
       // or pass empty string to hide.  
       btnTwoText="Delete"
       // Enter text for action button two 
       // or pass empty string to hide.
       btnOneHandler={(args, event, objectData)=>{
        setalterdata(event);
        document.getElementById("modal").classList.toggle('active')
        document.getElementById("overlay").classList.toggle('active')
       }}
       btnTwoHandler={(args, event, row)=>{
         if(window.confirm('Are you sure you want to delete +'+event.title+' ?')){
         axios.post(data.baseurl+'/deleteitem',{
           id:event.id
        }).then((response)=>{
             window.location.reload();
        });
      }
       }}
       skeleton={0}
       // Any non zero number will override default cards
       // and will show that many skeleton cards.
    />
    </>
  )
}


export default DeleteProductData;