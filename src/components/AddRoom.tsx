import React, { useState } from 'react'
import { Hotel, Room } from '../interfaces/interfaces.ts';
import { FormProps, Form, Input, Button, Flex, message, Select, Typography, Card } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { postActions, putActions } from '../actions/actions.ts';
import { endpoints } from '../constants/endpoints.constants.ts';
import { _addRoom, _updateRoom } from '../actions/rooms.actions.ts';
import { CloseOutlined } from '@ant-design/icons';

const {Option} = Select;
const {Text} = Typography;

function AddRoom({ operation, isModalOpen, setIsModalOpen, currentRecord , onRefresh , hotelId }: any) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const save: FormProps<Room>['onFinish'] = (values) => {
        form.validateFields()
            .then(()=>{
                switch (operation) {
                    case "add":
                        setLoading(true)
                        const payload = {
                            num_room : values?.num_room,
                            room_type : values?.room_type,
                            price_per_night : values?.price_per_night,
                            capacity : values?.capacity,
                            description: values?.description,
                            is_available : true,
                            images : values?.images,
                            etage: values?.etage,
                            equipments : values?.equipments,
                            surface : values?.surface,
                            hotelId : hotelId
                        }   
                        //console.log(payload)
                        _addRoom(payload)
                            .then((res) => {
                                if (res?.data === 200) {
                                    message.success('Opération éffectuée avec succès')
                                    setIsModalOpen(false)
                                    onRefresh();
                                }
                            })
                            .finally(
                                () => setLoading(false)
                            )

                        break;
                    case "update":
                        setLoading(true)
                        const payload1 = {
                            num_room : values?.num_room,
                            room_type : values?.room_type,
                            price_per_night : values?.price_per_night,
                            capacity : values?.capacity,
                            description: values?.description,
                            is_available : true,
                            images : values?.images,
                            etage: values?.etage,
                            equipments : values?.equipments,
                            surface : values?.surface,
                            hotelId : hotelId
                        }   
                        
                        _updateRoom(currentRecord?.id,payload1)
                            .then((res) => {
                                if (res?.data) {
                                    message.success('Opération éffectuée avec succès')
                                    setIsModalOpen(false);
                                    onRefresh();

                                }
                            })
                            .finally(
                                () => setLoading(false)
                            )

                        break;
                    default:
                        break;
                }
            })
            .catch((err:any)=>{
                console.log(err)
            })



    };

    return (
        <Form
            layout="vertical"
            name="basic"
            form={form}
            // labelCol={{ span: 8 }}
            // wrapperCol={{ span: 16 }}
            style={{ width: "100%" }}
            initialValues={currentRecord}
            onFinish={save}
            autoComplete="off"
        >
            <Form.Item<Room>
                label="Numéro chambre"
                name="num_room"
                rules={[{ required: true, message: 'Champ obligatoire!' }]}
            >
                <Input />
            </Form.Item>
            

            <Form.Item<Room>
                label="Type de chambre"
                name="room_type"
                rules={[{ required: true, message: 'Champ obligatoire!' }]}
            >
                <Select
                    style={{width:'100%',background:"transparent"}}
                    showSearch
                    placeholder="Catégorie"
                    optionFilterProp="children" 
                    //filterOption={(input, option) => option.children[1].toLowerCase().includes(input.toLowerCase())}
                    filterOption={(input : any, option : any) => option.children.toLowerCase().includes(input.toLowerCase())}
                >     
                    <Option key={1}  value="SIMPLE" > SIMPLE </Option>
                    <Option key={2}  value="DOUBLE" > DOUBLE </Option>
                    <Option key={3}  value="SUITE" > SUITE </Option>
                        
                </Select>
            </Form.Item>

            <Form.Item<Room>
                label="Prix par nuit"
                name="price_per_night"
                rules={[{ required: true, message: 'Champ obligatoire!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<Room>
                label="Description"
                name="description"
            >
                <TextArea rows={3} />
            </Form.Item>

            <Form.Item<Room>
                label="Capacité (nombre de personnes à accueilir)"
                name="capacity"
                rules={[{ required: true, message: 'Champ obligatoire!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<Room>
                label="Etage"
                name="etage"
                rules={[{ required: true, message: 'Champ obligatoire!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<Room>
                label={<Text>Surface en m<sup>2</sup> </Text>}
                name="surface"
                rules={[{ required: true, message: 'Champ obligatoire!' }]}
            >
                <Input/>
            </Form.Item>

            <Text style={{marginBottom : 8}} > Equipements </Text>
            <Form.List name="equipments"  >
                {(fields, { add, remove }) => (
                    <div
                        style={{
                        display: 'flex',
                        rowGap: 16,
                        flexDirection: 'column',
                        }}
                    >
                        {fields.map((field) => (
                        <Card
                            size="small"
                            title={`Option ${field.name + 1}`}
                            key={field.key}
                            extra={
                            <CloseOutlined
                                onClick={() => {
                                remove(field.name);
                                }}
                            />
                            }
                        >
                            <Form.Item 
                                label="Ex: WIFI,TV" 
                                name={[field.name]}
                            >
                                <Input />
                            </Form.Item>
                        </Card>
                        ))}

                        
                        <Button type="dashed" style={{marginBottom : 24}} onClick={() => add()} block>
                            Ajouter une option
                        </Button>
                    </div>
                )}
            </Form.List>

            <Text style={{marginBottom : 8}} > Quelques images </Text>
            <Form.List name="images"  >
                {(fields, { add, remove }) => (
                    <div
                        style={{
                        display: 'flex',
                        rowGap: 16,
                        flexDirection: 'column',
                        }}
                    >
                        {fields.map((field) => (
                        <Card
                            size="small"
                            title={`Image ${field.name + 1}`}
                            key={field.key}
                            extra={
                            <CloseOutlined
                                onClick={() => {
                                remove(field.name);
                                }}
                            />
                            }
                        >
                            <Form.Item 
                                label="Lien vers l'image" 
                                name={[field.name]}
                            >
                                <Input />
                            </Form.Item>
                        </Card>
                        ))}

                        
                        <Button type="dashed" style={{marginBottom : 24}} onClick={() => add()} block>
                            Ajouter une image
                        </Button>
                    </div>
                )}
            </Form.List>

            <Flex justify="center" flex={1} align="center">
                <Button type="primary" onClick={() => setIsModalOpen(false)} ghost>
                    Annuler
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button type="primary" loading={loading} htmlType="submit">
                    Enregistrer
                </Button>
            </Flex>


        </Form>
    )
}

export default AddRoom
