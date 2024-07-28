import React, { useEffect, useState } from 'react'
import { deleteActions, getActions } from '../../actions/actions.ts';
import { endpoints } from '../../constants/endpoints.constants.ts';
import axios from 'axios';
import Card from 'antd/es/card/Card';
import { Button, Flex, Input, message, Modal, Popconfirm, Space, Table, TableProps } from 'antd';
import Title from 'antd/es/typography/Title';
import { DeleteOutlined, EditOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import AddCategory from '../../components/AddCategory.tsx';
import { ICategorie, IEncadreur } from '../../interfaces/interfaces.ts';
import { formatDate } from '../../utils/helpers.ts';
import SearchBar from '../../components/SearchBar.tsx';



function Encadreur() {
    const [encadreurs , setEncadreurs] = useState([]);
    const [encadreursCopy , setEncadreursCopy] = useState([]);
    const [loading , setLoading] = useState(false);
    const [refetch,setRefetch] = useState<number>(0);

    const onRefresh  = () => {
        setRefetch(Date.now())
    }
    useEffect(() => {
        setLoading(true)
        getActions(endpoints.encadreurs.LIST)
        .then((response : any)=>{
            //console.log(response)
            setEncadreurs(response?.data)
            setEncadreursCopy(response?.data)
        })
        .finally(()=>{
            setLoading(false)
        })

      return () => {

      }
    }, [refetch])

    const [operation, setOperation] = useState<string>("")
    const [currentRecord, setCurrentRecord] = useState<IEncadreur | any>(null)

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const addModal = () => {
        setIsModalOpen(true);
        setOperation("add")
        setCurrentRecord(null)
    };

    const updateModal = (record: IEncadreur) => {
        setIsModalOpen(true);
        setOperation("update")
        setCurrentRecord(record)

    };

    const onDelete = (id: any) => {
        deleteActions(endpoints.encadreurs.DELETE + "/" + id)
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

    const columns: TableProps<IEncadreur | any>['columns'] = [
        // {
        //     title: 'Nom',
        //     dataIndex: 'nom',
        //     key: 'nom',
        //     render: (record) => <a>{record}</a>,
        // },
        {
            title: 'Spécialité',
            dataIndex: 'specialite',
            key: 'specialite',
            width : 250 ,
            ellipsis : true
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


    return (
        <Card>
            <Title level={4}>Encadreurs</Title>
            <Flex justify="space-between" flex={1} align="center">
                {/* <Input prefix={<SearchOutlined />} placeholder="Rechercher" style={{ width: "300px" }} /> */}
                <SearchBar 
                    data={encadreurs}
                    listKeys={["nom"]}
                    setDataCopy={setEncadreursCopy}
                />
                <Space>
                    <Button type="primary" onClick={onRefresh} icon={<ReloadOutlined/>} ghost />
                    <Button type="primary" onClick={addModal}>Nouveau</Button>
                </Space>
            </Flex>
            <br />
            <Table 
                loading={loading} 
                columns={columns} 
                dataSource={encadreursCopy} 
                rowKey={(record)=>record?.id} 
                pagination={{
                    showTotal : ( total , range)=> `${range[0]}-${range[1]} de ${total} éléments`,
                    responsive : true ,
                    pageSize : 5
                }} 
                //size="middle"
                scroll={window.screen.width < 1200 && {
                    x : 1000,
                } as any}
                
            />
            <Modal footer={null} title={<Title level={4}>{operation === "add" ? "Nouvel encadreur" : "Modifier les informations de l'encadreur"}</Title>} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
                {/* <AddCategory operation={operation} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} currentRecord={currentRecord} onRefresh={onRefresh} /> */}
            </Modal>
        </Card>

    )
}

export default Encadreur