import React, { useEffect } from "react";
import "./IndividualKurti.scss";
import { useState } from "react";

function IndividualKurti({
  id,
  history,
  handleLarge,
  handleSmall,
  handleMedium,
  isSmall,
  isLarge,
  isMedium,
  quantity,
  setQuantity,
  handleBuyNow,
  kurtiPrice,
  setKurtiPrice,
  handleBack,
}) {
  const [indKurti, setIndKurti] = useState([]);

  useEffect(() => {
    fetch(
      `http://ec2-15-206-93-116.ap-south-1.compute.amazonaws.com:5000/women/kurtis/${id}`,
      {
        method: "get",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setIndKurti(res[0]);
      });
  }, [id]);

  const handleKurtiBack = (history) => {
    setKurtiPrice(0);
    setQuantity(0);
    return history.push("/women/kurtis");
  };

  const handleRight = () => {
    if (isSmall === true) {
      if (quantity < indKurti.smallquantity) {
        setQuantity(quantity + 1);
        setKurtiPrice(parseInt(kurtiPrice) + parseInt(indKurti.kurtiprice));
      }
    } else if (isMedium === true) {
      if (quantity < indKurti.mediumquantity) {
        setQuantity(quantity + 1);
        setKurtiPrice(parseInt(kurtiPrice) + parseInt(indKurti.kurtiprice));
      }
    } else if (isLarge === true) {
      if (quantity < indKurti.largequantity) {
        setQuantity(quantity + 1);
        setKurtiPrice(parseInt(kurtiPrice) + parseInt(indKurti.kurtiprice));
      }
    } else {
      const hidden = document.querySelector(".hid");
      hidden.classList.add("visible");
    }
    console.log("handle right working");
  };
  const handleLeft = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setKurtiPrice(parseInt(kurtiPrice) - parseInt(indKurti.kurtiprice));
    } else {
      setQuantity(0);
    }
    console.log("handle Left working");
  };

  return (
    <div className="lightbox-blanket">
      <div classNameName="pop-up-container">
        <div className="pop-up-container-vertical">
          <div className="pop-up-wrapper">
            <div onClick={() => handleKurtiBack(history)} className="go-back">
              <i className="fa fa-arrow-left"></i>
            </div>
            <div className="product-details">
              <div className="product-left">
                <div className="product-image">
                  <img src={indKurti.kurtiimg} alt="1" />
                </div>
              </div>
              <div className="product-right">
                <div className="product-info">
                  <div className="product-manufacturer">ELEGANT</div>
                  <div className="product-title">{indKurti.tag}</div>
                  <div className="product-price">Rs: {indKurti.kurtiprice}</div>
                </div>
                <div className="product-description">
                  {indKurti.description}
                </div>
                <br />
                <label className="product-color-label">
                  {"Color: " + indKurti.color}
                </label>
                <br />
                <div className="product-available">
                  {isSmall
                    ? `${indKurti.smallquantity} In stock.`
                    : isLarge
                    ? `${indKurti.largequantity} In stock.`
                    : isMedium
                    ? `${indKurti.mediumquantity} In stock.`
                    : null}
                  {""}
                  <div className="hid">Please Select a size</div>
                </div>

                <div className="product-color">
                  <div className="product-color-shades">
                    <ul>
                      <li onClick={handleSmall} className="red">
                        S
                      </li>
                      <li onClick={handleMedium} className="yellow">
                        M
                      </li>
                      <li onClick={handleLarge} className="green">
                        L
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="product-quantity">
                  <label
                    for="product-quantity-input"
                    className="product-quantity-label"
                  >
                    Quantity
                  </label>
                  <div className="product-quantity-subtract">
                    <i className="fa fa-arrow-left" onClick={handleLeft}></i>
                  </div>
                  <div>
                    <input
                      type="text"
                      id="product-quantity-input"
                      placeholder="0"
                      value={quantity}
                    />
                  </div>
                  <div className="product-quantity-add">
                    <i className="fa fa-arrow-right" onClick={handleRight}></i>
                  </div>
                </div>
              </div>
              <div className="product-bottom">
                <div className="product-checkout">
                  Total Price
                  <div className="product-checkout-total">
                    <div className="product-checkout-total-amount">
                      {" Rs: " + kurtiPrice}
                    </div>
                  </div>
                </div>
                <div className="product-checkout-actions">
                  <button onClick={() => handleBuyNow(history)} className="btn">
                    Buy now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndividualKurti;
