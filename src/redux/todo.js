import react, { useState, useContext, useEffect, useReducer } from "react";

import { Contextapi } from "./contextapi";
import { createStore } from"redux"
import {Provider,connect} from"react-redux"


let Li = (prop) => {
    let{ dispatch,todo,obj} =prop
    return (
      <li
       
        className="todo_li"
        style={{
          color: "white",
          backgroundColor: "rgb(128, 128, 128, 0.149)",
          height: "60px",
          width: "100%",
          padding: "10px",
          boxSizing: "border-box",
          display: "flex",
          marginBottom: "5px",
        }}
      >
        <input
          onChange={(e) => {
            //     setTodos(
            //       c.currentTarget.value,
            //       "title"
            //   );
            dispatch({
              type: "todo",
              action: { value: e.currentTarget.value, id: obj.id },
            });
            e.currentTarget.focus();
            // prop.setTodos(c.currentTarget.value, "todo",);
          }}
          value={obj.text}
          style={{
            width: "calc(100% - 40px)",
            backgroundColor: "rgb(128, 128, 128, 0.149)",
            height: "100%",
            border: "none",

            color: "white",
          }}
         
        ></input>
        <button
          style={{
            border: "none",
            outline: "none",
            backgroundColor: "inherit",
          }}
          onClick={() => {
            dispatch({
              type: "delete",
              action: { id: obj.id },
            });
          }}
        >
          🚮
        </button>
      </li>
    );
}

 let Todo = connect((state) => ({ ...state }), (dispatch) => ({
  dispatch:(obj)=>{dispatch(obj)}
}))(

(prop) => {
 

    let reducer = (state, action) => {
        
        let state_ = { ...state }
        switch (action.type) {
          case "title":
            state_.title = action.action.value;

            break;
          case "todo":
                let index = state_.todo.findIndex(a => a.id == action.action.id);
               

            state_.todo[index].text = action.action.value;

            break;
          case "time":
            state_.time = action.action.value;

                break;
            case "setvalue":
                state_=action.action.state
                break;
            case "delete":
                  let index_ = state_.todo.findIndex((a) => a.id == action.action.id);
     
            state_.todo.splice(index_, 1);
            break;
          case "add":
            
            state_.todo.push({
              id: Math.random().toString(),
              text: "",
              key: Math.random().toString(),
            });

            break;
        }

        return state_
        
        
    }
   let [todo, dispatch] = useReducer(reducer, {
     title: "",
     date: "",
       todo: [
         {
              id: Math.random().toString(),
              text: "",
              key: Math.random().toString(),
            }
     ],
   });
//   let [todo, setTodo] = useState({
//     title: "",
//     date: "",
//     todo: [],
//   });
  useEffect(() => {
    let obj = JSON.parse(localStorage.getItem("todo"));
   
    obj
      ? (() => {
          if (prop.view && prop.view.view) {
            let a = obj.find((e) => e.id == prop.view.view.id);
           
              if (a) {
                  dispatch({ type: "setvalue", action: { state: a }
})
            //   setTodo(a);
            }
          }
        })()
      : (() => {})();
  }, [prop]);

 

  return (
    (prop.new_ || prop.view) && (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
                  backgroundColor: "black",
                  display: "flex",
          flexDirection:"column",
          top: "0px",
        }}
      >
        <div>
                  <button
                      
                      style={{
                          margin:"10px 0px"
                      }}
            onClick={() => {
              let commands = [{ type: "view", action: false }, { type: "new" ,action:false}];
              prop.dispatch({type:"_",arr: commands })
             
            }}
          >
            back
          </button>

          {/* <div>:</div> */}
        </div>
        <div className="time">{todo.date}</div>
        <div className="todo">
          <input
            placeholder="Title"
            className="title"
            value={todo.title}
            style={{
              height: "50px",
              backgroundColor: "rgb(128, 128, 128, 0.149)",
              border: "none",
              width: "100%",
              color: "white",
              marginBottom: "5px",
            }}
            onChange={(e) => {
              dispatch({type:"title",action:{value:e.currentTarget.value}});
            }}
                  ></input>
                 
                   <ol
                         
                          style={{
                           
                            height: "fit-content",
                            width: "100%",
                            padding: "10px",
                              boxSizing: "border-box",
                           
                         
                              marginBottom: "10px",
                            
                          }}
                  >
                      

                  {todo.todo.map(e => 

                      
<Li
key={e.key}
                       
                          {...{ dispatch, obj: e, todo }}
                        />
                      
                  )}
                        </ol>
          <button
            style={{
              width: "50px",
              height: "60px",
              borderRadius: "50px",
              position: "absolute",
              color: "white",
                          bottom: "100px",
             left:"50%",
            //   alignSelf:"center",
              backgroundColor: "rgb(18, 3, 54)",
            }}
            onClick={() => {
               
              dispatch({
                type: "add",
              
              });
            //  setTodo(todo_);
            }}
          >
            +
          </button>
          <button
            style={{
              width: "50px",
              height: "60px",
              borderRadius: "50px",
              position: "absolute",
              color: "white",
              bottom: "100px",
              backgroundColor: "rgb(18, 3, 54)",
            }}
                      onClick={() => {
                          let todo_ = { ...todo }
                          todo_.todo = todo.todo.reduce((total, acc) => {
                              if (acc != "") {
                                  total.push(acc)
                              }
                              
                              return total
                              
                          },[])
                          let commands = [
                            { type: "setvalue", action: { obj: todo_,store:"todo" } },
                            { type: "new",action:false },
                            { type: "view",action:false },
                          ];
                        prop.dispatch({ type: "_", arr: commands });
             
            }}
          >
            done
          </button>
        </div>
      </div>
    )
  );
})

let Todoui = (prop) => {
 
  let [todo, setTodo] = useState([]);

  useEffect(() => {
    let obj = JSON.parse(localStorage.getItem("todo"));
      if (obj) {
          if ( prop.search != "") {
            
              obj = obj.filter((e) => {
                if (
                  e.title.includes(prop.search) ||
                  e.todo.find((e) => e.text.includes(prop.search))
                ) {
                  return true;
                } else {
                  return false;
                }
              });
        }
      setTodo(obj);
      }
      
  }, [prop]);
  // let [view, setview] = useState(useContext.view);
 
  return (
    <div
      className="vv"
      style={{
        width: "100%",
        height: "100%",
        overflowY: "scroll",
      }}
    >
      {!prop.new_ &&
        !prop.view &&
     
        todo.map((e) => (
          <div
            key={Math.random().toString()}
            style={{
              backgroundColor: "rgb(128, 128, 128, 0.149)",
              minHeight: "60px",
              width: "calc(100% - 20px)",
              padding: "10px",
              boxSizing: "border-box",
              display: "flex",
              marginBottom: "5px",
            }}
          >
            <div
              key={Math.random().toString()}
              style={{
                backgroundColor: "rgb(128, 128, 128, 0.149)",
                minHeight: "60px",
                width: "calc(100% - 40px)",

                boxSizing: "border-box",
              }}
              onClick={() => {
                prop.dispatch({type:"_",
                arr:  [
                  {
                    type: "view",
                    action: { view: { id: e.id } },
                  },
                ]});
              }}
            >
              <div>
                <h3 style={{ padding: "0px", margin: "0px" }}>
                  {e.title.slice(0, 20) + "....."}
                </h3>
              
                <div
                  style={{
                    padding: "0px",
                    margin: "0px",
                    fontSize: "14px",
                    color: "grey",
                  }}
                  className="time"
                >
                  {e.date}
                </div>
              </div>
            </div>
            <button
              style={{
                border: "none",
                outline: "none",
                backgroundColor: "inherit",
              }}
              onClick={(e) => {
                e.nativeEvent.cancelBubble = true;
                e.isPropagationStopped();
              
                let todo_ = [...todo];
                let index = todo_.findIndex(a=>a.id==e.id)
                todo_.splice(index, 1);
                localStorage.setItem("todo", JSON.stringify(todo_));
                setTodo(todo_);
              }}
            >
              🚮
            </button>
          </div>
        ))}

      {(prop.new_ || prop.view) && (
        <Todo  />
      )}
    </div>
  );
};


export default connect((state) => ({ ...state }), (dispatch) => ({
  dispatch:(obj)=>{dispatch(obj)}
}))(Todoui)
