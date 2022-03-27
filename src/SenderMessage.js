import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';


function accountColor(name) {
    let asciiCode = name?.charCodeAt(0)
    let colorIndex;
    if (asciiCode >= 97) {
        colorIndex = asciiCode - 97;
    } else {
        colorIndex = asciiCode - 65;
    }
    let colors = ["008000", "0000FF", "800080", "800080", "FF00FF", "008080", "FFFF00", "808080", "00FFFF",
        "000080",
        "800000", "FF3939", "7F7F00", "C0C0C0", "FF6347", "FFE4B5", "33023", "B8860B", "C04000",
        "6B8E23", "CD853F", "C0C000", "228B22", "D2691E", "808000", "20B2AA", "F4A460", "00C000",
        "8FBC8B", "B22222", "843A05", "C00000"]
    return "#" + colors[colorIndex];
}

const SenderMessage = ({ text, sendTime, messagesEndRef, otherUsername }) => {
    let date = new Date(sendTime);
    date = date.toLocaleString();
    let color = accountColor(otherUsername)
    return <>
        <div className="media w-50 mb-3">
            <Avatar style={{ backgroundColor: color }}>
                {otherUsername?.toUpperCase().charAt(0)}
            </Avatar>
            <div className="media-body ml-3">
                <div className="bg-light rounded py-2 px-3 mb-2">
                    <p className="text-small mb-0 text-muted">{text}</p>
                </div>
                <p className="small text-muted">{date}</p>
            </div>
        </div>
    </>
}

export default SenderMessage;