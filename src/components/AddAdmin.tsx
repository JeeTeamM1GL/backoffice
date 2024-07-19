import React, { useState } from 'react';
import { IAdmin } from '../interfaces/interfaces';
import { FormProps, Form, Input, Button, message } from 'antd';
import { postActions, putActions } from '../actions/actions.ts';
import { endpoints } from '../constants/endpoints.constants.ts';

function AddAdmin({ operation, isModalOpen, setIsModalOpen, currentRecord }: any) {
    const [loading, setLoading] = useState<boolean>(false);

    const save: FormProps<IAdmin>['onFinish'] = (values) => {
        setLoading(true);
        const endpoint = operation === 'add' ? endpoints.users.ADD : `${endpoints.users.UPDATE}/${currentRecord.id}`;
        const action = operation === 'add' ? postActions : putActions;

        action(endpoint, values).then((res) => {
            if (res?.data?.status === 200) {
                message.success(`Admin ${operation === 'add' ? 'ajouté' : 'modifié'} avec succès`);
                setIsModalOpen(false);
            }
        }).finally(() => setLoading(false));
    };

    const onFinishFailed: FormProps<IAdmin>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            layout="vertical"
            name="adminForm"
            style={{ width: '100%' }}
            initialValues={currentRecord}
            onFinish={save}
            onFinishFailed={onFinishFailed}
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
            <Form.Item<IAdmin>
                label="Mot de passe"
                name="password"
                rules={[{ required: true, message: 'Champ obligatoire!' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" onClick={() => setIsModalOpen(false)} ghost>
                    Annuler
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button type="primary" htmlType="submit" loading={loading}>
                    Enregistrer
                </Button>
            </Form.Item>
        </Form>
    );
}

export default AddAdmin;
