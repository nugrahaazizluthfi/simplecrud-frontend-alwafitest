/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Select, message } from 'antd';
import axios from "axios";
const { Option } = Select;

const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const AddMeals = ({ visibleModal, handleOk, handleCancel, children, selectedRow, onReload}) => {
    const [form] = Form.useForm();

    const onComboChange = value => {
        form.setFieldsValue({
            type: value,
        });
    };

    const onFinish = values => {
        const endpoint = { meals: 'http://api.wibs.sch.id/v2/meal/post/food-category.store' }
       
        let data = {
            name: values.meals,
            type: values.type
        }

        if (selectedRow.id) {
            endpoint.meals = 'http://api.wibs.sch.id/v2/meal/post/food-category.update';
            data.id = selectedRow.id;
        }

        saveData(data, endpoint.meals);
    };

    const saveData = (data, url) => {
        axios({
            method: 'post',
            url,
            data,
            headers: {
                'Application-Token': 'geSzgVahOlowulcgHEtQmu9Ybofk1lRnPFd3V5atSEu1SD1dt2'
            }
        }).then(function (response) {
            onReload();
            handleCancel();
            message.success('Save data berhasil');
        }).catch(function (error) {
            message.error('Save data tidak berhasil');
            handleCancel();
        });
    }

    useEffect(() => {
        if(selectedRow.id)
        {
            form.setFieldsValue({
                meals: selectedRow.name,
                type: selectedRow.type,
            });

            console.log(selectedRow);
        }
    },[]);

    return (
        <Modal
            visible={visibleModal}
            onOk={handleOk}
            className="modal-form"
            width={'45%'}
            onCancel={handleCancel}
            centered={true}
            style={{ margin: '20px 0px 0px' }}
            bodyStyle={{ height: 'calc(60vh - 150px)', overflowY: 'scroll' }}
            footer={null}
            maskClosable={false}
        >
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item
                    name="meals"
                    label="Meals"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="type"
                    label="Type"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Choose Type Meals"
                        onChange={onComboChange}
                        allowClear
                    >
                        <Option value="appetizer">Appetizer</Option>
                        <Option value="main-course">Main Course</Option>
                        <Option value="dessert">Dessert</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                >
                    {({ getFieldValue }) =>
                        getFieldValue('gender') === 'other' ? (
                            <Form.Item
                                name="customizeGender"
                                label="Customize Gender"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        ) : null
                    }
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Save
                </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddMeals;