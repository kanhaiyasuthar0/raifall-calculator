import { TextField } from '@mui/material'
import React from 'react'

const UserDetails = ({ handleUserData }) => {
    return (
        <>



            <div style={{ display: "flex", flexDirection: "column", width: "100%", margin: "auto" }}>
                <TextField onChange={handleUserData} name={"uname"} className='uname' type={"text"} id="uname" label="Please Enter Your Full Name Here .." variant="standard" />
                <TextField onChange={handleUserData} name={"pname"} className='pname' type={"text"} id="pname" label="Project Name" variant="standard" />
                <TextField onChange={handleUserData} name={"plocation"} className='plocation' type={"text"} id="plocation" label="Project Location" variant="standard" />
            </div>
        </>
    )
}

export default UserDetails