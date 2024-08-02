import React, { useState } from 'react'
import { Hotel, Room } from '../interfaces/interfaces.ts';
import { FormProps, Form, Input, Button, Flex, message, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { postActions, putActions } from '../actions/actions.ts';
import { endpoints } from '../constants/endpoints.constants.ts';
import { _addRoom, _updateRoom } from '../actions/rooms.actions.ts';

const {Option} = Select;

function AddRoom({ operation, isModalOpen, setIsModalOpen, currentRecord , onRefresh }: any) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const save: FormProps<Room>['onFinish'] = (values) => {
        form.validateFields()
            .then(()=>{
                switch (operation) {
                    case "add":
                        setLoading(true)
                        _addRoom(values)
                            .then((res) => {
                                if (res?.status === 200) {
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
                        
                        _updateRoom(currentRecord?.id,values)
                            .then((res) => {
                                if (res?.status === 200) {
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
                label="Nom"
                name="num_room"
                rules={[{ required: true, message: 'Champ obligatoire!' }]}
            >
                <Input />
            </Form.Item>
            

            <Form.Item<Room>
                label="Type de chambre"
                name="num_room"
                rules={[{ required: true, message: 'Champ obligatoire!' }]}
            >
                <Select
                    style={{width:'100%',background:"transparent"}}
                    showSearch
                    placeholder="Catégorie"
                    optionFilterProp="children" 
                    //filterOption={(input, option) => option.children[1].toLowerCase().includes(input.toLowerCase())}
                    filterOption={(input : any, option : any) => option.children[0].toLowerCase().includes(input.toLowerCase())}
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
                <TextArea rows={5} />
            </Form.Item>

            <Form.Item<Room>
                label="Capacité"
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
                label="Surface"
                name="surface"
                rules={[{ required: true, message: 'Champ obligatoire!' }]}
            >
                <Input />
            </Form.Item>

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