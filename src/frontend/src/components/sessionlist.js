import React from "react";
import Session from "./session.js";

function SessionList({sessionList, currSessionID, setSessionList, setCurrSessionId}) {
    return (
        <>
            <div className='SessionList'>
                <button onClick={() => setCurrSessionId(-1)}>New Session</button>
                {sessionList.map((sessionInfo, idx) => (
                    <Session id={idx} currSessionID={currSessionID} sessionList={sessionList} setSessionList={setSessionList} setCurrSessionId={setCurrSessionId} />
                ))}
            </div>
        </>
    )
}

export default SessionList;