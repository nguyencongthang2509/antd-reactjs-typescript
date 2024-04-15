import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, message, Row, Select, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { OrderAPI } from "../../apis/order.api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  DeleteOrder,
  GetOrder,
  SetOrder,
  UpdateOrder,
} from "../../app/reducers/Order/Order.reducer";
import { EditableCell } from "../../components/edit-table-cell";
import { getAddress } from "../../helper/getAddress.helper";
import { ICity } from "../../interface/Address.interface";
import { IOrder } from "../../interface/Order.interface";
import TableSettingItem from "./TableSettingItem";

const { Title } = Typography;
const { Option } = Select;

export default function Product() {
  const data = useAppSelector(GetOrder);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const [location, setLocation] = useState<ICity[]>([]);

  useEffect(() => {
    OrderAPI.fetchAll().then((result) => {
      dispatch(SetOrder(result.data));
    });
  }, [dispatch]);
  useEffect(() => {
    searchAddress();
  }, []);
  const searchAddress = async () => {
    const result = await getAddress();
    setLocation(result);
  };

  const changeStatus = (record: IOrder, e: string) => {
    if (record.id && typeof e === "string") {
      OrderAPI.update(record.id, { ...record, status: e }).then((result) => {
        dispatch(UpdateOrder(result.data));
      });
    }
  };

  const deleteOrder = (record: IOrder) => {
    if (record.id) {
      OrderAPI.delete(record.id)
        .then(() => {
          dispatch(DeleteOrder(record));
        })
        .catch((err) => {
          message.error("Error");
        });
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      render: (_: null, record: IOrder) => {
        const idx = data.findIndex((el: IOrder) => el.id === record.id);
        return <Typography.Title level={5}>{idx + 1}</Typography.Title>;
      },
    },
    {
      title: "Mã đơn",
      dataIndex: "code",
      width: "7%",
      editable: false,
    },
    {
      title: "Họ tên",
      width: "12%",
      editable: false,
      render(_: null, record: IOrder) {
        return <>{record.firstName + " " + record.lastName}</>;
      },
    },
    {
      title: "SĐT",
      dataIndex: "phoneNumber",
      width: "10%",
      editable: false,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
      editable: false,
    },
    {
      title: "Địa chỉ",
      width: "20%",
      editable: false,
      render: (_: null, record: IOrder) => {
        const city = location.find((el) => el.code === record.city);
        const district = city?.districts.find(
          (el) => el.code === record.district
        );
        return (
          <>
            {district?.name} - {city?.name}
          </>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: "10%",
      editable: false,
      render: (_: any, record: IOrder) => {
        return (
          <>
            <Select
              value={record.status}
              style={{ width: 180 }}
              onChange={(e) => changeStatus(record, e)}
            >
              <Option key={2} value={"Đã tạo đơn"}>
                Đã tạo đơn
              </Option>
              <Option key={2} value={"Thành công"}>
                Đã tạo đơn
              </Option>
            </Select>
          </>
        );
      },
    },
    {
      title: "Thiết lập",
      render: (_: null, record: IOrder) => {
        return (
          <>
            <TableSettingItem deleteOrder={deleteOrder} record={record} />
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
      onCell: (record: IOrder) => ({
        record: record,
        inputType: col.dataIndex === "price" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  return (
    <>
      <Row>
        <Title level={3}>Sản phẩm</Title>
      </Row>
      <Row className="mb-4">
        <Button type="primary" icon={<PlusOutlined />} className="mr-4">
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
