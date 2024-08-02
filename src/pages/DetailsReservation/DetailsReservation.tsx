import {Button, Card, Descriptions, Flex, Tag, Typography} from 'antd'
import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
import { Reservation } from '../../interfaces/interfaces';
import { formatDate, getTagColor } from '../../utils/helpers.ts';
import { _getReservation } from '../../actions/reservations.actions.ts';
import {ArrowLeftOutlined} from "@ant-design/icons";

const {Text, Title} = Typography;
function DetailsReservation() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const id = state?.id;
    const [refetch,setRefetch] = useState<number>(0);
    const [loading , setLoading] = useState(false);
    const [record , setRecord] = useState<Reservation>({});

    const onRefresh  = () => {
        navigate(-1);
    }

    const goBack  = () => {
        setRefetch(Date.now())
    }

    

    useEffect(() => {
        setLoading(true)

        _getReservation(id)
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
            <Title level={3} > Détails réservation </Title>

            <Descriptions 
                bordered 
                layout='vertical'
                items={[
                    {
                        key: '1',
                        label: 'Hotel',
                        children: record?.hotelId ,
                    },
                    {
                        key: '2',
                        label: 'Client',
                        children: record?.customerId ,
                    },
                    {
                        key: '3',
                        label: 'Chambre',
                        children: record?.roomId ,
                    },
                    
                    {
                        key: '4',
                        label: 'Date arrivée',
                        children: (record?.dateArrivee && formatDate(record?.dateArrivee)) || "Non renseignée",
                    },
                    {
                        key: '5',
                        label: 'Date départ',
                        children: (record?.dateDepart && formatDate(record?.dateDepart)) || "Non renseignée",
                    },
                    {
                        key: '6',
                        label: 'Nombre de personnes',
                        children:  record?.personCount,
                    },
                    {
                        key: '7',
                        label: 'Statut de la réservation',
                        children: <Tag   title={record?.status} color={getTagColor(record?.status)} /> ,
                    },
                    {
                        key: '8',
                        label: 'Moyen de paiement',
                        children: `Paiement par ${record?.moyenPaiement}` ,
                    },
                    {
                        key: '9',
                        label: 'Date de création',
                        children: (record?.createdAt && formatDate(record?.createdAt)) || "Date non renseignée",
                    },
                    {
                        key: '10',
                        label: 'Dernière modification',
                        children: (record?.updatedAt && formatDate(record?.createdAt)) || "Pas de mise à jour",
                    }
                ]} 
            />

        </Card>
    )
}

export default DetailsReservation