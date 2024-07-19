import React, { useState } from 'react';
import { IFiliere } from '../interfaces/interfaces';
import { FormProps, Form, Input, Button, message } from 'antd';
import { postActions, putActions } from '../actions/actions.ts';
import { endpoints } from '../constants/endpoints.constants.ts';

function AddFiliere({ operation, isModalOpen, setIsModalOpen, currentRecord }: any) {
    const [loading, setLoading] = useState<boolean>(false);

    const save: FormProps<IFiliere>['onFinish'] = (values) => {
        setLoading(true);
        const endpoint = operation === 'add' ? endpoints.filiere.ADD : `${endpoints.filiere.UPDATE}/${currentRecord.id}`;
        const action = operation === 'add' ? postActions : putActions;

        action(endpoint, values).then((res) => {
            if (res?.data?.status === 200) {
                message.success(`Filière ${operation === 'add' ? 'ajoutée' : 'modifiée'} avec succès`);
                setIsModalOpen(false);
            }
        }).finally(() => setLoading(false));
    };

    const onFinishFailed: FormProps<IFiliere>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            layout="vertical"
            name="filiereForm"
            style={{ width: '100%' }}
            initialValues={currentRecord}
            onFinish={save}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<IFiliere>
                label="Intitulé"
                name="intitule"
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

export default AddFiliere;
