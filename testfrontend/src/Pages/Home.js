import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";

function Home() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_API_URL}/api/product/getallproduct`,
      method: "GET",
    })
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <Loader
          type="BallTriangle"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      ) : (
        <div>
          {product.map((data) => {
            let imgPath = `${process.env.REACT_APP_API_URL}/${data.photo}`;
            return (
              <div className="card mb-5" style={{ width: "18rem" }}>
                <img className="card-img-top" src={imgPath} />
                <div className="card-body">
                  <h5 className="card-title">{data.name}</h5>
                  <p className="card-text">{data.description}</p>
                  <div className="btn btn-primary">Add to cart</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
}

export default Home;