import React from "react";
import Players from "../../components/api/PlayersTable";
import { useEffect, useState } from "react";

import PlayersTable from "../../components/api/PlayersTable"

import { Table, Button } from "antd";

import { apiCall } from "../../shared/ApiCalls";

function AdminPage() {
    return (
        <PlayersTable></PlayersTable>
    )
}

export default AdminPage;
