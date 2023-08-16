'use client';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import radarBackground from './radarBackground';
export default function Home() {
  const data = {
    labels: [
      '1. Tolerância',
      '2. Planejamento',
      '3. Empatia',
      '4. Capacidade de ouvir',
      '5. Concentração',
      '6. Condescendência',
      '7. Perfil Técnico',
      '8. Organização',
      '9. Detalhismo',
      '10. Rigorosidade',
      '11. Orientado por resultados',
      'Multitarefas 12',
      'Automotivação 13',
      'Proatividade 14',
      'Dinamismo 15',
      'Dominância 16',
      'Extroversão 17',
      'Relacionamento interpessoal 18',
      'Sociabilidade 19',
      'Orientado por relacionamento 20',
    ],
    datasets: [
      {
        label: 'Dados de exibição',
        data: [
          3, 7, 22, 16, 32, 16, 9, 15, 33, 44, 45, 46, 52, 54, 56, 58, 60, 36,
          22, 26,
        ],
        fill: true,
        backgroundColor: 'rgba(94, 0, 90, 0.3)',
        borderColor: '#6B3077',
        tension: 0.1,
      },
    ],
  };
  const options = {
    scales: {
      r: {
        grid: {
          circular: true,
          color: '#fff',
          lineWidth: 2,
        },
        angleLines: {
          color: '#fff',
          lineWidth: 2,
        },
        ticks: {
          display: false,
          stepSize: 25,
        },
        pointLabels: {
          color: '#601E82',
          font: {
            size: 12,
            style: 'normal' as const,
            weight: 'bold',
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
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
    Legend,
    ArcElement
  );
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Radar data={data} options={options} plugins={[radarBackground]} />
    </div>
  );
}
