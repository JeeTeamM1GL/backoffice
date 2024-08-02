import React, { useState } from 'react'
import { Hotel, Location } from '../interfaces/interfaces.ts';
import { FormProps, Form, Input, Button, Flex, message, Select, Upload, UploadProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import sn from "./../utils/sn.json"
import { UploadOutlined } from '@ant-design/icons';
import {API_URL, API_URL_4} from '../constants/environment.constants.ts';
import { _addHotel, _updateHotel } from '../actions/hotels.actions.ts';

const {Option} = Select;

function AddHotel({ operation, isModalOpen, setIsModalOpen, currentRecord , onRefresh }: any) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [cover , setCover] = useState<string>();
    const props : UploadProps = {
        name: 'file',
        action: `${API_URL_4}/files/upload/single`,
        // headers: {
        //   authorization: 'authorization-text',
        // },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            console.log(info.file.response)
            //message.success(`${info.file.name} Fichier chargé avec succès`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} Erreur de chargement`);
          }
        },
    };

    const save: FormProps<Hotel>['onFinish'] = (values) => {
        form.validateFields()
            .then(()=>{
                switch (operation) {
                    case "add":
                        setLoading(true)
                        _addHotel(values)
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
                        _updateHotel(currentRecord?.id, values)
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
            <Form.Item<Hotel>
                label="Nom"
                name="name"
                rules={[{ required: true, message: 'Champ obligatoire!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<Hotel>
                label="Description"
                name="description"
            >
                <TextArea rows={5} />
            </Form.Item>

            <Form.Item<Hotel>
                label="Nombre de chambres"
                name="rooms_count"
                rules={[{ required: true, message: 'Champ obligatoire!' }]}
            >
                <Input />
            </Form.Item>


            <Form.Item<Location>
                label="Pays"
                name="address"
                rules={[{ required: true, message: 'Champ obligatoire!' }]}
            >
                <Select
                    style={{width:'100%',background:"transparent"}}
                    showSearch
                    placeholder="Villes"
                    optionFilterProp="children" 
                    filterOption={(input : any, option : any) => option.children[0].toLowerCase().includes(input.toLowerCase())}
                >     
                    <Option key={1}  value={"SENEGAL"} > SENEGAL </Option>
                </Select>
            </Form.Item>


            <Form.Item<Location>
                label="Ville"
                name="city"
                rules={[{ required: true, message: 'Champ obligatoire!' }]}
            >
                <Select
                    style={{width:'100%',background:"transparent"}}
                    showSearch
                    placeholder="Villes"
                    optionFilterProp="children" 
                    filterOption={(input : any, option : any) => option.children[1].toLowerCase().includes(input.toLowerCase())}
                >     
                    {
                        sn.map((item:any , index : number)=>(
                            <Option key={index}  value={item?.city} > {item?.city} </Option>
                        ))
                    }
                </Select>
            </Form.Item>
            
            <Form.Item<Location>
                label="Adresse"
                name="address"
                rules={[{ required: true, message: 'Champ obligatoire!' }]}
            >
                <Input />
            </Form.Item>


            <Upload {...props}>
                <Button icon={<UploadOutlined />}> Charger une image </Button>
            </Upload>


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

export default AddHotel