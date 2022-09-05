import React, { useEffect, useState, useRef, useReducer } from "react";
import Noteui from "./note"
import Todoui from "./todo"
import { Contextapi } from "./contextapi"


let Noteandtodo = () => {

  
  let reducer = (state, action) => {
    let state_ = { ...state }
    console.log(action)
    action.forEach(e => {
      
      switch (e.type) {
        case "new":
          state_.new_ =e.action
          
          break;
        case "search":
          state_.search =e.action.value
          
          break;
        case "view":
          state_.view =e.action
          
          break;
          case "notes":
            state_.notes =true
            break;
            case "todo":
              state_.notes =false
              break;
        case "setvalue":
          // console.log("notes",e)
          
          if (e.action.obj) {
            let id = Math.random().toString();
            let date = new Date().toDateString();
          
            let obj = JSON.parse(localStorage.getItem(e.action.store));
            if (e.action.obj.id) {
              if (obj) {
                let index = obj.findIndex(a=>a.id == e.action.obj.id);
                e.action.obj.id = id;
                e.action.obj.date = date;
                obj.splice(index, 1, e.action.obj);
              }
            } else {
              e.action.obj.id = id;
                 e.action.obj.date = date;
              if (!obj) {
                
                obj = [];
                obj.push(e.action.obj);
              }
              else {
                obj.push(e.action.obj);
                
              }
            }
            if (obj) {
             
              localStorage.setItem(e.action.store, JSON.stringify(obj));
            }
          }
              break;
              
            }
    })
          
          return state_
        };
        //  let [notes,setNotes,]= useState(true)
        let [t_n,dispatch] = useReducer(reducer, {
          notes: true,
          new_: false,
          view: false,
          search:""
        });
        console.log(t_n)
  return (
    <div
      style={{
        width: "100%",
        height: "calc(100% - 40px)",
        maxWidth: "1000px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "black",
        color: "white",

        alignItems: "center",
        padding: "0px 10px",
      }}
    >
      <h1
        style={{
          marginRight: "auto",
          boxSizing: "border-box",
          padding: "10px",
        }}
      >
        {(t_n.notes && "Note") || "Todo"}
      </h1>
      <div
        style={{
          width: "100%",
          height: "30px",
          maxWidth: "300px",
          margin: "5px",
        }}
      >
        <input
          value={t_n.search}
          onChange={(e) => {
            dispatch([
              { type: "search", action: { value: e.currentTarget.value } },
            ]);
          }}
          placeholder="search"
          style={{
            width: "100%",

            height: "100%",
            borderRadius: "5px",
          }}
        ></input>
      </div>
      <div
        style={{
          marginRight: "auto",
          boxSizing: "border-box",
          padding: "10px",
          width: "100%",
          height: "calc(100% - 170px)",
        }}
      >
        {
          <Contextapi.Provider value={{ ...t_n, newdispatch: dispatch }}>
            {t_n.notes && <Noteui />}
            {!t_n.notes && <Todoui />}
          </Contextapi.Provider>
        }
      </div>
      {!t_n.view && !t_n.new_ && (
        <button
          onClick={() => {
            dispatch([{ type: "new",action:true }]);
          }}
          style={{
            width: "50px",
            height: "60px",
            borderRadius: "50px",
            position: "absolute",
            color: "white",
            bottom: "100px",
            backgroundColor: "rgb(18, 3, 54)",
          }}
        >
          {" "}
          +{" "}
        </button>
      )}

      <div
        style={{
          width: "100%",
          height: "40px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          position: "absolute",
          left: "0px",
          bottom: "0px",
          backgroundColor: "black",
        }}
      >
        <button
          onClick={() => {
            dispatch([{ type: "notes" }]);
          }}
        >
          Notes
        </button>
        <button
          onClick={() => {
            dispatch([{ type: "todo" }]);
          }}
        >
          Todo
        </button>
      </div>
    </div>
  );
};

export default Noteandtodo