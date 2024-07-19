import React, { useState } from 'react'
import { ICategorie } from '../interfaces/interfaces'
import { FormProps, Form, Input, Button, Flex, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { postActions, putActions } from '../actions/actions.ts';
import { endpoints } from '../constants/endpoints.constants.ts';



function AddCategory({ operation, isModalOpen, setIsModalOpen, currentRecord }: any) {

    const [loading, setLoading] = useState<boolean>(false);
    const save: FormProps<ICategorie>['onFinish'] = (values) => {
        //console.log('Success:', values);
        switch (operation) {
            case "add":
                setLoading(true)
                postActions(endpoints.categories.ADD, values)
                    .then((res) => {
                        if (res?.data?.status === 200) {
                            message.success('Category ajouté avec succes')
                            setIsModalOpen(false)

                        }
                    })
                    .finally(
                        () => setLoading(false)
                    )

                break;
            case "update":
                setLoading(true)
                putActions(endpoints.categories.UPDATE + "" + currentRecord.id, values)
                    .then((res) => {
                        if (res?.data?.status === 200) {
                            message.success('Category modifier avec succes')
                            setIsModalOpen(false)

                        }
                    })
                    .finally(
                        () => setLoading(false)
                    )

                break;
            default:
                break;
        }


    };

    const onFinishFailed: FormProps<ICategorie>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            layout="vertical"
            name="basic"
            // labelCol={{ span: 8 }}
            // wrapperCol={{ span: 16 }}
            style={{ width: "100%" }}
            initialValues={currentRecord}
            onFinish={save}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<ICategorie>
                label="Nom"
                name="nom"
                rules={[{ required: true, message: 'Champ obligatoire!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<ICategorie>
                label="Description"
                name="description"
            >
                <TextArea rows={5} />
            </Form.Item>

            <Flex justify="center" flex={1} align="center">
                <Button type="primary" onClick={() => setIsModalOpen(false)} ghost>
                    Annuler
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button type="primary" htmlType="submit">
                    Enregistrer
                </Button>
            </Flex>


        </Form>
    )
}

export default AddCategory