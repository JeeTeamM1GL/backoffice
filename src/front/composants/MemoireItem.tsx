import { Card, Typography } from 'antd'
import React from 'react'

const {Text} = Typography
function MemoireItem({file, name} : {
    file : string,
    name : string
}) {
  return (
    <Card style={{height : "30vh"}} >
        <div>
            <img src={require("./../../asset/icons/pdf.png")} style={{width : 72, height : 72}}  alt="" />
        </div>
        <Text> {name} </Text>
    </Card>
  )
}

export default MemoireItem