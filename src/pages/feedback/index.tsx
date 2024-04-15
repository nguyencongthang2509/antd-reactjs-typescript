import { DeleteOutlined } from "@ant-design/icons";
import {
  Avatar, message,
  Popconfirm,
  Row,
  Table,
  Tooltip,
  Typography
} from "antd";
import { useEffect } from "react";
import { FeedbackAPI } from "../../apis/feedback.api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  DeleteFeedback,
  GetFeedback,
  SetFeedback
} from "../../app/reducers/Feedback/Feedback.reducer";
import productPNG from "../../assets/images/product.png";
import { IFeedback } from "../../interface/Feedback.interface";

const { Title, Paragraph, Text } = Typography;

export default function Feedback() {
  const data = useAppSelector(GetFeedback);
  const dispatch = useAppDispatch();
  

  useEffect(() => {
    FeedbackAPI.fetchAll().then((result) => {
      dispatch(SetFeedback(result.data));
    });
  }, [dispatch]);

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      render: (_: null, record: IFeedback) => {
        const idx = data.findIndex((el: IFeedback) => el.id === record.id);
        return <Typography.Title level={5}>{idx + 1}</Typography.Title>;
      },
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      width: "20%",
      editable: true,
      render: (_: null, record: IFeedback) => {
        return (
          <Tooltip title={record.content} placement="bottom">
            <Paragraph ellipsis={{ rows: 2, suffix: "..." }}>
              {record.content}
            </Paragraph>
          </Tooltip>
        );
      },
    },
    {
      title: "Avatar",
      dataIndex: "color",
      width: "8%",
      render: (_: null, record: IFeedback) => {
        return (
          <>
            <Avatar
              src={record.account?.avatar ? record.account?.avatar : productPNG}
              size="large"
            />
          </>
        );
      },
    },
    {
      title: "Người gửi",
      width: "13%",
      editable: true,
      render: (_: null, record: IFeedback) => {
        return (
          <Text>
            {record.account?.firstName} {record.account?.lastName}
          </Text>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
      editable: true,
      render: (_: null, record: IFeedback) => {
        return <Text>{record.account?.email}</Text>;
      },
    },
    {
      title: "SDT",
      dataIndex: "phoneNumber",
      width: "12%",
      editable: true,
      render: (_: null, record: IFeedback) => {
        return <Text>{record.account?.phoneNumber}</Text>;
      },
    },
    {
      title: "Thiết lập",
      render: (_: null, record: IFeedback) => {
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

  const deleteRecord = (record: IFeedback) => {
    if (record.id) {
      FeedbackAPI.delete(record.id)
        .then(() => {
          dispatch(DeleteFeedback(record));
        })
        .catch((err) => {
          message.error("Error");
        });
    }
  };

  return (
    <>
      <Row>
        <Title level={3}>Phản hồi</Title>
      </Row>

      <Table columns={columns} dataSource={data} bordered rowKey="id" />
    </>
  );
}
