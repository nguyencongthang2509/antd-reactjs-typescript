import {
    Button,
    Checkbox,
    Col,
    Form,
    Input,
    Layout,
    message,
    Row,
    Select,
    Typography
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SingleLoading from "../../components/loading/Loading";
import { getAddress } from "../../helper/getAddress.helper";
import { IAccount } from "../../interface/Account.interface";
import { ICity, IDistrict } from "../../interface/Address.interface";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

interface IRegister {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  city?: number;
  district?: number;
  checkRead?: boolean;
}

export default function Register() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [citys, setCitys] = useState<ICity[]>([]);

  const [districts, setDistricts] = useState<IDistrict[]>([]);
  const [formValue, setFormValue] = useState<IRegister>({
    city: 1,
    district: 1,
    checkRead: false,
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    searchAddress();
  }, []);

  useEffect(() => {
    // changeCity();
  }, [formValue.city]);
  const searchAddress = async () => {
    const result = await getAddress();
    setCitys(result);
    setDistricts(result[0].districts);
  };
//   const changeCity = () => {
//     const index = citys.findIndex((el) => el.code === formValue.city);
//     if (index > -1) {
//       const data = citys[index].districts;
//       setDistricts(citys[index].districts);
//       form.setFieldValue("district", data[0].code);
//       setFormValue((f) => ({
//         ...f,
//         district: data[0].code,
//       }));
//     }
//   };
  const onFinish = (values: IAccount) => {
    setLoading(true);
    console.log("values", values);
  };
  const onFinishFailed = () => {
    message.error("Error").then((r) => console.log(r));
  };

  const onValuesChange = () => {
    const values = form.getFieldsValue();
    setFormValue(values);
    console.log(values);
  };

  return (
    <>
      {loading && <SingleLoading />}
      <Content className="bg-[url('./bg.png')] bg-cover w-screen h-screen flex items-center justify-center">
        <Row className="w-[90%] h-[90%] flex rounded-3xl overflow-hidden">
          <Col
            span={16}
            className="bg-white h-full flex flex-col items-center justify-center"
          >
            <Title level={2}>Đăng ký</Title>
            <Form
              name="register"
              initialValues={formValue}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              form={form}
              onValuesChange={onValuesChange}
              labelCol={{ span: 10 }}
              labelAlign="left"
              layout="horizontal"
            >
              <Form.Item label="Họ" required name="firstName">
                <Input />
              </Form.Item>
              <Form.Item label="Tên" required name="lastName">
                <Input />
              </Form.Item>
              <Form.Item label="Tên đăng nhập" required name="email">
                <Input />
              </Form.Item>
              <Form.Item label="Mật khẩu" required name="password">
                <Input.Password size="large" />
              </Form.Item>
              <Form.Item
                label="Xác nhận mật khẩu"
                required
                name="confirmPassword"
              >
                <Input.Password size="large" />
              </Form.Item>
              <Form.Item label="Tỉnh" required name="city">
                <Select style={{ width: 180 }}>
                  {citys.length > 0 &&
                    citys.map((city: ICity, index: number) => {
                      return (
                        <Option key={index} value={city.code}>
                          {city.name}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
              <Form.Item label="Huyện" required name="district">
                <Select style={{ width: 180 }}>
                  {districts.length > 0 &&
                    districts.map((district: IDistrict, index: number) => {
                      return (
                        <Option key={index} value={district.code}>
                          {district.name}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
              <Form.Item label="" name="checkRead" valuePropName="checked">
                <Checkbox>Ban da doc va dong y</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col
            span={8}
            className="h-full bg-gradient-to-tl from-[#3ba5b4] to-[#38ba8a] opacity-90 relative p-5"
          >
            <Col className="absolute bottom-0 top-0 left-0 right-0 flex flex-col items-center justify-center text-white">
              <Title
                className={`mt-[100px] lg:text-[30px] text-[40px] font-bold text-white `}
              >
                Welcome Back!
              </Title>
              <Title className="max-w-[60%] text-center text-[16px] mt-5">
                {" "}
                To keep contected with us please login with your personal info
              </Title>
              <Button
                onClick={() => navigate("/login")}
                className="hover:bg-white hover:text-[#3aaea1] bg-transparent cursor-pointer uppercase text-center no-underline w-[200px] text-[14px] h-[55px] border-solid border-2 text-white leading-10 border-white rounded-3xl m-10"
              >
                {" "}
                Sign Up
              </Button>
            </Col>
          </Col>
        </Row>
      </Content>
    </>
  );
}
