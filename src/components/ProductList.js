import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [product, setproduct] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    let result = await fetch("http://localhost:5000/find-product");
    result = await result.json();
    setproduct(result);
  }
  const deleteproduct = async (id)=>{
    let result = await fetch(`http://localhost:5000/product/${id}`,{
      method:"Delete"
    })
    result = await result.json();
    if(result){ 
      getProduct();
      alert("Record are deleted");
    }
  }
  
  // console.log("Products",product)
  return (
    <div className="table-list">
      <h1>Product List</h1>
      <table className="t-b">
        <thead>
          <tr>
            <th>S. No</th>
            <th>Name</th>
            <th>Price</th>
            <th>Catogory</th>
            <th>Company</th>
            <th><i className="fa-solid fa-trash"></i></th>
            <th><i class="fa-sharp fa-solid fa-pen-to-square" ></i></th>
          </tr>
        </thead>

        {
          product.map((item,index)=>
          <tbody>
          <tr key={item._id}>
            <td>{index+1}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.catogory}</td>
            <td>{item.company}</td>
            <td>
              <button className="btn" onClick={()=>deleteproduct(item._id)}>Delete</button>
              </td>
              <td><Link to={"/update/"+item._id} className="link">Update</Link></td>
          </tr>
        </tbody>
          )
        }
      
      </table>
    </div>
  );
}
