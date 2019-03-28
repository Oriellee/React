import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Modal, Button, Form, Input, Radio, Card } from 'antd';
import { Table, Divider, Tag } from 'antd';
import CollectionCreateForm from './FormTest'
const { Column, ColumnGroup } = Table;


class App extends Component {
  state = {
    visible: false,
    type: "add",
    fields: {
      name: "0000000",
      age: 12,
      address: "242423",
      key: "11111"
    },
    columns: [{
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
          <Button onClick={this.Modify.bind(this, record)} >Invite</Button>
          <Divider type="vertical" />
          <Button onClick={this.Delete.bind(this, record)}>Delete</Button>
        </span>
      ),
    }],

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
  Modify = (row) => {
    this.setState({
      fields: row,
      type: 'modify'
    })
    this.showModal();
  }
  Delete = (row) => {
    let data = this.state.data
    let newdata = []
    data.forEach((item) => {
      if (row.key !== item.key) {
        newdata.push(item)
      }
    })
    this.setState({
      data: newdata
    })

  }
  Add = () => {
    console.log()
    this.setState({
      fields: {},
      type: 'add'
    })
    this.showModal();
  }
  showModal = () => {
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
      form.resetFields();
      let data = this.state.data;
      if (this.state.type === 'add') {
        let newKey = data.length === 0 ? 0 : data[data.length - 1].key + 1;
        values['key'] = newKey
        data.push(values)
      } else if (this.state.type === 'modify') {
        let oldrow = this.state.fields.key;
        data.forEach((row, index) => {
          if (row.key === oldrow) {
            for (let item in values) {
              row[item] = values[item]
            }
            row['key'] = oldrow
          }
        })
      }
      this.setState({
        visible: false,
        data: data,
        fields: {}
      })

    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  render() {
    const fields = this.state.fields;
    return (
      <div className="App">
        <Card>
          <Button className='btn' type='primary' onClick={this.Add.bind(this)}>添加</Button>
          <CollectionCreateForm
            {...fields}
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
          <Table columns={this.state.columns} dataSource={this.state.data} />
        </Card>
      </div>
    );
  }
}

export default App;
