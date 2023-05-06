import React from "react";
import Session from "./session.js";
import { MdAdd } from 'react-icons/md';

function SessionList({sessionList, currSessionIdx, setSessionList, setCurrSessionIdx}) {
    return (
        <div className="h-full w-full flex flex-col space-y-2">
            <div className="flex items-center hover:bg-ungu3 border-white border p-1 rounded-lg" onClick={() => setCurrSessionIdx(-1)}>
                <MdAdd className='m-2 text-white' />
                <p className='text-white'>New Session</p>
            </div>
            <div className='flex-1 flex flex-col space-y-2 overflow-auto min-w-0 scroll-m-1.5 scroll-smooth scrollbar-thin scrollbar-track-white scrollbar-thumb-ungu1 scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg'>
                {sessionList.slice().reverse().map((sessionInfo, idx) => (
                    <Session key={idx} idx={sessionList.length-1-idx} currSessionIdx={currSessionIdx} sessionList={sessionList} setSessionList={setSessionList} setCurrSessionIdx={setCurrSessionIdx} />
                ))}
            </div>
        </div>
    )
}

export default SessionList;