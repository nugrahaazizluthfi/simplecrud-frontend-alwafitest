import { Card, Col, Row } from 'antd';
import React from 'react';
import { Breadcrumb } from 'antd';

const AlWafiCard = ({ children, crumbs }) => {
    return (
        <React.Fragment>
            <Row gutter={16}>
                <Col span={24}>
                    <Card title={
                        <Breadcrumb>
                            {crumbs.map((item,index) => <Breadcrumb.Item key={index}>{item.name}</Breadcrumb.Item>)}
                        </Breadcrumb>}
                        bordered={false}>
                        {children}
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default AlWafiCard;