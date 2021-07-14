import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Loader from "react-loader-spinner";
import axios from "axios";

const ProductAdd = () => {
    
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    name : "",
    description : "",
    price : "",
    category : "",
    stock : "",
    photo : "",
    errormessage : "",
    loading : false,
    error : false
  })
  const [imageData, setImageData] = useState()

  const { name,description,price,category,stock,sold,photo,errormessage,error  } =
    data;

  const handleChange = (name) => (e) => {
    setData({
      ...data,
      [name]: e.target.value,
    });
  };


  const handleImageChange = (e) => {
    console.log(e.target.files[0]);

    setImageData(e.target.files[0])

    // if(e.target.files[0].size > 1024*1024*5) {
    // }
  };

  const handleImageSubmit = (e) => {
    e.preventDefault()

    let imageFormData = new FormData()
    imageFormData.append('productImg', imageData)

    if(imageData.size > 1024*1024*5) {
      setData({ error: true, errormessage: "File should be less than 5MB" });
    } else if(imageData.type === "image/jpeg" || imageData.type === "image/png" || imageData.type === "image/jpg" || imageData.type === "image/svg") {
      axios({
        url: `${process.env.REACT_APP_API_URL}/api/product/image`,
        method: "POST",
        data: imageFormData
      }).then(response => {
        console.log(response);
        setData({photo: response.data.data.url})
      }).catch(error => {
        console.log(error.response);
      })
    } else {
      setData({ error: true, errormessage: "Only JPG, JPEG, SVG and PNG files allowed!" });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setData({ loading: true });
    if (!name || !description || !price || !category || !stock || !sold || !photo) {
      setData({ error: true, errormessage: "Please enter all details" });
    } else {
      await axios({
        url: `${process.env.REACT_APP_API_URL}/api/user/ProductAdd`,
        method: "post",

        data: data,
      })
        .then((res) => {
          console.log(res);
          setData({ loading: false, error: false });
          return <Redirect to="/signin" />;
        })
        .catch((error) => {
          setData({
            loading: false,
            error: true,
            errormessage: error.response.data.error,
          });
        });
    }
  };

  return (
    <div className="container-fluid p-5 w-75 mt-5">
      {loading ? (
        <Loader
          type="BallTriangle"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      ) : (
        <React.Fragment>
          <div className="text-center mb-5">
            <h1>ProductAdd</h1>
          </div>
          {error ? (
            <div class="alert alert-danger" role="alert">
              {errormessage}
            </div>
          ) : (
            ""
          )}


          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label for="inputnamr" className="form-label">
                name
              </label>
              <input
                type="text"
                className="form-control"
                id="inputname"
                value={name}
                onChange={handleChange("name")}
              />
            </div>
            <div className="col-md-6">
              <label for="inputdescription" className="form-label">
                description
              </label>
              <input
                type="text"
                className="form-control"
                id="inputdescription"
                value={description}
                onChange={handleChange("description")}
              />
            </div>
            <div className="col-12">
              <label for="inputprice" className="form-label">
                Price
              </label>
              <input
                type="price"
                className="form-control"
                id="inputprice"
                value={price}
                onChange={handleChange("price")}
              />
            </div>
            <div className="col-12">
              <label for="inputcategory" className="form-label">
                category
              </label>
              <input
                type="category"
                className="form-control"
                id="inputcategory"
                value={category}
                onChange={handleChange("category")}
              />
            </div>
            <div className="col-md-6">
              <label for="inputstock" className="form-label">
                Stock
              </label>
              <input
                type="number"
                className="form-control"
                id="inputstock"
                value={stock}
                onChange={handleChange("stock")}
              />
            </div>
            <div className="col-md-6">
              <label for="inputsold" className="form-label">
                sold
              </label>
              <input
                type="number"
                className="form-control"
                id="inputsold"
                value={sold}
                onChange={handleChange("sold")}
              />
            </div>
            <div className="col-md-6">
              <label for="inputphoto" className="form-label">
                photo
              </label>
              <input
                type="file"
                className="form-control"
                id="inputphoto"
                // value={photo}
                onChange={handleImageChange}
              />
              <button onClick={handleImageSubmit}>Upload</button>
            </div>
            
            <div className="col-12 ">
              <button type="submit" className="btn btn-primary">
                ProductAdd
              </button>
            </div>
          </form>
        </React.Fragment>
      )}
    </div>
  );
};

export default ProductAdd;