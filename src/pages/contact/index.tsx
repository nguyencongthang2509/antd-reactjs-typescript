import { DeleteOutlined } from "@ant-design/icons";
import { message, Popconfirm, Row, Table, Tooltip, Typography } from "antd";
import { useEffect } from "react";
import { ContactAPI } from "../../apis/contact.api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  DeleteContact,
  GetContact,
  SetContact,
} from "../../app/reducers/Contact/Contact.reducer";
import { IContact } from "../../interface/Contact.interface";
import { IProduct } from "../../interface/Product.interface";

const { Title, Paragraph } = Typography;

export default function Contact() {
  const data = useAppSelector(GetContact);
  const dispatch = useAppDispatch();

  useEffect(() => {
    ContactAPI.fetchAll().then((result) => {
      dispatch(SetContact(result.data));
    });
  }, [dispatch]);

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      render: (_: null, record: IContact) => {
        const idx = data.findIndex((el: IContact) => el.id === record.id);
        return <Typography.Title level={5}>{idx + 1}</Typography.Title>;
      },
    },
    {
      title: "Tiêu đề",
      dataIndex: "subject",
      width: "10%",
    },
    {
      title: "Nội dung",
      dataIndex: "message",
      width: "30%",
      render: (_: null, record: IContact) => {
        return (
          <Tooltip title={record.message} placement="bottom">
            <Paragraph ellipsis={{ rows: 2, suffix: "..." }}>
              {record.message}
            </Paragraph>
          </Tooltip>
        );
      },
    },

    {
      title: "Người gửi ",
      dataIndex: "name",
      width: "10%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "15%",
    },
    {
      title: "Thiết lập",
      render: (_: null, record: IContact) => {
        return (
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa không?"
            onConfirm={() => deleteRecord(record)}
          >
            <Typography.Link className="mr-4">
              <DeleteOutlined style={{ fontSize: "130%" }} />
            </Typography.Link>
          </Popconfirm>
        );
      },
    },
  ];

  const deleteRecord = (record: IProduct) => {
    if (record.id) {
      ContactAPI.delete(record.id)
        .then(() => {
           dispatch(DeleteContact(record));
          
        })
        .catch((err) => {
          message.error("Error");
        });
    }
  };

  return (
    <>
      <Row>
        <Title level={3}>Liên hệ</Title>
      </Row>
      <Table columns={columns} dataSource={data} bordered rowKey="id" />
    </>
  );
}
