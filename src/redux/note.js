import react ,{useState,useContext, useEffect} from "react"
import "./css.css"
// import { Contextapi } from "./contextapi";
import { Provider, connect } from "react-redux";

let Note =  connect((state) => ({ ...state }), (dispatch) => ({
  dispatch:(obj)=>{dispatch(obj)}
}))( (prop) => {
    


    
    let [note, setNote] = useState({
        title: "",
        date:"",
        note:""
    })
  useEffect(() => {
    
        let obj = JSON.parse(localStorage.getItem("note"));
   ;
      obj
        ? (() => {
          
              if (prop.view && prop.view.view) {
                  
                  let a = obj.find((e) => e.id == prop.view.view.id);
              
                  if (a) {
                    setNote(a);
                  }
              }
          })()
        : (() => {})();
    }, [prop]);
    
// let note = false
    // useEffect()
   
    let setNotes = (value, type) => {
       
       
        let note2 = { ...note };
         if (!note2) {
           note2 = {};
        }
        
        
        switch (type) {
            case "title":
                 note2.title = value
                
                break;
            case "note":
                  note2.note = value;
                
                break;
            case "time":
                  note2.time = value;
                
                break;
            
        }

        
         setNote(note2);
        
        
        
    }
  return (
    (prop.new_ || prop.view) && (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          backgroundColor: "black",
          top: "0px",
        }}
      >
        <div>
          <button
            style={{
              margin: "10px 0px",
            }}
            onClick={() => {
              let commands = { type:"_",arr: [{ type: "view", action: false }, { type: "new", action:false}] };
                
                prop.dispatch(commands);
              
            
            }}
          >
            back
          </button>

          {/* <div>:</div> */}
        </div>
        <div className="time">{note.date}</div>
        <div className="note">
          <input
            placeholder="Title"
            className="title"
            value={note.title}
            style={{
              height: "50px",
              backgroundColor: "rgb(128, 128, 128, 0.149)",
              border: "none",
              width: "100%",
              color: "white",
              marginBottom: "5px",
            }}
            onChange={(e) => {
              setNotes(e.currentTarget.value, "title");
            }}
          ></input>
          <textarea
            onChange={(e) => {
              setNotes(e.currentTarget.value, "note");
            }}
            value={note.note}
            style={{
              width: "100%",
              backgroundColor: "rgb(128, 128, 128, 0.149)",
              height: "calc(100% - 50px)",
              border: "none",
              minHeight: "300px",
              color: "white",
            }}
          ></textarea>
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
             
                let commands = [
                  { type: "setvalue", action: { obj: note, store: "note" } },
                  { type: "new" ,action:false},
                  { type: "view", action: false },
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


let Noteui = (prop) => {


  
      let [note, setNote] = useState([]);

    useEffect(() => {
        let obj = JSON.parse(localStorage.getItem("note"));
        if (obj) {
            
            if (prop.search != "") {
                obj = obj.filter(e => {
                    if (e.title.includes(prop.search) || e.note.includes(prop.search)) {
                        return true
                    }
                    else {
                        return false
                    }
                })
            }
            setNote(obj)
        }

    },[ prop]);
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
    
          note.map((e) => (
              <div
                  key ={Math.random().toString()}
              style={{
                backgroundColor: "rgb(128, 128, 128, 0.149)",
                minHeight: "60px",
                width: "calc(100% - 20px)",
                padding: "10px",
                  boxSizing: "border-box",
                display:"flex",
                marginBottom: "5px",
              }}
             
            >
              <div
                  key ={Math.random().toString()}
              style={{
                backgroundColor: "rgb(128, 128, 128, 0.149)",
                minHeight: "60px",
                width: "calc(100% - 40px)",
               
                boxSizing: "border-box",
              
              }}
              onClick={() => {
                prop.dispatch({
                  type: "_", arr: [{
                    type: "view",
                    action: { view: { id: e.id } },
                  }]
                });
              }}
            >
              <div>
                <h3 style={{ padding: "0px", margin: "0px" }}>
                  {e.title.slice(0, 20) + "....."}
                </h3>
                <p style={{ padding: "0px", margin: "0px", margin: "7px 0px" }}>
                  {e.note.slice(0, 100) + "....."}
                </p>
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
                  <button style={{
                      border:"none",
                      outline:"none",
                      backgroundColor:"inherit"
                  }}
                      onClick={(e) => {
                          e.nativeEvent.cancelBubble = true
                          e.isPropagationStopped()
                     
                        let note_ = [...note]
                        let index = note_.findIndex(a=>a.id==e.id)
                          note_.splice(index, 1)
                          localStorage.setItem("note",JSON.stringify(note_))
                          setNote(note_)
                  }}
                  >
                      🚮
                  </button>
            </div>
          ))}

            {(prop.new_ || prop.view) && (
                
          <Note  />
        )}
      </div>
    );
}


export default connect((state) => ({ ...state }), (dispatch) => ({
  dispatch:(obj)=>{dispatch(obj)}
}))(Noteui)