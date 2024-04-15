import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import DatePicker from "react-multi-date-picker";
import { OrderAPI } from "../../apis/order.api";
import { IOrderStatisticRevenue } from "../../interface/response/OrderStatisticRevenue.interface";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardOrderByRevenue() {
  const [year, setYear] = useState<any>(new Date());
  const [labels, setLabels] = useState<string[]>([]);
  const [dataRevenue, setDataRevenue] = useState<number[]>([]);

  const search = async () => {
    OrderAPI.statisticRevenue(year.getFullYear()).then((result) => {
      const res = result.data as IOrderStatisticRevenue[];
      let respLabels: string[] = [];
      let respData: number[] = [];
      res.forEach((item: IOrderStatisticRevenue) => {
        respLabels.push(item.label);
        respData.push(item.revenue);
      });
      setLabels(respLabels);
      setDataRevenue(respData);
    });
  };
  useEffect(() => {
    search();
    // eslint-disable-next-line
  }, [year]);

  const data = {
    labels,
    datasets: [
      {
        label: "Thống kê đơn hàng theo doanh thu",
        backgroundColor: "rgb(46, 54, 80)",
        borderColor: "rgb(255, 99, 132)",
        data: dataRevenue,
      },
    ],
  };

  return (
    <>
      <div className="mt-4">
        <DatePicker
          onChange={(value) => setYear(value)}
          value={year}
          onlyYearPicker
          format="YYYY"
        />
      </div>
      <Bar data={data} />
    </>
  );
}
