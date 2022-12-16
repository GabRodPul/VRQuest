import React from 'react'
import PropTypes from 'prop-types'

import Table from "react-bootstrap/Table"
import { FunctionComponent } from 'react'

type TableProps = {
    type: any,
    dataObjs: any[],
    children?: any
}

const objectTableData = (obj: Object) => {
    const values = Object.values(obj);
    return values.map((val) => {
        return (<td>{val}</td>)
    })
}

const TableComponent: FunctionComponent<TableProps> = ({ type, dataObjs }) => {
    const typeKeys = Object.keys(type);

    return (
        <>
        <Table striped bordered hover>
            <thead>
                <tr>
                    {/* Must use map instead of forEach here since */}
                    {/* forEach doesn't return anything */}
                    {typeKeys.map((key) => {
                        return (<th>{key}</th>)
                    })}
                </tr>
            </thead>
            <tbody>
                {dataObjs.map((obj: Object) => {
                    return (
                        <tr>
                            {objectTableData(obj)}
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        </>
    )
}

export default TableComponent
