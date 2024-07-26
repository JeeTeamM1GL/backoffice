import React, { useState } from 'react';
import { IAdmin } from '../interfaces/interfaces';
import { FormProps, Form, Input, Button, message, Flex } from 'antd';
import { postActions, putActions } from '../actions/actions.ts';
import { endpoints } from '../constants/endpoints.constants.ts';

function AddAdmin({ operation, isModalOpen, setIsModalOpen, currentRecord, onRefresh }: any) {
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm();
    const save: FormProps<IAdmin>['onFinish'] = (values) => {
        form.validateFields()
        .then(()=>{
            switch (operation) {
                case "add":
                    setLoading(true)
                    values.password = "passer";
                    postActions(endpoints.admin.ADD, values)
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
                    putActions(`${endpoints.admin.UPDATE}/${currentRecord?.id}` , values)
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
            name="adminForm"
            form={form}
            style={{ width: '100%' }}
            initialValues={currentRecord}
            onFinish={save}
            autoComplete="off"
        >
            <Form.Item<IAdmin>
                label="Nom"
                name="lastname"
                rules={[{ required: true, message: 'Champ obligatoire!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item<IAdmin>
                label="Prénom"
                name="firstname"
                rules={[{ required: true, message: 'Champ obligatoire!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item<IAdmin>
                label="Nom d'utilisateur"
                name="username"
                rules={[{ required: true, message: 'Champ obligatoire!' }]}
            >
                <Input />
            </Form.Item>
            {/* <Form.Item<IAdmin>
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

export default AddAdmin;
