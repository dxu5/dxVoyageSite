import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getCartItems,
  removeCartItem,
  onSuccessBuy,
} from "../../../_actions/user_actions";
import UserCardBlock from "./Sections/UserCardBlock";
import { Result, Empty } from "antd";
import Paypal from "../../utils/Paypal";
import Axios from "axios";
// function CartPage(props) {
//   const dispatch = useDispatch();
//   const [Total, setTotal] = useState(0);
//   const [ShowTotal, setShowTotal] = useState(false);
//   const [ShowSuccess, setShowSuccess] = useState(false);
//   useEffect(() => {
//     let cartItems = [];
//     if (props.user.userData && props.user.userData.cart) {
//       if (props.user.userData.cart.length > 0) {
//         props.user.userData.cart.forEach((item) => {
//           cartItems.push(item.id);
//         });
//         dispatch(getCartItems(cartItems, props.user.userData.cart));
//       }
//     }
//   }, [props.user.userData]);

//   useEffect(() => {
//     if (props.user.cartDetail && props.user.cartDetail.length > 0) {
//       calculateTotal(props.user.cartDetail);
//     }
//   }, [props.user.cartDetail]);

//   const calculateTotal = (cartDetail) => {
//     let total = 0;
//     cartDetail.map((item) => {
//       total += parseFloat(item.price, 10) * item.quantity;
//     });
//     console.log(total);
//     setTotal(total);
//     setShowTotal(true);
//   };

//   const removeFromCart = (productId) => {
//     dispatch(removeCartItem(productId)).then(() => {
//       Axios.get("/api/users/userCartInfo").then((response) => {
//         if (response.data.success) {
//           if (response.data.cartDetail.length <= 0) {
//             setShowTotal(false);
//           } else {
//             calculateTotal(response.data.cartDetail);
//           }
//         } else {
//           alert("Failed to get cart information");
//         }
//       });
//     });
//   };
function CartPage(props) {
  const dispatch = useDispatch();
  const [Total, setTotal] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false);
  const [ShowSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    let cartItems = [];
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });
        dispatch(getCartItems(cartItems, props.user.userData.cart)).then(
          (response) => {
            if (response.payload.length > 0) {
              calculateTotal(response.payload);
            }
          }
        );
      }
    }
  }, [props.user.userData]);

  const calculateTotal = (cartDetail) => {
    let total = 0;

    cartDetail.map((item) => {
      total += parseInt(item.price, 10) * item.quantity;
    });

    setTotal(total);
    setShowTotal(true);
  };

  const removeFromCart = (productId) => {
    dispatch(removeCartItem(productId)).then((response) => {
      if (response.payload.cartDetail.length <= 0) {
        setShowTotal(false);
      } else {
        calculateTotal(response.payload.cartDetail);
      }
    });
  };

  //   return (
  //     <div style={{ width: "85%", margin: "3rem auto" }}>
  //       <h1>My Cart</h1>
  //       <div>
  //         <UserCardBlock
  //           products={props.user.cartDetail}
  //           removeItem={removeFromCart}
  //         />

  //         {ShowTotal ? (
  //           <div style={{ marginTop: "3rem" }}>
  //             <h2>Total Purchase Price: ${Total} </h2>
  //           </div>
  //         ) : ShowSuccess ? (
  //           <Result status="success" title="Successfully Purchased Items" />
  //         ) : (
  //           <div
  //             style={{
  //               width: "100%",
  //               display: "flex",
  //               flexDirection: "column",
  //               justifyContent: "center",
  //             }}
  //           >
  //             <br />
  //             <Empty description={false} />
  //             <p>There Are No Items In Your Cart</p>
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   );
  // }

  // export default CartPage;

  const transactionSuccess = (data) => {
    let variables = {
      cartDetail: props.user.cartDetail,
      paymentData: data,
    };
    Axios.post("/api/users/successBuy", variables).then((response) => {
      if (response.data.success) {
        setShowSuccess(true);
        setShowTotal(false);
        dispatch(
          onSuccessBuy({
            cart: response.data.cart,
            cartDetail: response.data.cartDetail,
          })
        );
      } else {
        alert("Failed to buy items");
      }
    });
    // dispatch(onSuccessBuy({
    //     cartDetail: props.user.cartDetail,
    //     paymentData: data
    // }))
    //     .then(response => {
    //         if (response.payload.success) {
    //             setShowSuccess(true)
    //             setShowTotal(false)
    //         }
    //     })
  };

  const transactionError = () => {
    console.log("Paypal error");
  };
  const transactionCanceled = () => {
    console.log("Transaction canceled");
  };
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My Cart</h1>
      <div>
        <UserCardBlock
          products={props.user.cartDetail}
          removeItem={removeFromCart}
        />

        {ShowTotal ? (
          <div style={{ marginTop: "3rem" }}>
            <h2>Total amount: ${Total} </h2>
          </div>
        ) : ShowSuccess ? (
          <Result status="success" title="Successfully Purchased Items" />
        ) : (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <br />
            <Empty description={false} />
            <p style={{ textAlign: "center" }}>No Items In the Cart</p>
          </div>
        )}
      </div>

      {ShowTotal && (
        <Paypal
          toPay={Total}
          onSuccess={transactionSuccess}
          transactionError={transactionError}
          transactionCanceled={transactionCanceled}
        />
      )}
    </div>
  );
}

export default CartPage;
