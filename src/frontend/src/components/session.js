import React, {useState, useEffect, useRef} from "react";
import './component.css';

function Session({id, currSessionID, sessionList, setSessionList, setCurrSessionId}) {
    const [isEditing, setIsEditing] = useState(false);
    const [input, setInput] = useState('');
    
    const pRef = useRef(null);

    useEffect(() => {
      if (pRef.current) {
        pRef.current.focus();
      }
    }, []);

    function changeName(name){
        const tmp = sessionList.slice();
        tmp[id].name = name;
        setSessionList(tmp);
    }

    var className;
    if (id === currSessionID)
        className = 'Session_Selected'
    else
        className = 'Session_Unselected'
        
    return (
        <div className={className} onClick={()=>setCurrSessionId(id)}>
            {!isEditing ?
                <p>{sessionList[id].name}</p> :
                <input value={input} onChange={(e) => setInput(e.target.value) }/>
            }
            {id == currSessionID ? 
                !isEditing ? 
                    <button onClick={()=>{setIsEditing(true); setInput(sessionList[id].name)}}>edit</button> 
                    : 
                    <>
                    <button onClick={(e)=>{setIsEditing(false); changeName(input); }}>confirm</button>
                    <button onClick={()=>{setIsEditing(false);}}>cancel</button> 
                    </>
                :
                    <></>
            }
        </div>
    )
    
}

export default Session;