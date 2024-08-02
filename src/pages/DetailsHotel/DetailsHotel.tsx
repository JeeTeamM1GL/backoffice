import {Button, Card, Descriptions, Flex, Image, Tabs, TabsProps, Typography} from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Hotel } from '../../interfaces/interfaces.ts';
import Rooms from "../Rooms/Rooms.tsx";
import Reservations from "../Reservations/Reservations.tsx";
import { _getHotel } from '../../actions/hotels.actions.ts';
import { images } from '../../constants/app.constants.ts';
import { formatDate } from '../../utils/helpers.ts';

const {Text, Title} = Typography;
function DetailsHotel() {
    const {state} = useLocation();
    const id = state?.id;
    const [refetch,setRefetch] = useState<number>(0);
    const [loading , setLoading] = useState(false);
    const [record , setRecord] = useState<Hotel>({});

    const onRefresh  = () => {
        setRefetch(Date.now())
    }

    const items: TabsProps['items'] = [
        {
            key : '1',
            label: 'Infos détaillées',
            children: <div>
                <Flex align='center' justify='flex-end' >
                    <Button onClick={onRefresh} >Actualiser</Button>
                </Flex>
                <br />
                <Title level={3} > {record?.name} </Title>

                <Descriptions
                    bordered
                    layout='vertical'
                    items={[
                        {
                            key: '1',
                            label: 'Image',
                            children: (
                                <Image src={record?.cover} fallback={images.default} width={150} height={150} style={{borderRadius:4,objectFit:"cover"}} />
                            ),
                            span : 1,
                        },
                        {
                            key: '2',
                            label: 'Description',
                            children: record?.description ,
                            span : 2,
                        },
                        {
                            key: '3',
                            label: 'Nombre de chambres',
                            children: record?.rooms_count,
                        },
                        {
                            key: '4',
                            label: 'Pays',
                            children: record?.location?.country,
                        },
                        {
                            key: '5',
                            label: 'Ville',
                            children: record?.location?.city,
                        },

                        {
                            key: '6',
                            label: 'Adresse',
                            children: record?.location?.address ,
                        },

                        {
                            key: '7',
                            label: 'Coordonnées GPS',
                            children: record?.gps_coordinate ,

                        },
                        {
                            key: '8',
                            label: 'Date de création',
                            children: (record?.createdAt && formatDate(record?.createdAt)) || "Date non renseignée",
                        },
                        {
                            key: '9',
                            label: 'Dernière modification',
                            children: (record?.updatedAt && formatDate(record?.createdAt)) || "Pas de mise à jour",
                        }
                    ]}
                />
            </div>
        },
        {
            key: '2',
            label: 'Chambres',
            children: <Rooms hotelId={id} />,
        },

        {
            key: '3',
            label: 'Réservations',
            children: <Reservations hotelId={id} /> ,
        }
    ];
    

    useEffect(() => {
        setLoading(true)

        _getHotel(id)
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


            <Tabs items={items} /> 

        </Card>
    )
}

export default DetailsHotel