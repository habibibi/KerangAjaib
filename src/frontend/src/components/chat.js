import React from 'react';
import kerang from '../assets/kerang.png';
import spongebob from '../assets/spongebob.png'
import patrick from '../assets/patrick.png'

function Chat({message}){
    let bg_colour;
    let img;
    if (message.sender === "bot") {
        bg_colour = "bg-ungu1";
        img = kerang;
    } else {
        bg_colour = "bg-ungu0";
        if (message.profileType === 0) {
            img = spongebob;
        } else {
            img = patrick;
        }
    }
    console.log(message.text);

    return (
        <div className={'flex flex-row justify-center py-5 min-h-[7rem] p-4 w-full '+bg_colour}>
            <img src={img} className='flex-none w-10 h-10 rounded-full mr-4 shadow-xl' alt='profile pic' />
            <p className="font-sans text-[#682273] break-words max-w-[40rem] flex-1 whitespace-pre-wrap">{message.text}</p>
        </div>
    )
}

export default Chat;