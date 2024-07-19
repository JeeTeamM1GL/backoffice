import React, { useState } from 'react';
import { IBibliothecaire } from '../interfaces/interfaces';
import { FormProps, Form, Input, Button, message } from 'antd';
import { postActions, putActions } from '../actions/actions.ts';
import { endpoints } from '../constants/endpoints.constants.ts';

function AddBibliothecaire({ operation, isModalOpen, setIsModalOpen, currentRecord }: any) {
    const [loading, setLoading] = useState<boolean>(false);

    const save: FormProps<IBibliothecaire>['onFinish'] = (values) => {
        setLoading(true);
        const endpoint = operation === 'add' ? endpoints.bibliotheque.ADD : `${endpoints.bibliotheque.UPDATE}/${currentRecord.id}`;
        const action = operation === 'add' ? postActions : putActions;

        action(endpoint, values).then((res) => {
            if (res?.data?.status === 200) {
                message.success(`Bibliothécaire ${operation === 'add' ? 'ajouté' : 'modifié'} avec succès`);
                setIsModalOpen(false);
            }
        }).finally(() => setLoading(false));
    };

    const onFinishFailed: FormProps<IBibliothecaire>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            layout="vertical"
            name="bibliothecaireForm"
            style={{ width: '100%' }}
            initialValues={currentRecord}
            onFinish={save}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
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
            <Form.Item<IBibliothecaire>
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

export default AddBibliothecaire;
