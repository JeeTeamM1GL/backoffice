import React, { useEffect, useState } from 'react'
import { deleteActions, getActions } from '../../actions/actions.ts';
import { endpoints } from '../../constants/endpoints.constants.ts';
import axios from 'axios';
import Card from 'antd/es/card/Card';
import { Button, Flex, Input, message, Modal, Popconfirm, Space, Table, TableProps } from 'antd';
import Title from 'antd/es/typography/Title';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import AddCategory from '../../components/AddCategory.tsx';
import { ICategorie } from '../../interfaces/interfaces.ts';
import { formatDate } from '../../utils/helpers.ts';



const data: ICategorie[] = [
    {
        nom: "Securité",
        description: "parlons sécurité",
        createdAt: new Date()
    },
    {
        nom: "Resau",
        description: "parlons résau",
        createdAt: new Date()
    }
];


function Categories() {
    // const [categories , setCategories] = useState([]);
    // const [loading , setLoading] = useState(false);
    // useEffect(() => {
    //     setLoading(true)
    //     getActions(endpoints.categories.LIST)
    //     .then((response : any)=>{
    //         console.log(response)
    //         //setCategories(response?.data)
    //     })
    //     .finally(()=>{
    //         setLoading(false)
    //     })

    //   return () => {

    //   }
    // }, [])

    const [operation, setOperation] = useState<string>("")
    const [currentRecord, setCurrentRecord] = useState<ICategorie | any>(null)

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const addModal = () => {
        setIsModalOpen(true);
        setOperation("add")
        setCurrentRecord(null)
    };

    const updateModal = (record: ICategorie) => {
        setIsModalOpen(true);
        setOperation("update")
        setCurrentRecord(record)

    };
    const onDelete = (id: any) => {
        deleteActions(endpoints.categories.DELETE + "" + id)
            .then((res) => {
                if (res?.data?.status === 200) {
                    message.success('Categorie suprimer avec succes')
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

    const columns: TableProps<ICategorie | any>['columns'] = [
        {
            title: 'Nom',
            dataIndex: 'nom',
            key: 'nom',
            render: (record) => <a>{record}</a>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
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
                        // onCancel={}
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
            <Title level={4}>Categories</Title>
            <Flex justify="space-between" flex={1} align="center">
                <Input prefix={<SearchOutlined />} placeholder="Rechercher" style={{ width: "300px" }} />
                <Button type="primary" onClick={addModal}>Nouveau</Button>
            </Flex>
            <br />
            <Table columns={columns} dataSource={data} />
            <Modal footer={null} title={<Title level={4}>{operation === "add" ? "Nouvelle categorie" : "Modifier categorie"}</Title>} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
                <AddCategory operation={operation} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} currentRecord={currentRecord} />
            </Modal>
        </Card>

    )
}

export default Categories