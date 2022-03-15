import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';


const UserFilter = ({ users, currentUserId, userFormValue, setUserFormValue, handleAddUser }) => {
    const [newUsers, setNewUsers] = useState(users.map(({
        name: label,
        ...rest
    }) => ({
        label,
        ...rest
    })).filter((user) => { return user.id != currentUserId }));

    useEffect(() => {
        setNewUsers(users.map(({
            name: label,
            ...rest
        }) => ({
            label,
            ...rest
        })).filter((user) => { return user.id != currentUserId }))
    }, [users])

    return (
        <>
            <Box component="form" onSubmit={handleAddUser}>
                <Autocomplete disablePortal id="user=filter" options={newUsers} inputValue={userFormValue} onInputChange={async (event, value) => {
                    setUserFormValue(value);
                }} renderInput={(params) => <TextField {...params} label="Add Users" value={userFormValue} onChange={(e) => { setUserFormValue(e.target.value) }} />} />
            </Box>
        </>
    )
}

export default UserFilter;