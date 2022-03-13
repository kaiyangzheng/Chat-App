import React, { useState, useEffect } from 'react';

import ClipLoader from 'react-spinners/ClipLoader'

const PeopleList = ({ chats, userIdInChats, users, setSelectedChat }) => {

    return <>
        {chats?.map((chat, index) => {
            const { id } = chat;
            let name = users.filter((user) => { return user.id == userIdInChats[index] })[0]?.name;
            return <>
                <button href="#" className="list-group-item list-group-item-action list-group-item-light rounded-0" key={id} onClick={() => { setSelectedChat(chats.filter((chat) => { return chat.id == id })[0]); }} >
                    <div className="media" ><img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user" width="50" className="rounded-circle" />
                        <div className="media-body ml-4">
                            <div className="d-flex align-items-center justify-content-between mb-1">
                                <h6 className="mb-0">{name}</h6><small className="small font-weight-bold">25 Dec</small>
                            </div>
                            <p className="font-italic mb-0 text-small">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
                        </div>
                    </div>
                </button>
            </>
        })}
    </>
}

export default PeopleList;  