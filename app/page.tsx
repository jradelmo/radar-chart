"use client";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import radarBackground from "./radarBackground";
export default function Home() {
  function createMultiColorBackground(context) {
    const chartArea = context.chart.chartArea;
    if (!chartArea) {
      return;
    }
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;

    width = chartWidth;
    height = chartHeight;
    const centerX = (chartArea.left + chartArea.right) / 2;
    const centerY = (chartArea.top + chartArea.bottom) / 2;

    const ctx = context.chart.ctx;

    var gradient = ctx.createConicGradient(-1.0472, centerX, centerY);

    // The pattern is 30 degrees of blend between quadrants
    // 60 degrees of pure color in the quadrant
    gradient.addColorStop(0, "rgba(78, 190, 235, .40)"); //blue
    gradient.addColorStop(0.25, "rgba(78, 190, 235, .40)"); //blue
    gradient.addColorStop(0.5, "rgba(255, 152, 49, .40)"); //orange
    gradient.addColorStop(0.75, "rgba(255, 152, 49, .40)"); //orange

    // Set the fill style and draw a rectangle
    ctx.fillStyle = gradient;
    ctx.fillRect(chartArea.left, chartArea.top, chartWidth, chartHeight);

    return gradient;
  }
  const data = {
    labels: [
      "1. Tolerância",
      "2. Planejamento",
      "3. Empatia",
      "4. Capacidade de ouvir",
      "5. Concentração",
      "6. Condescendência",
      "7. Perfil Técnico",
      "8. Organização",
      "9. Detalhismo",
      "10. Rigorosidade",
      "11. Orientado por resultados",
      "Multitarefas 12",
      "Automotivação 13",
      "Proatividade 14",
      "Dinamismo 15",
      "Dominância 16",
      "Extroversão 17",
      "Sociabilidade 19",
      "Orientado por relacionamento 20",
    ],
    datasets: [
      {
        label: "Dados de exibição",
        data: [
          65, 59, 72, 81, 56, 55, 40, 15, 22, 44, 26, 7, 66, 52, 44, 12, 6, 36,
          22, 66,
        ],
        fill: true,
        backgroundColor: "rgba(214, 28, 237, 0.3)",
        borderColor: "#6B3077",
        pointBackgroundColor: "#6B3077",
        pointBorderColor: "#5bc440",
        pointHoverBackgroundColor: "#5bc440",
        pointHoverBorderColor: "#6B3077",
      },
    ],
  };
  const options = {
    scales: {
      r: {
        grid: {
          circular: true,
        },
        ticks: {
          display: false,
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
      line: {
        borderWidth: 3,
      },
    },
  };
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );
  return (
    <div className="w-screen h-screen">
      <Radar data={data} options={options} plugins={[radarBackground]} />
    </div>
  );
}
