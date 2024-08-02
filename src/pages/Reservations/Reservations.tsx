import React, { useEffect, useState } from 'react'
import { deleteActions, getActions } from '../../actions/actions.ts';
import { endpoints } from '../../constants/endpoints.constants.ts';
import Card from 'antd/es/card/Card';
import {Button, Flex, Image, Input, List, message, Modal, Popconfirm, Space, Table, TableProps, Tag} from 'antd';
import Title from 'antd/es/typography/Title';
import { DeleteOutlined, EditOutlined, EyeOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import {Hotel, Reservation} from '../../interfaces/interfaces.ts';
import { formatDate } from '../../utils/helpers.ts';
import SearchBar from '../../components/SearchBar.tsx';
import { useNavigate } from 'react-router-dom';
import AddRoom from "../../components/AddRoom";
import { _deleteReservation, _getReservationsByHotelId } from '../../actions/reservations.actions.ts';





function Reservations({hotelId} : any) {
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
        _getReservationsByHotelId(hotelId)
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
    const [currentRecord, setCurrentRecord] = useState<Reservation | any>(null)

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
        _deleteReservation(id)
            .then((res) => {
                    if (res?.status === 200) {
                        message.success('Elément retiré avec succès')
                        onRefresh();
                    }
                }
            )

    };

    const viewDetails = (id: string | undefined) => {
        navigate('/layout/hotels/details-hotel/details-reservation',{state : {
            id 
        }})

    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const columns: TableProps<Reservation | any>['columns'] = [
        /*{
            title: '',
            dataIndex: 'cover',
            render: (record) => <Image src={record} alt='HOTEL' style={{height:50, width: 50 ,objectFit:"cover"}} />,
        }, */
        {
            title: 'Chambre',
            dataIndex: 'roomId',
            key: 'roomId',
            render: (record) => <a>{record}</a>,
        },
        {
            title: 'Client',
            dataIndex: 'customerId',
            key: 'customerId',
            render: (record) => <a>{record}</a>,
        },
        {
            title: 'Nbre pers',
            dataIndex: 'personCount',
            key: 'personCount',
        },
        {
            title: 'Prix par nuit',
            dataIndex: 'price_per_night',
            key: 'price_per_night',

        },
        {
            title: 'Statut',
            dataIndex: 'status',
            key: 'status',
            render: (record) => <Tag title={"status"} />
        },
        {
            title: 'Date arrivée',
            dataIndex: 'dateArrivee',
            key: 'dateArrivee',
            render: (record) => <a>{formatDate(record)}</a>,
        },
        {
            title: 'Date départ',
            dataIndex: 'dateDepart',
            key: 'dateDepart',
            render: (record) => <a>{formatDate(record)}</a>,
        },
        /*{
            title: 'Dernière modification',
            dataIndex: 'updateAt',
            key: 'updateAt',
            render: (record) => <a>{formatDate(record)}</a>,
        }, */
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
            <Title level={4}>Réservations</Title>
            <Flex justify="space-between" flex={1} align="center">
                {/* <Input prefix={<SearchOutlined />} placeholder="Rechercher" style={{ width: "300px" }} /> */}
                <SearchBar
                    data={dataSource}
                    listKeys={["price_per_night"]}
                    setDataCopy={setDataSourceCopy}
                />
                <Space>
                    <Button type="primary" onClick={onRefresh} icon={<ReloadOutlined/>} ghost />
                    {/*<Button type="primary" onClick={addModal}>Nouveau</Button>*/}
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



            {/*<Modal footer={null} title={<Title level={4}>{operation === "add" ? "Nouvel Hotel" : "Modifier les informations de l'hotel"}</Title>} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
                <AddRoom operation={operation} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} currentRecord={currentRecord} onRefresh={onRefresh} />
            </Modal> */}
        </Card>

    )
}

export default Reservations