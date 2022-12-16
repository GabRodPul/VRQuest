import React from 'react'
import Players from '../components/api/Players'
import TableComponent from '../components/TableComponent'

import { apiCall } from '../shared/ApiCalls'

type Player = {
    pid:      string,
    username: string,
    password: string,
    isAdmin:  boolean
}



function AdminPage() {
    return (
        // <TableComponent 
        //     type={{pid: "", username: "", password: "", isAdmin: false}}
        //     dataObjs={players}>

        // </TableComponent>
        <Players></Players>
    )
}

export default AdminPage