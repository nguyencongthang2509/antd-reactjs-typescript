import { EditOutlined } from "@ant-design/icons";
import { Button, Row } from "antd";
import { useState } from "react";
import { IAccount } from "../../interface/Account.interface";
import ModalEditRoleAccount from "./ModalEditRoleAccount";

interface ITableSettingItemProps {
  record: IAccount;
}
export default function TableSettingItem(props: ITableSettingItemProps) {
  const { record } = props;
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleShowModal = (isShowModal: boolean) => {
    setShowModal(isShowModal);
  };

  return (
    <>
      <Row style={{ width: 130 }} className="items-center justify-between">
        {record.roles && record.roles.length > 0 && record.roles[0].name}
        <Button
          icon={<EditOutlined twoToneColor="blue" />}
          type="ghost"
          onClick={() => handleShowModal(true)}
        />
      </Row>
      {showModal && (
        <ModalEditRoleAccount
          showModal={showModal}
          handleShowModal={handleShowModal}
          account={record}
        />
      )}
    </>
  );
}
