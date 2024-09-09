import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useRef } from "react";

interface UserMacroStats {
  protein: number;
  fat: number;
  carbs: number;
  tdde: number;
  goal: number;
}

interface DoughnutChartProps {
  doughnutOptions: any;
  setDoughnutOptions: (options: any) => void;
  userMacros: UserMacroStats;
}

const DoughnutChart = ({
  doughnutOptions,
  setDoughnutOptions,
  userMacros,
}: DoughnutChartProps) => {
  const chartRef = useRef<ChartJS<"doughnut", number[], unknown> | null>(null);
  const handleResize = () => {
    const isScreenSmall = window.innerWidth < 900;
    const newOptions = {
      plugins: {
        layout: {
          padding: 0, // Removes the padding
        },
        scales: {
          x: {
            display: false, // Remove this if you want the x-axis labels
          },
          y: {
            display: false, // Remove this if you want the y-axis labels
          },
        },
        legend: {
          position: isScreenSmall ? "bottom" : "left",
        },
      },
    };

    setDoughnutOptions(newOptions);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.config.plugins) {
        chartRef.current.config.plugins[0].afterDraw = textInHole;
        chartRef.current.update();
      }
    }
  }, [userMacros]);

  ChartJS.register(ArcElement, Tooltip, Legend);

  const macroGoals = userMacros.goal;

  const macros = {
    protein: parseFloat((userMacros.protein * (macroGoals / 4)).toFixed(2)),
    fats: parseFloat((userMacros.fat * (macroGoals / 9)).toFixed(2)),
    carbs: parseFloat((userMacros.carbs * (macroGoals / 4)).toFixed(2)),
  };

  const data = {
    labels: [
      `Protein: ${macros.protein}g`,
      `Fat: ${macros.fats}g`,
      `Carbohydrate: ${macros.carbs}g`,
    ],
    datasets: [
      {
        data: [macros.protein, macros.fats, macros.carbs],
        backgroundColor: [
          "rgba(94, 137, 255, 0.5)",
          "rgba(255, 177, 43, 0.5)",
          "rgba(245, 225, 76, 0.5)",
        ],
        borderColor: [
          "rgba(94, 137, 255, 1)",
          "rgba(255, 177, 43, 1)",
          "rgba(245, 225, 76, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const textInHole = (chart: ChartJS<"doughnut", number[], unknown>) => {
    const { ctx, chartArea } = chart;
    const centerX = (chartArea.left + chartArea.right) / 2;
    const centerY = (chartArea.top + chartArea.bottom) / 2;

    const text = `${macroGoals.toFixed(2)}`;

    const fontSize = (chart.height / 200).toFixed(2);

    ctx.restore();
    ctx.font = `${fontSize}em Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(text, centerX, centerY);

    ctx.save();

    ctx.restore();

    ctx.font = `${parseFloat(fontSize) / 2}em Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText("kcal/day", centerX, centerY + 30);

    ctx.save();
  };

  const plugin = {
    id: "TextInHolePlugin",
    afterDraw: textInHole,
  };

  return (
    <div
      className="d-flex"
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="d-lg-flex"
        style={{
          width:
            window.innerWidth < window.innerHeight
              ? window.innerWidth
              : window.innerHeight,
          height:
            window.innerWidth < window.innerHeight
              ? window.innerWidth
              : window.innerHeight,
          maxWidth: "625px",
          maxHeight: "625px",
          marginRight: "1em",
          marginLeft: "1em",
        }}
      >
        <Doughnut
          ref={chartRef}
          data={data}
          options={doughnutOptions}
          plugins={[plugin]}
        ></Doughnut>
      </div>
    </div>
  );
};

export default DoughnutChart;
