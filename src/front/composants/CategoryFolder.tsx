import { Card, Space, Typography } from 'antd';
import React from 'react';
const {Text} = Typography;
function CategoryFolder({name} : {
    name : string
}) {
  return (
    <Card size='small'>
        <Space>
            <img src={require("./../../asset/icons/folder.png")} style={{objectFit:"cover",width : 32, height: 32}} alt='folder' />
            <Text ellipsis={{tooltip : name}} style={{width:150}} > {name ? name : "Dossier"} </Text>
        </Space>
    </Card>
  ) 
}

export default CategoryFolder