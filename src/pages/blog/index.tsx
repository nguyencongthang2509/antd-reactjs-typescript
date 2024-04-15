import { PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Row, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { BlogAPI } from "../../apis/blog.api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { GetBlog, SetBlog } from "../../app/reducers/Blog/Blog.reducer";
import { DeleteCategoryBlog } from "../../app/reducers/CategoryBlog/CategoryBlog.reducer";
import { EditableCell } from "../../components/edit-table-cell";
import { IBlog } from "../../interface/Blog.interface";
import ModalBlog from "./ModalBlog";
import TableSettingItem from "./TableSettingItem";

const { Title } = Typography;

interface User {
  firstName: string;
  lastName: string;
  age: number;
}
export default function Blog() {
  const data = useAppSelector(GetBlog);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);

  const [text, setText] = useState<string>("Text");
  useEffect(() => {
    BlogAPI.fetchAll().then((result: any) => {
      dispatch(SetBlog(result.data));
    });
  }, [dispatch]);

  const remove = (record: Partial<IBlog>) => {
    if (record.id) {
      BlogAPI.delete(record.id).then(() => {
        dispatch(DeleteCategoryBlog(record));
      });
    }
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      render: (_: null, record: IBlog) => {
        const idx = data.findIndex((el: IBlog) => el.id === record.id);
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
      title: "Mô tả",
      dataIndex: "metaDescription",
      width: "30%",
      editable: true,
    },
    {
      title: "Hình ảnh",
      dataIndex: "photoURL",
      width: "10%",
      editable: true,
      render: (_: null, record: IBlog) => {
        return (
          <>
            <Avatar src={record.photoURL} size="large" />
          </>
        );
      },
    },
    {
      title: "Thiết lập",
      render: (_: null, record: IBlog) => {
        return (
          <>
            <TableSettingItem blog={record} remove={remove} />
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
      onCell: (record: IBlog) => ({
        record: record,
        inputType: col.dataIndex === "price" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  const search = () => {
    // get API data
  };

  //get
  useEffect(() => {
    search();
  }, []);

  // pagination
  const [activePage, setActivePage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(1);

  // update
  useEffect(() => {
    search();
  }, [activePage, limit]);

  // update
  useEffect(() => {
    // ham gi
  }, [limit]);

  return (
    <>
      {showModal && (
        <ModalBlog modalOpen={showModal} setModalOpen={setShowModal} />
      )}

      <Row>
        <Title level={3}>Danh mục bài viết</Title>
      </Row>
      <Row className="mb-4">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="mr-4"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Thêm mới
        </Button>
      </Row>
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
    </>
  );
}
