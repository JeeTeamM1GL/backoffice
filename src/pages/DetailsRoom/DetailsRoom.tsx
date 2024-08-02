import {Button, Card, Col, Descriptions, Flex, Image, Row, Tabs, Tag, Typography} from 'antd'
import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
import {  Reservation, Room } from '../../interfaces/interfaces';
import { _getHotel } from '../../actions/hotels.actions.ts';
import { images } from '../../constants/app.constants.ts';
import { formatDate } from '../../utils/helpers.ts';
import { _getReservation } from '../../actions/reservations.actions.ts';
import { _getRoom } from '../../actions/rooms.actions.ts';
import {ArrowLeftOutlined} from "@ant-design/icons";

const {Text, Title} = Typography;
function DetailsRoom() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const id = state?.id;
    const [refetch,setRefetch] = useState<number>(0);
    const [loading , setLoading] = useState(false);
    const [record , setRecord] = useState<Room>({});

    const onRefresh  = () => {
        setRefetch(Date.now())
    }
    const goBack  = () => {
        navigate(-1);
    }

    useEffect(() => {
        setLoading(true)

        _getRoom(id)
            .then((response : any)=>{
                //console.log(response)
                setRecord(response?.data)
            })
            .finally(()=>{
                setLoading(false)
            })

        return () => {

        }
    }, [refetch])


    return (
        <Card bordered={false} loading={loading} >
            <Flex align='center' justify='space-between' >
                <Button type="primary" ghost onClick={goBack} icon={<ArrowLeftOutlined/>} >Retour</Button>
                <Button onClick={onRefresh} >Actualiser</Button>
            </Flex>
            <br />
            <Title level={3} > Détails Chambre </Title>

            <Descriptions 
                bordered 
                layout='vertical'
                items={[
                    {
                        key: '1',
                        label: 'Numéro de chambre',
                        children: record?.num_room
                    },
                    {
                        key: '2',
                        label: 'Type de chambre',
                        children: record?.room_type ,
                    },
                    {
                        key: '3',
                        label: 'Prix par nuit',
                        children: <Text> {record?.price_per_night || 0}$ </Text>,
                    },
                    {
                        key: '4',
                        label: 'Capacité',
                        children: record?.capacity,
                    },
                    {
                        key: '5',
                        label: 'Statut',
                        children: <Tag title={record?.is_available} />,
                    },
                    
                    {
                        key: '6',
                        label: 'Etage',
                        children: record?.etage,
                    },

                    {
                        key: '7',
                        label: 'Surface',
                        children: <Text> {record?.surface || 0} m<sup>2</sup> </Text>  ,

                    },
                    {
                        key: '8',
                        label: 'Equipements',
                        children: <ul>
                            {
                                record?.equipments?.map((item : any,index:number)=>(
                                    <li key={index} > {item} </li>
                                ))
                            }
                        </ul>  ,

                    },
                    {
                        key: '9',
                        label: 'Images',
                        children: <> {
                            record?.images?.length !== 0 &&
                            <Row gutter={[24,24]}>
                                {
                                    record?.images?.map((item:string, index : number )=>(
                                        <Col key={index} xs={24} sm={24} md={6} lg={6} xl={6}>
                                            <Image src={item} fallback={images.default} width={100} height={100} style={{borderRadius:4,objectFit:"cover"}} />
                                        </Col>
                                    ))
                                }
                            </Row>
                        }
                            
                        </> ,
                        span : 3

                    },
                    
                    {
                        key: '10',
                        label: 'Date de création',
                        children: (record?.createdAt && formatDate(record?.createdAt)) || "Date non renseignée",
                    },
                    {
                        key: '11',
                        label: 'Dernière modification',
                        children: (record?.updatedAt && formatDate(record?.createdAt)) || "Pas de mise à jour",
                    }
                ]} 
            />

        </Card>
    )
}

export default DetailsRoom