import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Modal, Button, Form, Input, Radio, Card } from 'antd';
import { Table, Divider, Tag } from 'antd';
const { Column, ColumnGroup } = Table;




class FormTest extends React.Component {
  render() {
    const {
      visible, onCancel, onCreate, form,
    } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        visible={visible}
        title="Create a new collection"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <Form.Item label="name">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input the name of collection!' }],
            })(
              <Input />
            )}
          </Form.Item>

          <Form.Item label="age">
            {getFieldDecorator('age')(<Input />)}
          </Form.Item>
          <Form.Item label="address">
            {getFieldDecorator('address')(<Input />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
const CollectionCreateForm = Form.create({
  name: 'form_in_modal',
  mapPropsToFields(props) {
    console.log(props)
    let data = {}
    for (let item in props) {
      if (typeof (props[item]) !== 'function') {
        data[item] = Form.createFormField({
          value: props[item],
        });
      }
    }
    return data
  },
  onValuesChange(_, values) {
  },
})(FormTest);

export default CollectionCreateForm