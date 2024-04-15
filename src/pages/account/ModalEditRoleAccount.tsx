import { message, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { AccountAPI } from "../../apis/account.api";
import { useAppDispatch } from "../../app/hooks";
import { SetAccount } from "../../app/reducers/Account/Account.reducer";
import { IAccount } from "../../interface/Account.interface";
import "./index.css";
interface IModalEditRoleAccountProps {
  showModal: boolean;
  handleShowModal: (el: boolean) => void;
  account: IAccount;
}

const { Option } = Select;
export default function ModalEditRoleAccount(
  props: IModalEditRoleAccountProps
) {
  const { showModal, handleShowModal, account } = props;
  const dispatch = useAppDispatch();
  const [roleId, setRoleId] = useState<number>(3);

  useEffect(() => {
    if (account.roles && account.roles.length > 0 && account.roles[0].id) {
      setRoleId(account.roles[0].id);
    }
  }, [account]);

  const submit = () => {
    if (account.id) {
      AccountAPI.changeRole(account.id, roleId)
        .then(() => {
          message.success("Thay đổi thành công!");
          AccountAPI.fetchAll().then((result) => {
            dispatch(SetAccount(result.data));
          });
          handleShowModal(false);
        })
        .catch(() => {
          message.error("Error!");
        });
    }
  };
  return (
    <>
      <Modal
        title="Thay đổi Role tài khoản"
        open={showModal}
        onOk={submit}
        onCancel={() => handleShowModal(false)}
      >
        <Select defaultValue={3} value={roleId} onChange={(e) => setRoleId(e)}>
          <Option value={1}>SUPERADMIN</Option>
          <Option value={2}>ADMIN</Option>
          <Option value={3}>USER</Option>
        </Select>
      </Modal>
    </>
  );
}
