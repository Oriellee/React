import React, { useEffect, useState, useContext } from 'react';
import { Form, Input, Button, Table, Modal } from 'antd';
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
}

interface TypeListContentType {
    isModalVisible: boolean;
    changeModalStatus: (status: boolean) => void;
    handleOk: (name: string) => void;
    checkedType: checkedTypeInter;
}

interface TableParamsInter {
    name: string;
    current: number;
    pageSize: number;
}

function App(): JSX.Element {
    const [tableList, setTableList] = useState([]);
    const [current, setCurrent] = useState(0);
    const [total, setTotal] = useState(0);
    const [checkedType, setCheckedType] = useState({});
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
            }}
        >
            <div className="App">
                <header className="App-header">食堂管理</header>
                <div className="App-Body">
                    <SearchBox />
                    <div className="App-Content">
                        <TypeListBox />
                        <TableBox />
                    </div>
                </div>
            </div>
        </AppContext.Provider>
    );
}

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
            <Form {...layout} layout="inline" form={form} name="basic">
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
    const { checkedType, setCheckedType, handleQuery } = useContext(AppContext) as AppContextType;
    const [typeList, setTypeList] = useState([]);
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
    const columns: any[] = [];

    return (
        <div className="tableBox">
            <Table rowKey="id" pagination={paginations} columns={columns} dataSource={tableList} />
        </div>
    );
};

export default App;
