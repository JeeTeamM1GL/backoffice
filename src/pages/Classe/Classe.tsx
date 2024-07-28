import React, { useEffect, useState } from 'react';
import { deleteActions, getActions } from '../../actions/actions.ts';
import { endpoints } from '../../constants/endpoints.constants.ts';
import axios from 'axios';
import Card from 'antd/es/card/Card';
import { Button, Flex, Input, message, Modal, Popconfirm, Space, Table, TableProps } from 'antd';
import Title from 'antd/es/typography/Title';
import { DeleteOutlined, EditOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import AddClasse from '../../components/AddClasse.tsx';
import { IClasse } from '../../interfaces/interfaces.ts';
import { formatDate } from '../../utils/helpers.ts';
import SearchBar from '../../components/SearchBar.tsx';

function Classes() {
    const [classes , setClasses] = useState([]);
    const [classesCopy , setClassesCopy] = useState([]);
    const [loading , setLoading] = useState(false);
    
    const [operation, setOperation] = useState<string>("");
    const [currentRecord, setCurrentRecord] = useState<IClasse | any>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [refetch,setRefetch] = useState<number>(0);

    const onRefresh  = () => {
        setRefetch(Date.now())
    }

    const addModal = () => {
        setIsModalOpen(true);
        setOperation("add");
        setCurrentRecord(null);
    };

    const updateModal = (record: IClasse) => {
        setIsModalOpen(true);
        setOperation("update");
        setCurrentRecord(record);
    };

    const onDelete = (id: any) => {
        deleteActions(endpoints.classe.DELETE + "" + id)
            .then((res) => {
                if (res?.data?.status === 200) {
                    message.success('Classe supprimée avec succès');
                }
            });
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns: TableProps<IClasse | any>['columns'] = [
        {
            title: 'Nom',
            dataIndex: 'nom',
            key: 'nom',
            render: (record) => <a>{record}</a>,
        },
        {
            title: 'Date de creation',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (record) => <a>{formatDate(record)}</a>,
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
                        // onCancel={}
                        okText="Oui"
                        cancelText="Non"
                    >
                        <Button type="text" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        setLoading(true)
        getActions(endpoints.classe.LIST)
        .then((response : any)=>{
            //console.log(response)
            setClasses(response?.data)
            setClassesCopy(response?.data)
        })
        .finally(()=>{
            setLoading(false)
        })

      return () => {

      }
    }, [refetch])

    return (
        <Card>
            <Title level={4}>Classes</Title>
            <Flex justify="space-between" flex={1} align="center">
                {/* <Input prefix={<SearchOutlined />} placeholder="Rechercher" style={{ width: "300px" }} /> */}
                <SearchBar 
                    data={classes}
                    listKeys={["nom"]}
                    setDataCopy={setClassesCopy}
                />
                <Space>
                    <Button type="primary" onClick={onRefresh} icon={<ReloadOutlined/>} ghost />
                    <Button type="primary" onClick={addModal}>Nouveau</Button>
                </Space>
            </Flex>
            <br />
            <Table loading={loading} columns={columns} dataSource={classesCopy} rowKey={(record)=>record?.id} />
            <Modal footer={null} title={<Title level={4}>{operation === "add" ? "Nouvelle classe" : "Modifier classe"}</Title>} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
                <AddClasse operation={operation} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} currentRecord={currentRecord} onRefresh={onRefresh} />
            </Modal>
        </Card>
    );
}

export default Classes;
