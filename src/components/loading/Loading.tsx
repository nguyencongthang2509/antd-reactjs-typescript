import Spin from "antd/lib/spin";
import "./index.css";

const SingleLoading = () => {
  return (
    <div className="loading">
      <Spin size="large" />
    </div>
  );
};

export default SingleLoading;
