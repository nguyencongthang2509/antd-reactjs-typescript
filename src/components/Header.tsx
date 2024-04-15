import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Button, Layout, message, Popconfirm, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectUser, UserLogout } from "../app/reducers/Auth/Auth.reducer";
import logo_admin from "../assets/images/admin.png";
const { Header } = Layout;
export default function HeaderComponent() {
  const auth = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <Header>
      <Row className="h-full justify-end items-center">
        <Avatar src={auth?.avatar ? auth.avatar : logo_admin} size="default" />
        <Popconfirm
          title="Bạn chắc chắn muốn đăng xuất"
          onConfirm={() => {
            dispatch(UserLogout());
            message.success("Logout success!");
            navigate("/login");
          }}
        >
          <Button icon={<LogoutOutlined />} type="ghost" className="text-white">
            Đăng xuất
          </Button>
        </Popconfirm>
      </Row>
    </Header>
  );
}
