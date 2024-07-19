import React, { useState } from 'react';
import { IClasse } from '../interfaces/interfaces';
import { FormProps, Form, Input, Button, message } from 'antd';
import { postActions, putActions } from '../actions/actions.ts';
import { endpoints } from '../constants/endpoints.constants.ts';

function AddClasse({ operation, isModalOpen, setIsModalOpen, currentRecord }: any) {
    const [loading, setLoading] = useState<boolean>(false);

    const save: FormProps<IClasse>['onFinish'] = (values) => {
        setLoading(true);
        const endpoint = operation === 'add' ? endpoints.classe.ADD : `${endpoints.classe.UPDATE}/${currentRecord.id}`;
        const action = operation === 'add' ? postActions : putActions;

        action(endpoint, values).then((res) => {
            if (res?.data?.status === 200) {
                message.success(`Classe ${operation === 'add' ? 'ajoutée' : 'modifiée'} avec succès`);
                setIsModalOpen(false);
            }
        }).finally(() => setLoading(false));
    };

    const onFinishFailed: FormProps<IClasse>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            layout="vertical"
            name="classeForm"
            style={{ width: '100%' }}
            initialValues={currentRecord}
            onFinish={save}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<IClasse>
                label="Nom"
                name="nom"
                rules={[{ required: true, message: 'Champ obligatoire!' }]}
            >
                <Input />
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

export default AddClasse;
