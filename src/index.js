import React   from "react";
import ReactDOM  from "react-dom/client";
import {BrowserRouter as Router , Routes,Route} from "react-router-dom"
import "./index.css";
// import './App.css';
import Noteandtodo_reactContextApi from "./react_context_api/noteandtodo";
import Noteandtodo_redux from "./redux/noteandtodo";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div
    className="body"
    style={{
      backgroundColor: "black",
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}
  >
    <Noteandtodo_redux />
    {/* <Noteandtodo_reactContextApi /> */}
  </div>
);


