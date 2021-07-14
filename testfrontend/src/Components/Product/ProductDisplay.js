import React, { useEffect, useState } from "react";
import AdminHeader from "../AdminHeader";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import axios from "axios";

function ProductDisplay() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios({
      url: `${process.env.REACT_APP_API_URL}/api/product/getallproduct`,
      method: "GET",
    })
      .then(async (res) => {
        console.log(res);
        await setProduct(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
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
          <AdminHeader />
          <Link to="/admin/product/add" className="btn btn-primary">
            Add New
          </Link>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
                <th scope="col">Image</th>
              </tr>
            </thead>
            <tbody>
              {product.map((data, idx) => {
                let imgPath = `${process.env.REACT_APP_API_URL}/${data.photo}`;
                console.log(data);
                return (
                  <tr>
                    <th scope="row">{idx + 1}</th>
                    <td>{data.name}</td>
                    {/* <td>{data.category.name} || test</td> */}

                    <td>Category</td>
                    <td>{data.price}</td>
                    <td>{data.stock}</td>
                    <td>
                      <img
                        src={imgPath}
                        alt=""
                        srcset=""
                        height="40"
                        width="80"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </React.Fragment>
      )}
    </div>
  );
}

export default ProductDisplay;