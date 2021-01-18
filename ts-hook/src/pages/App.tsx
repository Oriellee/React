import React, { useEffect, useState, useContext } from 'react';
import { Form, Input, Button, Table, Modal, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Service from '../services/service';
import './App.scss';

const AppContext = React.createContext({});
const TypeListContent = React.createContext({});

interface checkedTypeInter {
    name: string;
    id: number;
}
interface TypeParamInter {
    name: string;
    id?: number | string;
}
interface checkedRowInter {
    variety_id: number;
    variety_name: string;
    variety_type: number;
    canteen_name: string;
    merchant: string;
    status: boolean;
    price: number;
}
interface AppContextType {
    checkedType: checkedTypeInter;
    setCheckedType: (item: checkedTypeInter) => void;
    tableList: any[];
    setTableList: (arr: checkedTypeInter[]) => void;
    handleQuery: () => void;

    pageSize: number;
    current: number;
    total: number;
    onChangePaginations: (current: number) => void;
    form: any;
    isTableModalVisible: boolean;
    changeTableModalStatus: (status: boolean, row?: any) => void;
    checkedRow: checkedRowInter;
    addTablehandleOk: (data: any) => void;
}

interface TypeListContentType {
    isModalVisible: boolean;
    changeModalStatus: (status: boolean, row?: any) => void;
    handleOk: (name: string) => void;
    checkedType: checkedTypeInter;
}

interface TableParamsInter {
    name: string;
    current: number;
    pageSize: number;
}

function App(): JSX.Element {
    const [typeList, setTypeList] = useState([]);
    const [tableList, setTableList] = useState([]);
    const [current, setCurrent] = useState(0);
    const [total, setTotal] = useState(0);
    const [checkedType, setCheckedType] = useState({});
    const [isTableModalVisible, setTableModalVisible] = useState(false);
    const [checkedRow, setCheckedRow] = useState({} as checkedRowInter);
    const [form] = Form.useForm();
    const pageSize = 10;

    const handleQuery = (): any => {
        const formData = form.getFieldsValue();
        const params: TableParamsInter = {
            name: formData.name,
            current,
            pageSize,
        };
        console.log('请求======》', formData);
        (async () => {
            const result: any = await Service.getTableList(params);
            setTableList(result.data.list);
            setTotal(result.data.count);
        })();
    };

    const onChangePaginations = (current: number): void => {
        setCurrent(current);
    };

    const changeTableModalStatus = (status: boolean, row: any = {}): void => {
        setTableModalVisible(status);
        setCheckedRow(row);
    };

    const addTablehandleOk = (formData: any) => {
        (async () => {
            let fun = Service.addTable;
            if (checkedRow.variety_id) {
                formData.id = checkedRow.variety_id;
                fun = Service.updataTable;
            }
            await fun(formData);
            handleQuery();
        })();
        changeTableModalStatus(false);
    };
    useEffect(handleQuery, [current]);
    return (
        <AppContext.Provider
            value={{
                checkedType,
                tableList,
                setTableList,
                handleQuery,
                pageSize,
                current,
                total,
                onChangePaginations,
                setCheckedType,
                form,
                isTableModalVisible,
                changeTableModalStatus,
                checkedRow,
                addTablehandleOk,
                typeList,
                setTypeList,
            }}
        >
            <div className="App">
                <header className="App-header">食堂管理</header>
                <div className="App-Body">
                    <SearchBox />
                    <Button type="primary" htmlType="submit" onClick={() => changeTableModalStatus(true)}>
                        添加食堂
                    </Button>
                    <div className="App-Content">
                        <TypeListBox />
                        <TableBox />
                    </div>
                </div>
                {isTableModalVisible ? <AddTableModalBox /> : null}
            </div>
        </AppContext.Provider>
    );
}

const AddTableModalBox: React.FC = (): JSX.Element => {
    const [tableModalForm] = Form.useForm();
    const {
        isTableModalVisible,
        changeTableModalStatus,
        checkedRow,
        addTablehandleOk,
        typeList,
        setTypeList,
    } = useContext(AppContext) as AppContextType;

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
        colon: true,
    };

    const handleOk = () => {
        tableModalForm
            .validateFields()
            .then((values) => {
                console.log('values====>', values);
                const params = JSON.parse(JSON.stringify(values));
                addTablehandleOk(params);
            })
            .catch((errorInfo) => {
                console.log('err=======>', errorInfo);
            });
    };
    useEffect(() => {
        if (checkedRow) {
            tableModalForm.setFieldsValue({
                variety_name: checkedRow.variety_name, //string
                variety_type: checkedRow.variety_type, //分类id
                canteen_name: checkedRow.canteen_name, //string
                merchant: checkedRow.merchant, //string
                status: checkedRow.status, //Boolean  true 开启  false 关闭
                price: checkedRow.price, //Number  支持小数点后一位
            });
        }
    }, []);
    return (
        <Modal
            title={checkedRow.variety_id ? '编辑食堂' : '添加食堂'}
            visible={isTableModalVisible}
            onOk={() => handleOk()}
            onCancel={() => changeTableModalStatus(false)}
        >
            <Form {...layout} form={tableModalForm} name="AddTableModalBox">
                <Form.Item
                    label="菜品名称"
                    name="variety_name"
                    rules={[{ required: true, message: '请输入菜品名称！' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="菜品分类"
                    name="variety_type"
                    rules={[{ required: true, message: '请选择菜品分类！' }]}
                >
                    <Select style={{ width: 120 }}>
                        {typeList.map(
                            (item: checkedTypeInter): JSX.Element => {
                                return (
                                    <Option key={item.id} value="jack">
                                        Jack
                                    </Option>
                                );
                            },
                        )}
                    </Select>
                </Form.Item>
                <Form.Item label="食堂" name="canteen_name" rules={[{ required: true, message: '请输入食堂名称！' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="商户" name="merchant" rules={[{ required: true, message: '请输入商户名称！' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="状态" name="status" rules={[{ required: true, message: '请选择状态！' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="售价(元)" name="price" rules={[{ required: true, message: '请输入售价！' }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const SearchBox: React.FC = (): JSX.Element => {
    const { handleQuery, form } = useContext(AppContext) as AppContextType;
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
        colon: true,
    };
    const search = () => {
        handleQuery();
    };
    return (
        <div className="searchBox">
            <Form {...layout} layout="inline" form={form} name="SearchBox">
                <Form.Item label="菜品名称" name="name" rules={[{ required: true, message: '请输入菜品名称！' }]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={() => search()}>
                        查询
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

const TypeListBox: React.FC = (): JSX.Element => {
    const { checkedType, setCheckedType, handleQuery, typeList, setTypeList } = useContext(
        AppContext,
    ) as AppContextType;
    const [isModalVisible, setIsModalVisible] = useState(false);

    const changeModalStatus = (status: boolean, row: any = {}): void => {
        setCheckedType(row);
        setIsModalVisible(status);
    };

    const handleOk = (name: string) => {
        const params: TypeParamInter = {
            name,
        };
        (async () => {
            let fun = Service.addType;
            if (checkedType.id) {
                params.id = checkedType.id;
                fun = Service.updataType;
            }
            await fun(params);
            queryType();
        })();
        setIsModalVisible(false);
    };

    const queryType = (): void => {
        (async () => {
            const result: any = await Service.getTypeList();
            const list = result && result.data && result.data instanceof Array ? result.data : [];
            setTypeList(list);
            const flag = list.find((item: checkedTypeInter) => item.id === checkedType.id);
            if (!flag && list.length > 0) {
                setCheckedType(list[0]);
            }
        })();
    };

    const delType = (item: AppContextType['checkedType']): void => {
        const param = {
            id: item.id,
        };
        (async () => {
            await Service.delType(param);
            queryType();
        })();
    };

    const changeCheckedType = (item: AppContextType['checkedType']): void => {
        setCheckedType(item);
        handleQuery();
    };

    useEffect(queryType, []);

    return (
        <TypeListContent.Provider
            value={{
                isModalVisible,
                checkedType,
                changeModalStatus,
                handleOk,
            }}
        >
            <div className="typeBox">
                <div className="typeTitle">
                    菜品分类
                    <Button type="default" onClick={() => changeModalStatus(true)}>
                        +
                    </Button>
                </div>
                <div className="typeList">
                    {typeList.map((item: AppContextType['checkedType'], index: number) => (
                        <div
                            key={index}
                            className={checkedType.id === item.id ? 'checked' : ''}
                            onClick={() => changeCheckedType(item)}
                        >
                            <span>{item.name}</span>
                            <div>
                                <EditOutlined onClick={() => changeModalStatus(true, item)} />
                                <DeleteOutlined onClick={() => delType(item)} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {isModalVisible ? <AddTypeModalBox /> : null}
        </TypeListContent.Provider>
    );
};

const AddTypeModalBox: React.FC = (): JSX.Element => {
    const [name, setName] = useState('');
    const { isModalVisible, checkedType, changeModalStatus, handleOk } = useContext(
        TypeListContent,
    ) as TypeListContentType;
    const changeName = (e: any) => {
        setName(e.target.value);
    };
    useEffect(() => {
        setName(checkedType.name);
    }, []);
    return (
        <Modal
            title={checkedType.id ? '编辑分类' : '添加分类'}
            visible={isModalVisible}
            onOk={() => handleOk(name)}
            onCancel={() => changeModalStatus(false)}
        >
            <Input value={name} onChange={changeName} />
        </Modal>
    );
};

const TableBox: React.FC = (): JSX.Element => {
    const { tableList, pageSize, current, total, onChangePaginations } = useContext(AppContext) as AppContextType;
    const paginations: any = {
        pageSize,
        current,
        total,
        showQuickJumper: true,
        onChange: onChangePaginations,
    };

    const editTableRow = (row: any): void => {
        console.log('00000', row);
    };

    const Operation = (_value: any, rowData: any) => {
        return (
            <div className="table-row-operation">
                <span onClick={() => editTableRow(rowData)}>编辑</span>
                <span onClick={() => editTableRow(rowData)}>删除</span>
            </div>
        );
    };
    const columns: any[] = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: '菜品ID',
            dataIndex: 'variety_id',
            key: 'variety_id',
            width: 50,
        },
        {
            title: '菜品名称',
            dataIndex: 'variety_name',
            key: 'variety_name',
        },
        {
            title: '菜品分类',
            dataIndex: 'variety_type',
            key: 'variety_type',
        },
        {
            title: '食堂',
            dataIndex: 'canteen_name',
            key: 'canteen_name',
        },
        {
            title: '商户',
            dataIndex: 'merchant',
            key: 'merchant',
        },
        {
            title: '售价(元)',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: Operation,
        },
    ];

    return (
        <div className="tableBox">
            <Table rowKey="id" pagination={paginations} columns={columns} dataSource={tableList} />
        </div>
    );
};

export default App;
