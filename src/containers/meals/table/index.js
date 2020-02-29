import React from 'react';
import { Table, Input, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from "moment";
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import AddMeals from '../add_meals';
import styled from 'styled-components';
import _ from 'lodash';

const ButtonContainer = styled.div`
    display:block;
    overflow:hidden;
    .ant-btn-primary {
        background-color: #42c90c;
        border: 1px solid #36a30a;
        float: right;
        margin-bottom:10px;
    }
`;

class MealsTable extends React.Component {
    state = {
        searchText: '',
        searchedColumn: '',
        data: [],
        visible: false,
        selectedRow: {},
    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
        </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
        </Button>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                    text
                ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    setVisible = (value) => {
        this.setState({ visible: value })
    }

    handelLoad = () => {
        const endpoint = { meals: 'http://api.wibs.sch.id/v2/meal/post/datatable.food-category' }
        const self = this;

        axios({
            method: 'post',
            url: endpoint.meals,
            headers: {
                'Application-Token': 'geSzgVahOlowulcgHEtQmu9Ybofk1lRnPFd3V5atSEu1SD1dt2'
            }
        }).then(function (response) {
            const { data } = response.data;

            let newData = [];


            data.forEach(item => {
                let temp = {
                    key: parseInt(item.id),
                    id: parseInt(item.id),
                    name: item.name,
                    status: (item.status) ? 'Active' : 'Not Active',
                    created_at: moment(item.created_at).format('DD-MMMM-YYYY'),
                    updated_at: moment(item.updated_at).format('DD-MMMM-YYYY'),
                    type: item.type,
                }

                newData.push(temp);
            })

            let sortData = _.orderBy(newData, ['id'], ['desc']);

            console.log(sortData);

            self.setState({ data: sortData });
        }).catch(function (error) {
            console.log(error);
        });
    }

    componentDidMount() {
        this.handelLoad();
    }

    handleSelected = (e, row) => {
        this.setVisible(true);
        if (row) {
            this.setState({ selectedRow: row });
        } else {
            this.setState({ selectedRow: {} });
        }
    }

    reLoad = () => {
        this.handelLoad();
    }

    render() {
        const { data } = this.state;
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                ...this.getColumnSearchProps('name'),
            },
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
                ...this.getColumnSearchProps('type'),
            },
            {
                title: 'Created At',
                dataIndex: 'created_at',
                key: 'created_at',
                align: 'center',
                defaultSortOrder: 'descend'
            },
            {
                title: 'Updated At',
                dataIndex: 'updated_at',
                key: 'updated_at',
                align: 'center',
                defaultSortOrder: 'descend'
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                width: '15%',
                align: 'center'
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                width: '15%',
                align: 'center'
            },
            {
                title: 'Action',
                key: 'action',
                width: '15%',
                align: 'center',
                render: (text, row) => {
                    return (
                        <Button type="primary" size="small" onClick={(e) => { this.handleSelected(e, row) }}>
                            <EditOutlined />
                        </Button>
                    )
                },
            },

        ];
        const { visible, selectedRow } = this.state;
        return (
            <React.Fragment>
                <ButtonContainer onClick={() => { this.handleSelected() }}>
                    <Button type="primary">
                        <PlusOutlined /> Add Meal
                </Button>
                </ButtonContainer>
                <Table columns={columns}
                    dataSource={data}
                    rowKey={record => record.id} />

                {visible && <AddMeals
                    visibleModal={visible}
                    handleOk={() => { this.setVisible(!visible) }}
                    handleCancel={() => { this.setVisible(!visible) }}
                    selectedRow={selectedRow}
                    onReload={() => { this.reLoad() }}
                />}
            </React.Fragment>);
    }
}

export default MealsTable;