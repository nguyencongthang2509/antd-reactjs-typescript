import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Popconfirm, Tooltip, Typography } from "antd";
import { useState } from "react";
import { IOrder } from "../../interface/Order.interface";
import ModalOrder from "./ModalOrder";

interface ITableSettingItemProps {
  deleteOrder: (el: IOrder) => void;
  record: IOrder;
}
export default function TableSettingItem(props: ITableSettingItemProps) {
  const { deleteOrder, record } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      {showModal && (
        <ModalOrder
          modalOpen={showModal}
          setModalOpen={setShowModal}
          order={record}
        />
      )}

      <Tooltip title="Xem đơn">
        <Typography.Link
          className="mr-4"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <EyeOutlined style={{ fontSize: "130%" }} />
        </Typography.Link>
      </Tooltip>
      <Popconfirm
        title="Bạn có chắc chắn muốn xóa không?"
        onConfirm={() => deleteOrder(record)}
      >
        <Typography.Link className="mr-4">
          <DeleteOutlined style={{ fontSize: "130%" }} />
        </Typography.Link>
      </Popconfirm>
    </>
  );
}
