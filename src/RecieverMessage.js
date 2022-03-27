import React, { useState, useEffect } from 'react';

const RecieverMessage = ({ text, sendTime, messagesEndRef }) => {
    let date = new Date(sendTime);
    date = date.toLocaleString();
    return <>
        <div className="media w-50 ml-auto mb-3">
            <div className="media-body">
                <div className="bg-primary rounded py-2 px-3 mb-2">
                    <p className="text-small mb-0 text-white">{text}</p>
                </div>
                <p className="small text-muted">{date}</p>
            </div>
        </div>
    </>
}

export default RecieverMessage;