import React, { useEffect, useState } from 'react';
import { deleteActions, getActions } from '../../actions/actions.ts';
import { endpoints } from '../../constants/endpoints.constants.ts';
import axios from 'axios';
import Card from 'antd/es/card/Card';
import { Button, Flex, Input, message, Modal, Popconfirm, Space, Table, TableProps } from 'antd';
import Title from 'antd/es/typography/Title';
import { DeleteOutlined, EditOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import AddBibliothecaire from '../../components/AddBibliothecaire.tsx';
import { IBibliothecaire } from '../../interfaces/interfaces.ts';
import { formatDate } from '../../utils/helpers.ts';

function Bibliothecaires() {
    const [bibliothecaires , setBibliothecaires] = useState([]);
    const [loading , setLoading] = useState(false);
    const [refetch, setRefetch] = useState<number>(0);

    const onRefresh = () => {
        setRefetch(Date.now())
    }
    useEffect(() => {
        setLoading(true)
        getActions(endpoints.bibliothecaires.LIST)
        .then((response : any)=>{
            //console.log(response)
            setBibliothecaires(response?.data)
        })
        .finally(()=>{
            setLoading(false)
        })

      return () => {

      }
    }, [refetch])
    const [operation, setOperation] = useState<string>("");
    const [currentRecord, setCurrentRecord] = useState<IBibliothecaire | any>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const addModal = () => {
        setIsModalOpen(true);
        setOperation("add");
        setCurrentRecord(null);
    };

    const updateModal = (record: IBibliothecaire) => {
        setIsModalOpen(true);
        setOperation("update");
        setCurrentRecord(record);
    };

    const onDelete = (id: any) => {
        deleteActions(endpoints.admin.DELETE + "/" + id)
            .then((res) => {
                if (res?.status === 200) {
                    message.success('Elément retiré avec succès')
                    onRefresh();
                }
            }
            )
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns: TableProps<IBibliothecaire | any>['columns'] = [
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
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="text" onClick={() => { updateModal(record as any) }} icon={<EditOutlined />} />
                    <Popconfirm
                        title="Supprimer l'élement"
                        description="Etes-vous sur de continuer?"
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
            <Title level={4}>Bibliothécaires</Title>
            <Flex justify="space-between" flex={1} align="center">
                <Input prefix={<SearchOutlined />} placeholder="Rechercher" style={{ width: "300px" }} />
                <Space>
                    <Button type="primary" onClick={onRefresh} icon={<ReloadOutlined />} ghost />
                    <Button type="primary" onClick={addModal}>Nouveau</Button>
                </Space>
            </Flex>
            <br />
            <Table columns={columns} dataSource={[]} />
            <Modal footer={null} title={<Title level={4}>{operation === "add" ? "Nouveau bibliothécaire" : "Modifier bibliothécaire"}</Title>} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
                <AddBibliothecaire operation={operation} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} currentRecord={currentRecord} onRefresh={onRefresh} />
            </Modal>
        </Card>
    );
}

export default Bibliothecaires;
