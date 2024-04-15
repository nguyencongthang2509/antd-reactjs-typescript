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
import { IOrderStatisticAmount } from "../../interface/response/OrderStatisticAmount.interface";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardOrderByAmount() {
  const [year, setYear] = useState<any>(new Date());
  const [labels, setLabels] = useState<string[]>([]);
  const [dataAmount, setDataAmount] = useState<number[]>([]);
  useEffect(() => {
    search();
    // eslint-disable-next-line
  }, [year]); 

  const search = async () => {
    OrderAPI.statisticAmount(year.getFullYear()).then((result) => {
      const res = result.data as IOrderStatisticAmount[];
      let respLabels: string[] = [];
      let respData: number[] = [];
      res.forEach((item: IOrderStatisticAmount) => {
        respLabels.push(item.label);
        respData.push(item.amount);
      });
      setLabels(respLabels);
      setDataAmount(respData);
    });
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Thống kê đơn hàng theo số lượng",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: dataAmount,
      },
    ],
  };

  return (
    <>
      <div>
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
