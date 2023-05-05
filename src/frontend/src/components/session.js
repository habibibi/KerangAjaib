import React, {useState} from "react";
import { MdModeEdit, MdCheck, MdCancel } from 'react-icons/md';

function Session({id, currSessionID, sessionList, setSessionList, setCurrSessionId}) {
    const [isEditing, setIsEditing] = useState(false);
    const [input, setInput] = useState('');

    function changeName(name){
        const tmp = sessionList.slice();
        tmp[id].name = name;
        setSessionList(tmp);
    }

    var className;
    if (id === currSessionID)
        className = 'bg-ungu1.5 rounded-lg'
    else
        className = 'bg-ungu2 hover:bg-ungu1.5 rounded-lg  '
        
    return (
        <div className={className + " flex flex-row h-10 items-center p-2"} onClick={()=>{ if (currSessionID !== id) setIsEditing(false); setCurrSessionId(id)}}>
            {!isEditing ?
                <p className="flex-1 truncate">{sessionList[id].name}</p> :
                <input autoFocus className="flex-auto bg-inherit focus:outline-none min-w-0" value={input} onChange={(e) => setInput(e.target.value) }/>
            }
            {id === currSessionID ? 
                !isEditing ? 
                    <MdModeEdit className="flex-none w-7 text-ungu4 hover:text-ungu3 cursor-pointer" onClick={()=>{setIsEditing(true); setInput(sessionList[id].name)}}/>
                    : 
                    <>
                    <MdCheck className="flex-none w-7 text-ungu4 hover:text-ungu3 cursor-pointer" onClick={(e)=>{setIsEditing(false); changeName(input); }}/>
                    <MdCancel className="flex-none w-7 text-ungu4 hover:text-ungu3 cursor-pointer" onClick={()=>{setIsEditing(false);}}/> 
                    </>
                :
                    <></>
            }
        </div>
    )
    
}

export default Session;