import React, { useState } from 'react';
import { IMemoire } from '../interfaces/interfaces';
import { FormProps, Form, Input, Button, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { postActions, putActions } from '../actions/actions.ts';
import { endpoints } from '../constants/endpoints.constants.ts';

function AddMemoire({ operation, isModalOpen, setIsModalOpen, currentRecord , onRefresh }: any) {
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm();
    const save: FormProps<IMemoire>['onFinish'] = (values) => {
        //console.log('Success:', values);
        form.validateFields()
        .then(()=>{
            switch (operation) {
                case "add":
                    setLoading(true)
                    postActions(endpoints.memoires.ADD, values)
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
                    //putActions(endpoints.categories.UPDATE + "/" + currentRecord.id, values)
                    //values.id = currentRecord?.id;
                    putActions(`${endpoints.memoires.UPDATE}/${currentRecord?.id}` , values)
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
            name="memoireForm"
            style={{ width: '100%' }}
            initialValues={currentRecord}
            onFinish={save}
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
