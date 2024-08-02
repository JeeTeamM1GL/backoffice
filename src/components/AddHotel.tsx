import React, { useState } from 'react'
import { Hotel, Location } from '../interfaces/interfaces.ts';
import { FormProps, Form, Input, Button, Flex, message, Select, Upload, UploadProps, Typography, Card } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import sn from "./../utils/sn.json"
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import {API_URL, API_URL_4} from '../constants/environment.constants.ts';
import { _addHotel, _updateHotel } from '../actions/hotels.actions.ts';

const {Option} = Select;
const {Text} = Typography;
function AddHotel({ operation, isModalOpen, setIsModalOpen, currentRecord , onRefresh }: any) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    // const [cover , setCover] = useState<string>();
    // const props : UploadProps = {
    //     name: 'file',
    //     action: `${API_URL_4}/files/upload/single`,
    //     // headers: {
    //     //   authorization: 'authorization-text',
    //     // },
    //     onChange(info) {
    //       if (info.file.status !== 'uploading') {
    //         console.log(info.file, info.fileList);
    //       }
    //       if (info.file.status === 'done') {
    //         console.log(info.file.response)
    //         //message.success(`${info.file.name} Fichier chargé avec succès`);
    //       } else if (info.file.status === 'error') {
    //         message.error(`${info.file.name} Erreur de chargement`);
    //       }
    //     },
    // };

    const save: FormProps<Hotel>['onFinish'] = (values) => {
        form.validateFields()
            .then(()=>{
                switch (operation) {
                    case "add":
                        setLoading(true)
                        const payload = {
                            name : values?.name,
                            description : values?.description,
                            location : {
                                country : values?.location?.country,
                                city : values?.location?.city,
                                address : values?.location?.address,
                            },
                            rooms_count : Number(values?.rooms_count) ,
                            cover : values?.cover,
                            images : values?.images
                        }
                        //console.log(payload)
                        _addHotel(payload)
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
                <TextArea rows={3} />
            </Form.Item>

            <Form.Item<Hotel>
                label="Nombre de chambres"
                name="rooms_count"
                rules={[{ required: true, message: 'Champ obligatoire!' }]}
            >
                <Input />
            </Form.Item>


            <Form.Item<Hotel>
                label="Pays"
                name={["location","country"]}
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


            <Form.Item<Hotel>
                label="Ville"
                name={["location","city"]}
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
            
            <Form.Item<Hotel>
                label="Adresse"
                name={["location","address"]}
                rules={[{ required: true, message: 'Champ obligatoire!' }]}
            >
                <Input />
            </Form.Item>


            <Form.Item<Hotel>
                label="Photo de couverture (lien vers l'image) "
                name="cover"
                rules={[{ required: true, message: 'Champ obligatoire!' }]}
                
            >
                <Input />
            </Form.Item>


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
                            {/* <Form.Item 
                                label="Type de contact" 
                                name={[field.name, 'type']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Champ obligatoire',
                                    },
                                ]}
                            >
                                <Select
                                    style={{width:'100%',background:"transparent"}}
                                    showSearch
                                    placeholder="Type de contact"
                                    optionFilterProp="children" 
                                    filterOption={(input, option) => option.children[1].toLowerCase().includes(input.toLowerCase())}
                                    onChange={(value)=>{setTypeContact(value)}}
                                >     
                                    <Option key={1}  value={"PHONE"} > Téléphone mobile </Option>
                                    <Option key={2}  value={"FIXE"} > Téléphone fixe </Option>
                                </Select>

                            </Form.Item> */}
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


            {/* <Upload {...props}>
                <Button icon={<UploadOutlined />}> Charger une image </Button>
            </Upload> */}


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