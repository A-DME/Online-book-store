import React from "react";
import "./Home.css";

export default function Home() {
  return (
      <div className="Home">
    <div className="container">
      <h1 style={{color:"white"}}>كتب ينصح بها القراء </h1>
      <div
        id="carouselExampleCaptions"
        class="carousel slide"
        data-ride="carousel"
      >
        <ol class="carousel-indicators">
          <li
            data-target="#carouselExampleCaptions"
            data-slide-to="0"
            class="active"
          ></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="../imgs/sb.jpg"
              class="d-block w-100"
              alt="img"
              height="500px"
            />
            <div>
              <h3 style={{ color: "white",margin:40}}>ساق البامبو</h3>
              {/* <p style={{color:"black"}}>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="../imgs/yo.jpg"
              class="d-block w-100"
              alt="img"
              height="500px"
            />
            <div>
              <h3 style={{ color: "white",margin:40 }}>يوتوبيا</h3>
              {/* <p style={{color:"black"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="../imgs/tm.jpg"
              class="d-block w-100"
              alt="img"
              height="500px"
            />
            <div>
              <h3 style={{ color: "white",margin:40 }}>تراب الماس</h3>
              {/* <p style={{color:"black"}}>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
            </div>
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleCaptions"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleCaptions"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
    </div>
    
  );
}
