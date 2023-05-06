import React, {useState} from "react";
import { MdModeEdit, MdCheck, MdCancel } from 'react-icons/md';
import axios from 'axios';

function Session({idx, currSessionIdx, sessionList, setSessionList, setCurrSessionIdx}) {
    const [isEditing, setIsEditing] = useState(false);
    const [input, setInput] = useState('');

    function changeName(name){
        const tmp = sessionList.slice();
        tmp[idx].name = name;
        setSessionList(tmp);
        axios.put(`http://localhost:3000/session/${tmp[idx].id}`, {newName : name});
    }

    var className;

    const isSelected = (idx === currSessionIdx);

    if (isSelected)
        className = 'bg-ungu1.5 rounded-lg'
    else
        className = 'bg-ungu2 hover:bg-ungu1.5 rounded-lg  '
        
    return (
        <div className={className + " flex flex-row h-10 items-center p-2"} onClick={()=>{ if (!isSelected) setIsEditing(false); setCurrSessionIdx(idx)}}>
            {!isEditing ?
                <p className="flex-1 truncate">{sessionList[idx].name}</p> :
                <input autoFocus className="flex-auto bg-inherit focus:outline-none min-w-0" value={input} onChange={(e) => setInput(e.target.value) }/>
            }
            {isSelected ? 
                !isEditing ? 
                    <MdModeEdit className="flex-none w-7 text-ungu4 hover:text-ungu3 cursor-pointer" onClick={()=>{setIsEditing(true); setInput(sessionList[idx].name)}}/>
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