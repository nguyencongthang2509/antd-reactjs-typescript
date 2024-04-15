import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Layout,
  message,
  Row,
  Typography,
} from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountAPI } from "../../apis/account.api";
import SingleLoading from "../../components/loading/Loading";
import { setToken } from "../../helper/userToken";
import { IAccount } from "../../interface/Account.interface";
import { UserLevels } from "../../interface/constants/UserLevels.const";
import styles from "./Login.module.css";
const { Content } = Layout;
const { Title } = Typography;

interface ILoginData {
  email: string;
  password: string;
  remember: boolean;
}
export default function Login() {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState<ILoginData>({
    email: "",
    password: "",
    remember: false,
  });

  // sua code
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = (values: ILoginData) => {
    setLoading(true);
    setFormValue(values);
    AccountAPI.login(values)
      .then((result) => {
        setLoading(false);
        console.log(result);

        // Update user access token
        setToken(result.data.id, values.remember);
        // Show message toast

        AccountAPI.getMe()
          .then((result) => {
            const currentUser = result.data as IAccount;
            if (
              currentUser &&
              currentUser.roles &&
              currentUser.roles.length > 0 &&
              currentUser.roles[0].name !== UserLevels.USER
            ) {
              message.success("Login success").then();
              // Navigate to dashboard
              navigate("/dashboard");
            } else {
              message.error("Authorization!");
            }
          })
          .catch(() => {
            message.error("Login failed!");
          });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        message.error("Login failed!");
      });
  };

  const onFinishFailed = () => {
    message.error("Error").then((r) => console.log(r));
  };
  return (
    <>
      {loading && <SingleLoading />}
      <Content className="bg-[url('./bg.png')] bg-cover w-screen h-screen flex items-center justify-center">
        <Row className="w-[90%] h-[90%] flex rounded-3xl overflow-hidden">
          <Col
            span={8}
            className="h-full bg-gradient-to-tl from-[#3ba5b4] to-[#38ba8a] opacity-90 relative p-5"
          >
            <Col className="absolute bottom-0 top-0 left-0 right-0 flex flex-col items-center justify-center text-white">
              <Title
                className={`mt-[100px] lg:text-[30px] text-[40px] font-bold text-white ${styles.titleWhite}`}
              >
                Welcome Back!
              </Title>
              <Title className="max-w-[60%] text-center text-[16px] mt-5">
                {" "}
                To keep contected with us please login with your personal info
              </Title>
              <Button
                onClick={() => navigate("/register")}
                className="hover:bg-white hover:text-[#3aaea1] bg-transparent cursor-pointer uppercase text-center no-underline w-[200px] text-[14px] h-[55px] border-solid border-2 text-white leading-10 border-white rounded-3xl m-10"
              >
                {" "}
                Sign In
              </Button>
            </Col>
          </Col>
          <Col
            span={16}
            className="bg-white h-full flex flex-col items-center justify-center"
          >
            <Title level={2}>Đăng nhập</Title>
            <Form
              name="login"
              initialValues={formValue}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item label="Tên đăng nhập" required name="email">
                <Input />
              </Form.Item>
              <Form.Item label="Mật khẩu" required name="password">
                <Input.Password size="large" />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </>
  );
}
