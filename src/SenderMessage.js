import React, { useState, useEffect } from 'react';

const SenderMessage = ({ text, sendTime, messagesEndRef }) => {
    return <>
        <div className="media w-50 mb-3"><img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50" className="rounded-circle" />
            <div className="media-body ml-3">
                <div className="bg-light rounded py-2 px-3 mb-2">
                    <p className="text-small mb-0 text-muted">{text}</p>
                </div>
                <p className="small text-muted">{sendTime}</p>
            </div>
        </div>
    </>
}

export default SenderMessage;