import React, { useState } from 'react';
import { IMemoire } from '../interfaces/interfaces';
import { FormProps, Form, Input, Button, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { postActions, putActions } from '../actions/actions.ts';
import { endpoints } from '../constants/endpoints.constants.ts';

function AddMemoire({ operation, isModalOpen, setIsModalOpen, currentRecord }: any) {
    const [loading, setLoading] = useState<boolean>(false);

    const save: FormProps<IMemoire>['onFinish'] = (values) => {
        setLoading(true);
        const endpoint = operation === 'add' ? endpoints.memoires.ADD : `${endpoints.memoires.UPDATE}/${currentRecord.id}`;
        const action = operation === 'add' ? postActions : putActions;

        action(endpoint, values).then((res) => {
            if (res?.data?.status === 200) {
                message.success(`Mémoire ${operation === 'add' ? 'ajouté' : 'modifié'} avec succès`);
                setIsModalOpen(false);
            }
        }).finally(() => setLoading(false));
    };

    const onFinishFailed: FormProps<IMemoire>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            layout="vertical"
            name="memoireForm"
            style={{ width: '100%' }}
            initialValues={currentRecord}
            onFinish={save}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<IMemoire>
                label="Titre"
                name="titre"
                rules={[{ required: true, message: 'Champ obligatoire!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item<IMemoire>
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Champ obligatoire!' }]}
            >
                <TextArea rows={5} />
            </Form.Item>
            <Form.Item<IMemoire>
                label="Année"
                name="year"
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

export default AddMemoire;
