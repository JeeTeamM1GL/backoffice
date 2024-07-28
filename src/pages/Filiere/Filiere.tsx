import React, { useEffect, useState } from 'react';
import { deleteActions, getActions } from '../../actions/actions.ts';
import { endpoints } from '../../constants/endpoints.constants.ts';
import axios from 'axios';
import Card from 'antd/es/card/Card';
import { Button, Flex, Input, message, Modal, Popconfirm, Space, Table, TableProps } from 'antd';
import Title from 'antd/es/typography/Title';
import { DeleteOutlined, EditOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import AddFiliere from '../../components/AddFiliere.tsx';
import { IFiliere } from '../../interfaces/interfaces.ts';
import { formatDate } from '../../utils/helpers.ts';

function Filieres() {
    const [dataSource , setDataSource] = useState([]);
    const [loading , setLoading] = useState(false);
    const [refetch,setRefetch] = useState<number>(0);

    const onRefresh  = () => {
        setRefetch(Date.now())
    }
    useEffect(() => {
        setLoading(true)
        getActions(endpoints.filiere.LIST)
        .then((response : any)=>{
            //console.log(response)
            setDataSource(response?.data)
        })
        .finally(()=>{
            setLoading(false)
        })

      return () => {

      }
    }, [refetch])
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
        deleteActions(endpoints.filiere.DELETE + "/" + id)
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
            render: (record) => <a>{formatDate(record)}</a>,
        },
        {
            title: 'Dernière modification',
            dataIndex: 'updateAt',
            key: 'updateAt',
            render: (record) => <a>{formatDate(record)}</a>,
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
                <Space>
                    <Button type="primary" onClick={onRefresh} icon={<ReloadOutlined/>} ghost />
                    <Button type="primary" onClick={addModal}>Nouveau</Button>
                </Space>
            </Flex>
            <br />
            <Table columns={columns} dataSource={dataSource || []} />
            <Modal footer={null} title={<Title level={4}>{operation === "add" ? "Nouvelle filière" : "Modifier filière"}</Title>} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
                <AddFiliere operation={operation} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} currentRecord={currentRecord} onRefresh={onRefresh} />
            </Modal>
        </Card>
    );
}

export default Filieres;
