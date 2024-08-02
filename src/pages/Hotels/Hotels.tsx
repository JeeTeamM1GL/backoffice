import React, { useEffect, useState } from 'react'
import Card from 'antd/es/card/Card';
import { Button, Flex, Image, Input, List, message, Modal, Popconfirm, Space, Table, TableProps } from 'antd';
import Title from 'antd/es/typography/Title';
import { DeleteOutlined, EditOutlined, EyeOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Hotel } from '../../interfaces/interfaces.ts';
import { formatDate } from '../../utils/helpers.ts';
import SearchBar from '../../components/SearchBar.tsx';
import AddHotel from '../../components/AddHotel.tsx';
import { useNavigate } from 'react-router-dom';
import { _deleteHotel, _getAllHotels } from '../../actions/hotels.actions.ts';





function Hotels() {
    const navigate = useNavigate();
    const [dataSource , setDataSource] = useState([]);
    const [dataSourceCopy , setDataSourceCopy] = useState([]);
    const [loading , setLoading] = useState(false);
    const [refetch,setRefetch] = useState<number>(0);

    const onRefresh  = () => {
        setRefetch(Date.now())
    }
    useEffect(() => {
        setLoading(true)
        _getAllHotels()
            .then((response : any)=>{
                //console.log(response)
                setDataSource(response?.data)
                setDataSourceCopy(response?.data)
            })
            .finally(()=>{
                setLoading(false)
            })

        return () => {

        }
    }, [refetch])

    const [operation, setOperation] = useState<string>("")
    const [currentRecord, setCurrentRecord] = useState<Hotel | any>(null)

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const addModal = () => {
        setIsModalOpen(true);
        setOperation("add")
        setCurrentRecord(null)
    };

    const updateModal = (record: Hotel) => {
        setIsModalOpen(true);
        setOperation("update")
        setCurrentRecord(record)

    };
    const onDelete = (id: any) => {
        _deleteHotel(id)
            .then((res) => {
                    if (res?.status === 200) {
                        message.success('Elément retiré avec succès')
                        onRefresh();
                    }
                }
            )

    };

    const viewDetails = (id: string | undefined) => {
        navigate('/layout/hotels/details-hotel',{state : {
            id 
        }})

    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns: TableProps<Hotel | any>['columns'] = [
        {
            title: '',
            dataIndex: 'cover',
            render: (record) => <Image src={record} alt='HOTEL' style={{height:50, width: 50 ,objectFit:"cover"}} />,
        },
        {
            title: 'Nom',
            dataIndex: 'name',
            key: 'name',
            render: (record) => <a>{record}</a>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width : 250 ,
            ellipsis : true
        },
        /*{
            title: 'Nb chambres',
            dataIndex: 'rooms_count',
            key: 'rooms_count',
            
        },*/
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
                    <Button type="text" onClick={() => { viewDetails(record?.id) }} icon={<EyeOutlined />} />
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
            <Title level={4}>Hotels</Title>
            <Flex justify="space-between" flex={1} align="center">
                {/* <Input prefix={<SearchOutlined />} placeholder="Rechercher" style={{ width: "300px" }} /> */}
                <SearchBar
                    data={dataSource}
                    listKeys={["name"]}
                    setDataCopy={setDataSourceCopy}
                />
                <Space>
                    <Button type="primary" onClick={onRefresh} icon={<ReloadOutlined/>} ghost />
                    <Button type="primary" onClick={addModal}>Nouveau</Button>
                </Space>
            </Flex>
            {/* <br />
            <List
                loading={loading}
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 12,
                }}
                grid={{ gutter: 16, column: 4 }}
                dataSource={dataSourceCopy}
                renderItem={(item: Hotel) => (
                    <List.Item >
                        <CategoryFolder
                            name={item?.nom as string}
                        />
                    </List.Item>
                )}
            /> */}
            <br />
            <Table
                loading={loading}
                columns={columns}
                dataSource={dataSourceCopy}
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



            <Modal footer={null} title={<Title level={4}>{operation === "add" ? "Nouvel Hotel" : "Modifier les informations de l'hotel"}</Title>} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
                <AddHotel operation={operation} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} currentRecord={currentRecord} onRefresh={onRefresh} />
            </Modal>
        </Card>

    )
}

export default Hotels