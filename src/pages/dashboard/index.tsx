import { Row } from "antd";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import DashboardOrderByAmount from "../../components/dashboard/DashboardOrderByAmount";
import DashboardOrderByRevenue from "../../components/dashboard/DashboardOrderByRevenue";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  return (
    <Row className="h-2/4">
      <DashboardOrderByAmount />
      <DashboardOrderByRevenue />
    </Row>
  );
}
