import React, {useMemo, useState} from 'react';
import {Table, Button, Space, Popconfirm, Tag, Row, Col, Input, Select} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {Domain, useDeleteDomainMutation, useGetDomainsQuery} from "../widgets/Redux/ReducerManager.ts";
import DomainDrawer from "../widgets/Drawer.tsx";


const DomainTable: React.FC = () => {
    const { data: domains = [], isLoading } = useGetDomainsQuery();
    const [deleteDomain] = useDeleteDomainMutation();
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [currentDomain, setCurrentDomain] = useState<Domain | null>(null);

    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState<string | null>(null);

    const handleEdit = (domain: Domain) => {
        setCurrentDomain(domain);
        setIsDrawerVisible(true);
    };

    const handleDelete = (id: string) => {
        deleteDomain(id);
    };

    const handleAdd = () => {
        setCurrentDomain(null);
        setIsDrawerVisible(true);
    };

    const filteredData = useMemo(() => {
        return domains
            .filter((item) =>
                item.domain.toLowerCase().includes(searchText.toLowerCase())
            )
            .filter((item) => (statusFilter ? item.status === statusFilter : true));
    }, [domains, searchText, statusFilter]);

    const columns = [
        {
            title: 'Domain',
            dataIndex: 'domain',
            key: 'domain',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                let color = 'green';
                if (status === 'pending') color = 'gold';
                if (status === 'rejected') color = 'red';
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: 'Created Date',
            dataIndex: 'createdDate',
            key: 'createdDate',
            render: (date: number) =>
                new Date(date * 1000).toLocaleDateString('en-US'),
            sorter: (a: Domain, b: Domain) =>
                a.createdDate - b.createdDate,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Domain) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    />
                    <Popconfirm
                        title="Are you sure you want to delete this domain?"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="tableContainer">
            <Row className="antdRow" gutter={16} style={{marginBottom: 16}} align="middle">
                <Col>
                    <Button type="primary" onClick={handleAdd}>
                        Add Domain
                    </Button>
                </Col>
                <Col>
                    <Input
                        placeholder="Search domain"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        allowClear
                    />
                </Col>
                <Col>
                    <Select
                        allowClear
                        placeholder="Filter by status"
                        style={{width: 150}}
                        onChange={(value) => setStatusFilter(value)}
                    >
                        <Option value="pending">Pending</Option>
                        <Option value="verified">Verified</Option>
                        <Option value="rejected">Rejected</Option>
                    </Select>
                </Col>
            </Row>

            <Table
                columns={columns}
                dataSource={filteredData}
                loading={isLoading}
                rowKey="id"
                pagination={false}
                bordered
                scroll={{ x: 'max-content' }}
            />
            <DomainDrawer
                visible={isDrawerVisible}
                onClose={() => setIsDrawerVisible(false)}
                domain={currentDomain}
            />
        </div>
    );
};

export default DomainTable;
