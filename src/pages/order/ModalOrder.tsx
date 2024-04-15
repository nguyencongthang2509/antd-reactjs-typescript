import { Avatar, Button, Modal, Row, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { OrderProductAPI } from "../../apis/orderproduct.api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  GetOrderProduct,
  SetOrderProduct
} from "../../app/reducers/OrderProduct/OrderProduct.reducer";
import productPNG from "../../assets/images/product.png";
import { EditableCell } from "../../components/edit-table-cell";
import { getAddress } from "../../helper/getAddress.helper";
import { ICity } from "../../interface/Address.interface";
import { IOrder } from "../../interface/Order.interface";
import { IOrderProduct } from "../../interface/OrderProduct.interface";
import { IProduct } from "../../interface/Product.interface";
import "./index.css";

const { Text } = Typography;

interface IModalOrderProps {
  modalOpen: boolean;
  setModalOpen: (el: boolean) => void;
  order?: IOrder;
}

export default function ModalOrder(props: IModalOrderProps) {
  const { modalOpen, setModalOpen, order } = props;
  const orderproducts = useAppSelector(GetOrderProduct);
  const dispatch = useAppDispatch();

  const [orders, setOrders] = useState<IOrder[]>([]);

  const [location, setLocation] = useState<ICity[]>([]);

  const searchAddress = async () => {
    const result = await getAddress();
    setLocation(result);
  };

  const search = (orderId: number) => {
    if (orderId) {
      OrderProductAPI.fetchFromOrder(orderId)
        .then((result) => {
          dispatch(SetOrderProduct(result.data));
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (order?.id) search(order?.id);
    if (order) {
      setOrders([...orders, order]);
    }
    // eslint-disable-next-line
  }, [order?.id, modalOpen]);

  useEffect(() => {
    searchAddress();
  }, []);

  const columnsKH = [
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
            {record.address}-{district?.name} - {city?.name}
          </>
        );
      },
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      width: "20%",
      editable: false,
    },
  ];

  const columnsProduct = [
    {
      title: "Tên sản phẩm",
      width: "12%",
      render: (_: null, record: IOrderProduct) => {
        return <>{record.product.title}</>;
      },
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      width: "12%",
    },
    {
      title: "Giá",
      dataIndex: "price",
      width: "12%",
    },
    {
      title: "Màu",
      width: "12%",
      render: (_: null, record: IOrderProduct) => {
        return <>{record.product.color}</>;
      },
    },
    {
      title: "Kích cỡ",
      width: "12%",
      render: (_: null, record: IOrderProduct) => {
        return <>{record.product.size}</>;
      },
    },
    {
      title: "Hình ảnh",
      width: "12%",
      editable: false,
      render: (_: null, record: IProduct) => {
        return (
          <>
            <Avatar
              src={record.photoURL ? record.photoURL : productPNG}
              size="large"
            />
          </>
        );
      },
    },
  ];

  const mergedColumnsKH = columnsKH.map((col) => {
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
        // editing: isEditing(record),
      }),
    };
  });

  const mergedColumnsProduct = columnsProduct.map((col) => {
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
      <>
        <Modal
          destroyOnClose={true}
          title="Chi tiết đơn hàng"
          style={{ top: 20 }}
          open={modalOpen}
          onOk={() => setModalOpen(false)}
          onCancel={() => setModalOpen(false)}
          footer={null}
          forceRender
        >
          <Row style={{ width: 1000 }}>
            <Text className="mb-5">Thông tin Khách hàng</Text>
            <Table
              columns={mergedColumnsKH}
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              dataSource={orders}
              bordered
              rowKey="id"
              pagination={false}
              style={{ width: 1000 }}
            />
            <Text className="mb-5">Thông tin giỏ hàng</Text>
            <Table
              columns={mergedColumnsProduct}
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              dataSource={orderproducts.map((el) => {
                return {
                  ...el,
                  amount: el.amount,
                  price: el.price,
                  product: el.product,
                };
              })}
              bordered
              rowKey="id"
              pagination={false}
              style={{ width: 1000 }}
            />
            <Row className="justify-end mt-10 w-full" style={{ left: 100 }}>
              <Button className="mr-4" onClick={() => setModalOpen(false)}>
                Đóng
              </Button>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Row>
          </Row>
        </Modal>
      </>
    </>
  );
}
