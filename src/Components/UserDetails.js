import { TextField } from '@mui/material'
import React from 'react'

const UserDetails = () => {
    return (
        <>



            <div style={{ display: "flex", flexDirection: "column", width: "100%", margin: "auto" }}>
                <TextField className='uname' type={"text"} id="uname" label="Please Enter Your Full Name Here .." variant="standard" />
                <TextField className='pname' type={"text"} id="pname" label="Project Name" variant="standard" />
                <TextField className='plocation' type={"text"} id="plocation" label="Project Location" variant="standard" />
            </div>
        </>
    )
}

export default UserDetails