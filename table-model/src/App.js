import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Modal, Button, Form, Input, Radio } from 'antd';
import { Table, Divider, Tag } from 'antd';
const { Column, ColumnGroup } = Table;



const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">Invite {record.name}</a>
      <Divider type="vertical" />
      <a href="javascript:;">Delete</a>
    </span>
  ),
}];

class FormTest extends React.Component {
  render() {
    console.log(this.props, "----------")
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
          <Form.Item label="username">
            {getFieldDecorator('username', {
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
  name: 'form_in_modal', onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      username: Form.createFormField({
        ...props.username,
        value: props.username.value,
      }),
    };
  },
  onValuesChange(_, values) {
    console.log(values);
  },
})(FormTest);

class App extends Component {
  state = {
    visible: false,
    fields: {
      username: {
        value: 'benjycui',
      },
    },
    data: [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }]
  }
  showModal = () => {
    console.log()
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }


  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      let data = this.state.data;
      let newKey = data[data.length - 1].key + 1;
      values['key'] = newKey
      data.push(values)
      this.setState({
        visible: false,
        data: data
      });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  handleFormChange = (changedFields) => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields },
    }));
  }
  render() {
    const fields = this.state.fields;
    return (
      <div className="App">
        <Button type='primary' onClick={this.showModal.bind(this)}>添加</Button>
        <Button type='primary'>删除</Button>
        <CollectionCreateForm
        {...fields} onChange={this.handleFormChange}
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
        <Table columns={columns} dataSource={this.state.data} />
      </div>
    );
  }
}

export default App;
