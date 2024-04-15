import { CopyrightOutlined } from "@ant-design/icons";
import { Layout, Row, Typography } from "antd";
const { Link } = Typography;
const { Footer } = Layout;
export default function FooterComponent() {
  return (
    <Footer>
      <Row className="h-full items-center justify-start">
        Copyright <CopyrightOutlined className="ml-1 mr-1" /> 2023 by
        <Link href="https://ant.design" target="_blank" className="ml-1">
          HoangMinh
        </Link>
      </Row>
    </Footer>
  );
}
