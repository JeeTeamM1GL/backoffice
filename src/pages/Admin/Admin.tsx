import React, { useEffect, useState } from 'react';
import { deleteActions, getActions } from '../../actions/actions.ts';
import { endpoints } from '../../constants/endpoints.constants.ts';
import axios from 'axios';
import Card from 'antd/es/card/Card';
import { Button, Flex, Input, message, Modal, Popconfirm, Space, Table, TableProps } from 'antd';
import Title from 'antd/es/typography/Title';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import AddAdmin from '../../components/AddAdmin.tsx';
import { IAdmin } from '../../interfaces/interfaces.ts';
import { formatDate } from '../../utils/helpers.ts';

function Admins() {
        // const [admins , setAdmins] = useState([]);
    // const [loading , setLoading] = useState(false);
    // useEffect(() => {
    //     setLoading(true)
    //     getActions(endpoints.categories.LIST)
    //     .then((response : any)=>{
    //         console.log(response)
    //         //setAdmins(response?.data)
    //     })
    //     .finally(()=>{
    //         setLoading(false)
    //     })

    //   return () => {

    //   }
    // }, [])
    const [operation, setOperation] = useState<string>("");
    const [currentRecord, setCurrentRecord] = useState<IAdmin | any>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const addModal = () => {
        setIsModalOpen(true);
        setOperation("add");
        setCurrentRecord(null);
    };

    const updateModal = (record: IAdmin) => {
        setIsModalOpen(true);
        setOperation("update");
        setCurrentRecord(record);
    };

    const onDelete = (id: any) => {
        deleteActions(endpoints.users.DELETE + "" + id)
            .then((res) => {
                if (res?.data?.status === 200) {
                    message.success('Admin supprimé avec succès');
                }
            });
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns: TableProps<IAdmin | any>['columns'] = [
        {
            title: 'Nom',
            dataIndex: 'lastname',
            key: 'lastname',
            render: (record) => <a>{record}</a>,
        },
        {
            title: 'Prénom',
            dataIndex: 'firstname',
            key: 'firstname',
        },
        {
            title: 'Nom d\'utilisateur',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="text" onClick={() => { updateModal(record as any) }} icon={<EditOutlined />} />
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => onDelete(record?.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="text" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Card>
            <Title level={4}>Admins</Title>
            <Flex justify="space-between" flex={1} align="center">
                <Input prefix={<SearchOutlined />} placeholder="Rechercher" style={{ width: "300px" }} />
                <Button type="primary" onClick={addModal}>Nouveau</Button>
            </Flex>
            <br />
            <Table columns={columns} dataSource={[]} />
            <Modal footer={null} title={<Title level={4}>{operation === "add" ? "Nouvel admin" : "Modifier admin"}</Title>} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
                <AddAdmin operation={operation} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} currentRecord={currentRecord} />
            </Modal>
        </Card>
    );
}

export default Admins;
