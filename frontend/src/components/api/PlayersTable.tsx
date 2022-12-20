import React, { Fragment } from 'react'
import { useEffect, useState } from 'react';

import { Table, Form, Input } from "antd"
import { EditOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons"

import { apiCall } from '../../shared/ApiCalls'

type PlayerData = {
    key?: string;
    pid: string;
    username: string;
    password: string;
};

function PlayersTable() {
    const [players, setPlayers] = useState([]);
    const [editingRow, setEditingRow] = useState<PlayerData>();
    const [form] = Form.useForm();

    const playerColumns = [
        {
            title: "PID",
            dataIndex: "pid",
            key: "pid",
            // render: (text: string, record: PlayerData) => {
            //     if (editingRow?.key !== record.key) {
            //         return <p>{text}</p>
            //     }
            //     return (<Form.Item name="pid"><Input /></Form.Item>)
            // }
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
            render: (text: string, record: PlayerData) => {
                if (editingRow?.key !== record.key) {
                    return <p>{text}</p>
                }
                return (<Form.Item name="username"><Input /></Form.Item>)
            }
        },
        {
            title: "Actions",
            key: "4",
            render: (_: any, record: PlayerData) => {
                return (
                    <>
                        <EditOutlined
                            type="link"
                            onClick={() => {
                                if (record.key === undefined) return;

                                setEditingRow(record)
                                form.setFieldsValue({
                                    username: record.username
                                });
                            }}
                        />
                        <DeleteOutlined
                            style={({ color: "red" })}
                            onClick={() => deletePlayer(record)}
                        />
                        <SaveOutlined style={({color: "red"})} onClick={() => onFinish()}/>
                    </>
                )
            }
        }
    ]

    const getAllPlayers = async () => {
        const res = await fetch("http://localhost:8080/api/players", {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                // "Access-Control-Allow-Origin":"*",
                // "Access-Control-Allow-Credentials":true,
            },
        });
        const data = await res.json();
        setPlayers(data.map((record: PlayerData) => {
            record.key = record.pid
            return record
        }));
    }

    const updatePlayer = async (record: PlayerData) => {
        console.log(record)
        const res = await fetch(`http://localhost:8080/api/players/${record.pid}`, {
            method: "PUT",
            mode: "cors",
            body: JSON.stringify(record),
            // headers {
            //     "Content-Type": "application/json"
            // },
        })
        
        const data = await res.json();
        getAllPlayers();
        // setPlayers(data.map((record: PlayerData) => {
        //     record.key = record.pid
        //     return record
        // }));
    }

    const deletePlayer = async (record: PlayerData) => {
        const res = await fetch(`http://localhost:8080/api/players/${record.pid}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                // "Access-Control-Allow-Origin":"*",
                // "Access-Control-Allow-Credentials":true,
            },
        });
        setPlayers(players.filter((player: PlayerData) => player.pid != record.pid));
    }

    const onFinish = async () => {
        if (editingRow === undefined) return;
        let updatedRow = editingRow;
        updatedRow.username = form.getFieldValue({name: username})
        updatePlayer(updatedRow);
    }

    return (
        <>
            <button onClick={getAllPlayers}>Get all</button>
            <Form form={form} onFinish={onFinish}>
                <Table columns={playerColumns} dataSource={players}></Table>
            </Form>
        </>
    );
}

export default PlayersTable