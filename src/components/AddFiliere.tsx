import React, { useState } from 'react';
import { IFiliere } from '../interfaces/interfaces';
import { FormProps, Form, Input, Button, message, Flex } from 'antd';
import { postActions, putActions } from '../actions/actions.ts';
import { endpoints } from '../constants/endpoints.constants.ts';

function AddFiliere({ operation, isModalOpen, setIsModalOpen, currentRecord , onRefresh }: any) {
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm();
    const save: FormProps<IFiliere>['onFinish'] = (values) => {
        //console.log('Success:', values);
        form.validateFields()
        .then(()=>{
            switch (operation) {
                case "add":
                    setLoading(true)
                    postActions(endpoints.filiere.ADD, values)
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
                    putActions(`${endpoints.filiere.UPDATE}/${currentRecord?.id}` , values)
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

export default AddFiliere;
