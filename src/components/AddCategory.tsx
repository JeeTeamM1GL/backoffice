import React, { useState } from 'react'
import { ICategorie } from '../interfaces/interfaces'
import { FormProps, Form, Input, Button, Flex } from 'antd';
import TextArea from 'antd/es/input/TextArea';



function AddCategory({ operation, isModalOpen,setIsModalOpen, currentRecord }:any) {

    const [categorie, setCategorie] = useState<ICategorie>()

    const handleAddCategory: FormProps<ICategorie>['onFinish'] = (values) => {
        console.log('Success:', values);
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
            onFinish={handleAddCategory}
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
                <TextArea rows={5}/>
            </Form.Item>

            <Flex justify="center" flex={1} align="center">
                <Button type="primary" onClick={()=>setIsModalOpen(false)} ghost>
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