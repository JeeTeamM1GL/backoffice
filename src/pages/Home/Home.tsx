import { FileOutlined, PushpinOutlined, TeamOutlined } from '@ant-design/icons'
import { Card, Col, Row } from 'antd'
import React from 'react'

function Home() {
  return (
    <>
        <Row  gutter={[24,24]}>
          <Col  xs={24} sm={12} md={8} lg={8} xl={8} >
            <Card title={<><TeamOutlined style={{backgroundColor:"rgb(241,223,254)",color:"#a02cfa",padding:5,borderRadius:8 , fontSize:20}} /> Utilisateurs </>} >
                0
            </Card>
          </Col>
          <Col  xs={24} sm={12} md={8} lg={8} xl={8}>
            <Card title={<><FileOutlined style={{backgroundColor:"#fff5dd",color:"#ffbc11",padding:5,borderRadius:8,fontSize:20}} /> Mémoires </>} >
              0
            </Card>
          </Col>
          <Col  xs={24} sm={12} md={8} lg={8} xl={8}>
            <Card title={<><PushpinOutlined style={{backgroundColor:"hsl(141,100%, 95%)",color:"hsl(141,100%, 35%)",padding:5,borderRadius:8,fontSize:20}} /> Lectures du jour </>} >
              0
            </Card>
          </Col>
        </Row>

        <br />

        <Card title="Historique" >
          
        </Card>
    </>
  )
}

export default Home