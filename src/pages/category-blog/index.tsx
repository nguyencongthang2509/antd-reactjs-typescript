import { CheckOutlined, CloseOutlined, CopyOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, message, Popconfirm, Row, Table, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import { CategoryBlogAPI } from "../../apis/categoryBlog.api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    AddCategoryBlog,
    UpdateCategoryBlog,
    DeleteCategoryBlog,
    SetCategoryBlog,
    GetCategoryBlog,
} from "../../app/reducers/CategoryBlog/CategoryBlog.reducer";
import { EditableCell } from "../../components/edit-table-cell";
import { ICategoryBlog } from "../../interface/CategoryBlog.interface";

const { Title } = Typography;

export default function CategoryBlog() {
    const data = useAppSelector(GetCategoryBlog);
    const dispatch = useAppDispatch();
    useEffect(() => {
        CategoryBlogAPI.fetchAll().then((result: any) => {
            dispatch(SetCategoryBlog(result.data));
        });
    }, [dispatch]);
    const [form] = Form.useForm();
    const isEditing = (record: ICategoryBlog) => record.id === editingKey;
    const [editingKey, setEditingKey] = useState<number | undefined>();

    const edit = (record: Partial<ICategoryBlog>) => {
        form.setFieldsValue({ ...record });
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey(undefined);
    };
    const save = (id?: number) => {
        try {
            if (id) {
                const values = form.getFieldsValue() as ICategoryBlog;
                let isError = false;
                const errors = form.getFieldsError();

                errors.forEach((el) => {
                    if (el.errors.length > 0) {
                        isError = true;
                    }
                });

                if (!isError) {
                    CategoryBlogAPI.update(id, values).then((result: any) => {
                        setEditingKey(undefined);
                        dispatch(UpdateCategoryBlog(result.data));
                    });
                } else {
                    message.error("Validate Failed");
                }
            } else {
                message.error("Validate Failed");
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };
    const duplicate = (record: Partial<ICategoryBlog>) => {
        CategoryBlogAPI.create({
            title: record.title,
        }).then((result: any) => {
            dispatch(AddCategoryBlog(result.data));
        });
    };
    const remove = (record: Partial<ICategoryBlog>) => {
        if (record.id) {
            CategoryBlogAPI.delete(record.id).then((result: any) => {
                dispatch(DeleteCategoryBlog(record));
            });
        }
    };
    const columns = [
        {
            title: "STT",
            dataIndex: "id",
            render: (_: null, record: ICategoryBlog) => {
                const idx = data.findIndex((el: ICategoryBlog) => el.id === record.id);
                return <Typography.Title level={5}>{idx + 1}</Typography.Title>;
            },
        },
        {
            title: "Tiêu đề",
            dataIndex: "title",
            width: "30%",
            editable: true,
        },
        {
            title: "Thiết lập",
            render: (_: null, record: ICategoryBlog) => {
                const editTable = isEditing(record);
                return editTable ? (
                    <>
                        <Tooltip title="Lưu">
                            <Typography.Link className="mr-4" onClick={() => save(record.id)}>
                                <CheckOutlined style={{ fontSize: "130%" }} />
                            </Typography.Link>
                        </Tooltip>
                        <Tooltip title="Đóng">
                            <Typography.Link onClick={cancel}>
                                <CloseOutlined style={{ fontSize: "130%" }} />
                            </Typography.Link>
                        </Tooltip>
                    </>
                ) : (
                    <>
                        <Tooltip title="Sửa">
                            <Typography.Link className="mr-4" disabled={editingKey !== undefined} onClick={() => edit(record)}>
                                <EditOutlined style={{ fontSize: "130%" }} />
                            </Typography.Link>
                        </Tooltip>
                        <Popconfirm
                            title="Bạn có chắc chắn muốn xóa không?"
                            onConfirm={() => {
                                remove(record);
                            }}
                        >
                            <Typography.Link className="mr-4">
                                <DeleteOutlined style={{ fontSize: "130%" }} />
                            </Typography.Link>
                        </Popconfirm>

                        <Popconfirm title="Bạn có muốn nhân bản danh mục này không?" onConfirm={() => duplicate(record)}>
                            <Typography.Link>
                                <CopyOutlined style={{ fontSize: "130%" }} />
                            </Typography.Link>
                        </Popconfirm>
                    </>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: ICategoryBlog) => ({
                record: record,
                inputType: col.dataIndex === "price" ? "number" : "text",
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const add = () => {
        CategoryBlogAPI.create({
            title: "CategoryBlog",
        }).then((result: any) => {
            dispatch(AddCategoryBlog(result.data));
        });
    };
    return (
        <>
            <Row>
                <Title level={3}>Danh mục bài viết</Title>
            </Row>
            <Row className="mb-4">
                <Button type="primary" icon={<PlusOutlined />} className="mr-4" onClick={add}>
                    Thêm mới
                </Button>
            </Row>
            <Form form={form} component={false}>
                <Table
                    columns={mergedColumns}
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    dataSource={data}
                    bordered
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                />
            </Form>
        </>
    );
}
