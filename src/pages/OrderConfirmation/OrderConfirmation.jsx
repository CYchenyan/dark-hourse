import { Form, Input, Button, Row, Col, Modal } from 'antd'
import React from 'react'
import { useOrderConfirmation } from '../../hooks/useOrderConfirmation'
import './OrderConfirmation.css'

const OrderConfirmation = () => {
  const { createTicketOrder, userInfo, isOrderCreated, cancelModel, isNoSpareTicket, isOrderCreatedError } = useOrderConfirmation()

  return (
    <div className='wrapper'>
      <Modal
        title='订单创建失败'
        visible={isOrderCreatedError}
        onOk={createTicketOrder}
        onCancel={cancelModel}
      >
        <span>订单创建失败，是否重试</span>
        <Button>取消</Button>
        <Button>确认</Button>
      </Modal>

      <Modal
        title='余票不足'
        visible={isNoSpareTicket}
      >
        <span>余票不足，请选择其他航班或关注后续是否有余票</span>
        <Button>确认</Button>
      </Modal>

      {isOrderCreated && <span>订单创建成功，请尽快支付!</span>}

      <Form
        name='passengers'
        layout='vertical'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 8 }}
        onFinish={createTicketOrder}
      >
        <Form.Item
          name='flightId'
          label='航班号'
          initialValue={userInfo.flightId}
        >
          <span>5099</span>
        </Form.Item>
        <Form.Item
          name='passenger'
          label='姓名'
          initialValue={userInfo.passenger}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='certificateNum'
          label='身份证号码'
          initialValue={userInfo.certificateNum}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='phoneNum'
          label='电话号码'
          initialValue={userInfo.phoneNum}
        >
          <Input />
        </Form.Item>

        <Button>+ 联系人</Button>

        <br />
        <br />

        <Form.Item>
          <Row>
            <Col span={12}>
              费用详情：
              <span>¥ 1000</span>
            </Col>
            <Col span={12}>
              <Button
                type='primary'
                data-testid='submit-button'
                htmlType='submit'
              >
                提交
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  )
}

export default OrderConfirmation
