import React, {useEffect} from 'react';
import {Drawer, Form, Input, Button, Select, DatePicker, message} from 'antd';
import {Domain, useAddDomainMutation, useUpdateDomainMutation} from "./Redux/ReducerManager.ts";
import dayjs from 'dayjs';

interface DomainDrawerProps {
    visible: boolean;
    onClose: () => void;
    domain: Domain | null;
}

const DomainDrawer: React.FC<DomainDrawerProps> = ({visible, onClose, domain}) => {
    const [form] = Form.useForm();
    const [addDomain] = useAddDomainMutation();
    const [updateDomain] = useUpdateDomainMutation();

    useEffect(() => {
        if (domain) {
            console.log(domain);
            form.setFieldsValue({
                domain: domain.domain,
                status: domain.status,
                isActive: domain.isActive.toString(),
                createdDate: dayjs.unix(domain.createdDate),
            });
        } else {
            form.resetFields();
        }
    }, [domain, form]);

    const handleSubmit = async (values: any) => {

        const newDomain = {
            domain: values.domain,
            status: values.status,
            isActive: values.isActive,
            createdDate: values.createdDate.unix(),
        };

        if (domain) {
            console.log(domain , newDomain)
            // Editing an existing domain
            await updateDomain({id: domain.id, data: newDomain});
        } else {
            // Adding a new domain
            await addDomain(newDomain);
        }

        message.success(domain ? 'Domain updated successfully' : 'Domain added successfully');
        onClose();
    };

    return (
        <Drawer
            title={domain ? 'Edit Domain' : 'Add Domain'}
            open={visible}
            onClose={onClose}
            width={400}
        >

            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{status: 'pending', isActive: true}}
            >
                <Form.Item
                    name="domain"
                    label="Domain"
                    rules={[{required: true, message: 'Please input the domain!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="status"
                    label="Status"
                    rules={[{required: true, message: 'Please select a status!'}]}
                >
                    <Select>
                        <Select.Option value="pending">Pending</Select.Option>
                        <Select.Option value="verified">Verified</Select.Option>
                        <Select.Option value="rejected">Rejected</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="isActive" label="Active">
                    <Select>
                        <Select.Option value={"true"}>Active</Select.Option>
                        <Select.Option value={"false"}>Inactive</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="createdDate"
                    label="Created Date"
                    rules={[{required: true, message: 'Please select a created date!'}]}
                >
                    <DatePicker/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {domain ? 'Update' : 'Add'}
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default DomainDrawer;
