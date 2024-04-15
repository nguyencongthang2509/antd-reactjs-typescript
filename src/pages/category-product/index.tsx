import {
  CheckOutlined,
  CloseOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Form,
  message,
  Popconfirm,
  Row,
  Table,
  Tooltip,
  Typography,
  Upload,
} from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { useEffect, useState } from "react";
import { CategoryProductAPI } from "../../apis/categoryProduct.api";
import { ContainerAPI } from "../../apis/container.api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  AddCategoryProduct,
  DeleteCategoryProduct,
  GetCategoryProduct,
  SetCategoryProduct,
  UpdateCategoryProduct,
} from "../../app/reducers/CategoryProduct/CategoryProduct.reducer";
import productPNG from "../../assets/images/product.png";
import { EditableCell } from "../../components/edit-table-cell";
import { GetFile } from "../../helper/getFile.helper";
import { ICategoryProduct } from "../../interface/CategoryProduct.interface";

const { Title } = Typography;

export default function CategoryProduct() {
  const data = useAppSelector(GetCategoryProduct);
  const dispatch = useAppDispatch();
  useEffect(() => {
    CategoryProductAPI.fetchAll().then((result: any) => {
      dispatch(SetCategoryProduct(result.data));
    });
  }, [dispatch]);
  const [form] = Form.useForm();
  const isEditing = (record: ICategoryProduct) => record.id === editingKey;
  const [editingKey, setEditingKey] = useState<number | undefined>();

  const edit = (record: Partial<ICategoryProduct>) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey(undefined);
  };
  const save = (id?: number) => {
    try {
      if (id) {
        const values = form.getFieldsValue() as ICategoryProduct;
        let isError = false;
        const errors = form.getFieldsError();

        errors.forEach((el) => {
          if (el.errors.length > 0) {
            isError = true;
          }
        });

        if (!isError) {
          CategoryProductAPI.update(id, values).then((result: any) => {
            setEditingKey(undefined);
            dispatch(UpdateCategoryProduct(result.data));
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
  const duplicate = (record: Partial<ICategoryProduct>) => {
    CategoryProductAPI.create({
      title: record.title,
    }).then((result: any) => {
      dispatch(AddCategoryProduct(result.data));
    });
  };
  const remove = (record: Partial<ICategoryProduct>) => {
    if (record.id) {
      CategoryProductAPI.delete(record.id).then(() => {
        dispatch(DeleteCategoryProduct(record));
      });
    }
  };

  const upload = (record: ICategoryProduct, info: UploadChangeParam) => {
    ContainerAPI.upload(info.file.originFileObj as File).then((result) => {
      const photoURL = GetFile(result.data);
      if (record.id) {
        CategoryProductAPI.update(record.id, { ...record, photoURL }).then(
          (result) => {
            dispatch(UpdateCategoryProduct(result.data));
          }
        );
      }
    });
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      render: (_: null, record: ICategoryProduct) => {
        const idx = data.findIndex(
          (el: ICategoryProduct) => el.id === record.id
        );
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
      title: "Đường dẫn ảnh",
      dataIndex: "photoURL",
      width: "30%",
      render: (_: null, record: ICategoryProduct) => {
        return (
          <>
            <Upload
              customRequest={(options) => {
                if (options.onSuccess) {
                  options.onSuccess("ok");
                }
              }}
              onChange={(e) => upload(record, e)}
              maxCount={1}
              showUploadList={false}
            >
              <Avatar
                src={record.photoURL ? record.photoURL : productPNG}
                size="large"
              />
            </Upload>
          </>
        );
      },
    },
    {
      title: "Thiết lập",
      render: (_: null, record: ICategoryProduct) => {
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
              <Typography.Link
                className="mr-4"
                disabled={editingKey !== undefined}
                onClick={() => edit(record)}
              >
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

            <Popconfirm
              title="Bạn có muốn nhân bản danh mục này không?"
              onConfirm={() => duplicate(record)}
            >
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
      onCell: (record: ICategoryProduct) => ({
        record: record,
        inputType: col.dataIndex === "price" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const add = () => {
    CategoryProductAPI.create({
      title: "CategoryProduct",
    }).then((result: any) => {
      dispatch(AddCategoryProduct(result.data));
    });
  };
  return (
    <>
      <Row>
        <Title level={3}>Danh mục sản phẩm</Title>
      </Row>
      <Row className="mb-4">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="mr-4"
          onClick={add}
        >
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
