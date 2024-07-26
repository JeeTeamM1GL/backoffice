import React, { useState } from 'react';
import { IBibliothecaire } from '../interfaces/interfaces';
import { FormProps, Form, Input, Button, message, Flex } from 'antd';
import { postActions, putActions } from '../actions/actions.ts';
import { endpoints } from '../constants/endpoints.constants.ts';

function AddBibliothecaire({ operation, isModalOpen, setIsModalOpen, currentRecord , onRefresh }: any) {
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm();
    const save: FormProps<IBibliothecaire>['onFinish'] = (values) => {
        form.validateFields()
        .then(()=>{
            switch (operation) {
                case "add":
                    setLoading(true)
                    values.password = "passer";
                    postActions(endpoints.bibliothecaires.ADD, values)
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
                    putActions(`${endpoints.bibliothecaires.UPDATE}/${currentRecord?.id}` , values)
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
            form={form}
            name="bibliothecaireForm"
            style={{ width: '100%' }}
            initialValues={currentRecord}
            onFinish={save}
        >
            <Form.Item<IBibliothecaire>
                label="Nom"
                name="lastname"
                rules={[{ required: true, message: 'Champ obligatoire!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item<IBibliothecaire>
                label="Prénom"
                name="firstname"
                rules={[{ required: true, message: 'Champ obligatoire!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item<IBibliothecaire>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Champ obligatoire!' }]}
            >
                <Input />
            </Form.Item>
            {/* <Form.Item<IBibliothecaire>
                label="Mot de passe"
                name="password"
                rules={[{ required: true, message: 'Champ obligatoire!' }]}
            >
                <Input.Password />
            </Form.Item> */}
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
    );
}

export default AddBibliothecaire;
