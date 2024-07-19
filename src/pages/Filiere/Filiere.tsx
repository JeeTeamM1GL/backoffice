import React, { useEffect, useState } from 'react';
import { deleteActions, getActions } from '../../actions/actions.ts';
import { endpoints } from '../../constants/endpoints.constants.ts';
import axios from 'axios';
import Card from 'antd/es/card/Card';
import { Button, Flex, Input, message, Modal, Popconfirm, Space, Table, TableProps } from 'antd';
import Title from 'antd/es/typography/Title';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import AddFiliere from '../../components/AddFiliere.tsx';
import { IFiliere } from '../../interfaces/interfaces.ts';
import { formatDate } from '../../utils/helpers.ts';

function Filieres() {
        // const [categories , setClasses] = useState([]);
    // const [loading , setLoading] = useState(false);
    // useEffect(() => {
    //     setLoading(true)
    //     getActions(endpoints.classes.LIST)
    //     .then((response : any)=>{
    //         console.log(response)
    //         //setClasses(response?.data)
    //     })
    //     .finally(()=>{
    //         setLoading(false)
    //     })

    //   return () => {

    //   }
    // }, [])
    const [operation, setOperation] = useState<string>("");
    const [currentRecord, setCurrentRecord] = useState<IFiliere | any>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const addModal = () => {
        setIsModalOpen(true);
        setOperation("add");
        setCurrentRecord(null);
    };

    const updateModal = (record: IFiliere) => {
        setIsModalOpen(true);
        setOperation("update");
        setCurrentRecord(record);
    };

    const onDelete = (id: any) => {
        deleteActions(endpoints.filiere.DELETE + "" + id)
            .then((res) => {
                if (res?.data?.status === 200) {
                    message.success('Filière supprimée avec succès');
                }
            });
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns: TableProps<IFiliere | any>['columns'] = [
        {
            title: 'Intitulé',
            dataIndex: 'intitule',
            key: 'intitule',
            render: (record) => <a>{record}</a>,
        },
        {
            title: 'Date de creation',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (record) => <a>{formatDate(record.toISOString())}</a>,
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
            <Title level={4}>Filières</Title>
            <Flex justify="space-between" flex={1} align="center">
                <Input prefix={<SearchOutlined />} placeholder="Rechercher" style={{ width: "300px" }} />
                <Button type="primary" onClick={addModal}>Nouveau</Button>
            </Flex>
            <br />
            <Table columns={columns} dataSource={[]} />
            <Modal footer={null} title={<Title level={4}>{operation === "add" ? "Nouvelle filière" : "Modifier filière"}</Title>} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
                <AddFiliere operation={operation} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} currentRecord={currentRecord} />
            </Modal>
        </Card>
    );
}

export default Filieres;
