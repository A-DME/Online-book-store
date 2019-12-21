import React from 'react';
import { BrowserRouter as Router,Route,Link } from "react-router-dom";
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Download';
import Register from './pages/Register';
import Login from './pages/Login';
import Product from './pages/Product';
import CartIcon from './Components/CartIcon';
import {Provider} from "react-redux";
import store from "./store/store";

function App() {
  return ( 
    <Router>
      
          <nav className="navbar navbar-expand-lg navbar-light bg-light" > 
      <a className="navbar-brand" href="#"> <h1> Online <span style={{color:"green"}} >Book</span> Store</h1></a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/products">Product</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cart">Download</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Register">Register</Link>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Categories
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
         
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
      {/* <CartIcon/> */}
    </nav>
     
    
    <Route path ="/" component={Home} exact/>
    <Route path ="/products" component={Products}  exact/>
    <Route path ="/products/:id" component={Product}  />
    <Route path ="/cart" component={Cart}/>
    <Route path ="/Register" component={Register}/>
    <Route path ="/Login" component={Login}/>

       
        </Router>
  );
}

function AppWithStore(){
  return <Provider store={store}>
    <App />
  </Provider>
}

export default AppWithStore;
