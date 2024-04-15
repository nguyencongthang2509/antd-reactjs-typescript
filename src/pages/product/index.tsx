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
  Select,
  Table,
  Tooltip,
  Typography,
  Upload,
} from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { useEffect, useState } from "react";
import { ContainerAPI } from "../../apis/container.api";
import { ProductAPI } from "../../apis/product.api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  AddProduct,
  DeleteProduct,
  GetProduct,
  SetProduct,
  UpdateProduct,
} from "../../app/reducers/Product/Product.reducer";
import {
  SetCategoryProduct,
  GetCategoryProduct,
} from "../../app/reducers/CategoryProduct/CategoryProduct.reducer";
import productPNG from "../../assets/images/product.png";
import { EditableCell } from "../../components/edit-table-cell";
import { GetFile } from "../../helper/getFile.helper";
import { IProduct } from "../../interface/Product.interface";
import "./index.css";

import { ICategoryProduct } from "../../interface/CategoryProduct.interface";
import { CategoryProductAPI } from "../../apis/categoryProduct.api";

const { Title, Paragraph } = Typography;
const { Option } = Select;
export default function Product() {
  const data = useAppSelector(GetProduct);
  const categoryProduct = useAppSelector(GetCategoryProduct);
  const dispatch = useAppDispatch();

  useEffect(() => {
    ProductAPI.fetchAll().then((result) => {
      dispatch(SetProduct(result.data));
    });
    CategoryProductAPI.fetchAll().then((result) => {
      dispatch(SetCategoryProduct(result.data));
    });
  }, [dispatch]);

  const [form] = Form.useForm();
  const isEditing = (record: IProduct) => record.id === editingKey;
  const [editingKey, setEditingKey] = useState<number | undefined>();

  const edit = (record: Partial<IProduct>) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey(undefined);
  };

  const save = (record: IProduct) => {
    try {
      if (record.id) {
        const values = form.getFieldsValue() as IProduct;
        let isError = false;
        const errors = form.getFieldsError();

        errors.forEach((el) => {
          if (el.errors.length > 0) {
            isError = true;
          }
        });

        if (!isError) {
          ProductAPI.update(record.id, values).then((result) => {
            dispatch(UpdateProduct(result.data));
            setEditingKey(undefined);
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

  const upload = (record: IProduct, info: UploadChangeParam) => {
    ContainerAPI.upload(info.file.originFileObj as File).then((result) => {
      const photoURL = GetFile(result.data);
      if (record.id) {
        ProductAPI.update(record.id, { ...record, photoURL }).then((result) => {
          dispatch(UpdateProduct(result.data));
        });
      }
    });
  };
  const changeCategoryProduct = (record: IProduct, e: number | string) => {
    if (record.id && typeof e === "number") {
      ProductAPI.update(record.id, { ...record, categoryProductId: e }).then(
        (result) => {
          dispatch(UpdateProduct(result.data));
        }
      );
    }
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      render: (_: null, record: IProduct) => {
        const idx = data.findIndex((el: IProduct) => el.id === record.id);
        return <Typography.Title level={5}>{idx + 1}</Typography.Title>;
      },
    },
    {
      title: "Tên",
      dataIndex: "title",
      width: "10%",
      editable: true,
    },
    {
      title: "Giá",
      dataIndex: "price",
      width: "10%",
      editable: true,
      render: (_: null, record: IProduct) => {
        return (
          <>
            {record.price?.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </>
        );
      },
    },
    {
      title: "Hình ảnh",
      width: "10%",
      render: (_: null, record: IProduct) => {
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
      title: "Màu sắc",
      dataIndex: "color",
      width: "7%",
      editable: true,
    },
    {
      title: "Danh mục sản phẩm",
      dataIndex: "categoryProductId",
      render: (_: any, record: IProduct) => {
        return (
          <>
            <Select
              value={record.categoryProductId}
              style={{ width: 180 }}
              onChange={(e) => changeCategoryProduct(record, e)}
            >
              {categoryProduct.length > 0 &&
                categoryProduct.map(
                  (cateProduct: ICategoryProduct, index: number) => {
                    return (
                      <Option key={index} value={cateProduct.id}>
                        {cateProduct.title}
                      </Option>
                    );
                  }
                )}
            </Select>
          </>
        );
      },
    },
    {
      title: "Mô tả",
      dataIndex: "metaDescription",
      width: "20%",
      editable: true,
      render: (_: null, record: IProduct) => {
        return (
          <Tooltip
            title={record.metaDescription}
            style={{ height: 150 }}
            placement="bottom"
          >
            <Paragraph ellipsis={{ rows: 2, suffix: "..." }}>
              {record.metaDescription}
            </Paragraph>
          </Tooltip>
        );
      },
    },
    {
      title: "Kích cỡ",
      dataIndex: "size",
      width: "7%",
      editable: true,
    },
    {
      title: "Thiết lập",
      render: (_: null, record: IProduct) => {
        const editTable = isEditing(record);
        return editTable ? (
          <>
            <Tooltip title="Lưu">
              <Typography.Link className="mr-4" onClick={() => save(record)}>
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
              onConfirm={() => deleteRecord(record)}
            >
              <Typography.Link className="mr-4">
                <DeleteOutlined style={{ fontSize: "130%" }} />
              </Typography.Link>
            </Popconfirm>

            <Tooltip title="Nhân bản">
              <Typography.Link>
                <CopyOutlined style={{ fontSize: "130%" }} />
              </Typography.Link>
            </Tooltip>
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
      onCell: (record: IProduct) => ({
        record: record,
        inputType: col.dataIndex === "price" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const add = () => {
    ProductAPI.create({
      title: "Product",
      price: 200000,
      color: "",
      size: "S",
      metaDescription: "",
    }).then((result) => {
      dispatch(AddProduct(result.data));
    });
  };

  const deleteRecord = (record: IProduct) => {
    if (record.id) {
      ProductAPI.delete(record.id)
        .then(() => {
          dispatch(DeleteProduct(record));
        })
        .catch((err) => {
          message.error("Error");
        });
    }
  };

  return (
    <>
      <Row>
        <Title level={3}>Sản phẩm</Title>
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
