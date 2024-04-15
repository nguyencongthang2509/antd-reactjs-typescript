import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, Tooltip, Typography } from "antd";
import { useState } from "react";
import { IBlog } from "../../interface/Blog.interface";
import ModalBlog from "./ModalBlog";

interface ITableItemProps {
  blog: IBlog;
  remove: (el: IBlog) => void;
}
export default function TableSettingItem(props: ITableItemProps) {
  const { blog, remove } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      {showModal && (
        <ModalBlog
          modalOpen={showModal}
          setModalOpen={setShowModal}
          blog={blog}
        />
      )}
      <Tooltip title="Sửa">
        <Typography.Link
          className="mr-4"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <EditOutlined style={{ fontSize: "130%" }} />
        </Typography.Link>
      </Tooltip>
      <Popconfirm
        title="Bạn có chắc chắn muốn xóa không?"
        onConfirm={() => remove(blog)}
      >
        <Typography.Link className="mr-4">
          <DeleteOutlined style={{ fontSize: "130%" }} />
        </Typography.Link>
      </Popconfirm>
    </>
  );
}
