import React from "react";
import CartItem from "../Components/CartItem";
import ProductsApi from "../api/products";
//  import {connect} from "react-redux";
import {clearCart} from "../store/actions/actions";

class Cart extends React.Component{

    placeOrder = () => {
        // send the request to the server
        // clear cart
        // this.props.clearCart();
        alert('the download is succsseful');
    };

    render(){
        return (
            <div>
                <h1>Download</h1>

                {/* <div className="row"> 
                    {this.props.cartItems.map((item, index) => 
                        <div className={'col-3'} key={index}>
                            <CartItem item={item} index={index} />
                        </div>
                    )}
                </div>  */}

                <br />
                {/* <h3>
                    Total: {this.props.total}
                </h3> */}

                <button className="btn btn-primary btn-block" onClick={this.placeOrder}>Download</button>
            </div>
        );
    }
}


// const mapStateToProps = (state) => {
//     return {
//         cartItems: state.cart,
//         // total: state.cart.reduce((total, item) => total + item.quantity * item.product.price, 0),
//     };
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         clearCart: () => dispatch(clearCart()),
//     };
// }

export default (Cart);
