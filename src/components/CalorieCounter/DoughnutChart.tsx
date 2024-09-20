// Import STL
import { useEffect, useRef } from "react";

// Import Chart.js
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

interface UserMacroStats {
  protein: number;
  fat: number;
  carbs: number;
  tdde: number;
  goal: number;
}

interface DoughnutChartProps {
  doughnutOptions: any; // Doughnut chart configuration options
  setDoughnutOptions: (options: any) => void; // Function to update the chart options
  userMacros: UserMacroStats; // The user's macronutrient stats
}

/**
 * @component
 * This component renders a doughnut chart using the `react-chartjs-2` library and displays macronutrient distribution
 * based on user goals (protein, fats, carbs). The chart dynamically adjusts to window size and updates when the user
 * macros change. It also includes a custom plugin that displays the total daily calorie goal in the center of the chart.
 *
 * Dependencies:
 * - Chart.js and react-chartjs-2 for rendering the doughnut chart.
 *
 * Props:
 * @param {any} doughnutOptions - The configuration options for the Doughnut chart (Chart.js).
 * @param {function} setDoughnutOptions - A function to update the doughnut chart options dynamically.
 * @param {UserMacroStats} userMacros - An object containing the user's macronutrient stats and goals (protein, fats, carbs, tdde, goal).
 */
const DoughnutChart = ({
  doughnutOptions,
  setDoughnutOptions,
  userMacros,
}: DoughnutChartProps) => {
  // Element Refs
  // Reference to the Chart.js instance
  const chartRef = useRef<ChartJS<"doughnut", number[], unknown> | null>(null);

  // Effects
  /**
   * Function to handle window resizing and adjust chart options based on screen size.
   * It changes the legend position and padding depending on the window width.
   */
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

  // Effect to add/remove resize event listener
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Effect to update the chart when the user macros change
  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.config.plugins) {
        chartRef.current.config.plugins[0].afterDraw = textInHole;
        chartRef.current.update();
      }
    }
  }, [userMacros]);

  ChartJS.register(ArcElement, Tooltip, Legend);

  // Calculate the macronutrient distribution based on user's calorie goal
  const macroGoals = userMacros.goal;
  const macros = {
    protein: parseFloat((userMacros.protein * (macroGoals / 4)).toFixed(2)),
    fats: parseFloat((userMacros.fat * (macroGoals / 9)).toFixed(2)),
    carbs: parseFloat((userMacros.carbs * (macroGoals / 4)).toFixed(2)),
  };

  // Data for the Doughnut chart
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

  /**
   * Custom function to draw the user's daily calorie goal in the center of the doughnut chart.
   * @param {ChartJS} chart - The Chart.js instance.
   */
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
