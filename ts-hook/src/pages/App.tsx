import React, { useEffect, useState, useContext } from 'react';
import { Form, Input, Button, Table } from 'antd';
import axios from 'axios';
import './App.scss';

const pageSize = 10;
const AppContext = React.createContext({});
interface checkedType {
    name: string;
    id: number;
}
interface AppContextType {
    checkedType: checkedType;
    setCheckedType: (item: checkedType) => void;
    tableList: any[];
    setTableList: (arr: checkedType[]) => void;
    handleQuery: (data?: any) => void;

    pageSize: number;
    current: number;
    total: number;
    onChangePaginations: (current: number) => void;
}

function App(): JSX.Element {
    const [tableList, setTableList] = useState([]);
    const [current, setCurrent] = useState(0);
    const [total, setTotal] = useState(0);
    const [checkedType, setCheckedType] = useState({});

    const handleQuery = (formData: any = {}): any => {
        interface ParamsInter {
            name: string;
            current: number;
            pageSize: number;
        }
        const params: ParamsInter = {
            name: formData.name,
            current,
            pageSize,
        };
        console.log('请求======》', formData);
        (async () => {
            const result = await axios.post('https://hn.algolia.com/api/v1/search?query=redux', params);
            setTableList(result.data.list);
            setTotal(result.data.count);
        })();
    };

    const onChangePaginations = (current: number): void => {
        setCurrent(current);
    };

    useEffect(handleQuery, []);
    useEffect(handleQuery, [current]);

    return (
        <AppContext.Provider
            value={{
                checkedType,
                tableList,
                setTableList,
                handleQuery,
                pageSize: pageSize,
                current,
                total,
                onChangePaginations,
            }}
        >
            <div className="App">
                <div className="App">
                    <header className="App-header">食堂管理</header>
                    <div className="App-Body">
                        <Search />
                        <div>
                            <TypeList />
                            <TableBox />
                        </div>
                    </div>
                </div>
            </div>
        </AppContext.Provider>
    );
}

const Search: React.FC = (): JSX.Element => {
    const { handleQuery } = useContext(AppContext) as AppContextType;
    const [form] = Form.useForm();

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    const search = () => {
        const formData: any = form.getFieldsValue();
        console.log('formData=====>', formData);
        handleQuery(formData);
    };
    return (
        <Form {...layout} name="basic" initialValues={{ remember: true }}>
            <Form.Item label="菜品名称" name="name" rules={[{ required: true, message: '请输入菜品名称！' }]}>
                <Input />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" onClick={() => search()}>
                    查询
                </Button>
            </Form.Item>
        </Form>
    );
};

const TypeList: React.FC = (): JSX.Element => {
    const [typeList, setTypeList] = useState([]);
    const { checkedType, setCheckedType } = useContext(AppContext) as AppContextType;
    const queryType = (): void => {
        (async () => {
            const result = await axios.post('https://hn.algolia.com/api/v1/search?query=redux');
            setTypeList(result.data);
        })();
    };

    const delType = (item: AppContextType['checkedType']): void => {
        const param = {
            id: item.id,
        };
        (async () => {
            await axios.post('https://hn.algolia.com/api/v1/search?query=redux', param);
            queryType();
        })();
    };
    useEffect(queryType);
    return (
        <div className="leftTree">
            <Button type="primary">新增类型</Button>
            {typeList.map((item: AppContextType['checkedType'], index: number) => (
                <div key={index}>
                    <span onClick={() => setCheckedType(item)} className={checkedType.id === item.id ? 'checked' : ''}>
                        {item.name}
                    </span>
                    <span onClick={() => delType(item)}>x</span>
                </div>
            ))}
        </div>
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

    return <Table rowKey="id" pagination={paginations} columns={columns} dataSource={tableList} />;
};

export default App;
