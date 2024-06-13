import { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export function PieChartBids() {
  const [data, setData] = useState([]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6492', '#AB8FE2'];

  /* Busca na API */
useEffect(() => {
  axios
    .get('http://54.232.172.200:5004/list')
    .then((response) => {
      const chartData = transformData(response.data.res);
      setData(chartData);
    })
    .catch((error) => {
      console.error('Erro ao buscar os dados:', error);
    });
}, []);


// Função para transformar os dados da API no formato necessário
const transformData = (data) => {
  const statusCount = data.reduce((acc, bid) => {
    const status = bid.EXERCICIO;
    acc[status] = (acc[status] || 0) + 1; /* Se acc[status] já existe, incrementa seu valor em 1. Se não existe, inicializa com 0 e então adiciona 1. */
    return acc;
  }, {});

  return Object.keys(statusCount).map(status => ({
    name: status,
    value: statusCount[status]
  }));
};

// Função para renderizar os rótulos dos gráficos
const renderLabel = ({ percent, value }) => `${value} (${(percent * 100).toFixed(0)}%)`;

  return (
    <div>
      <h2>Distribuição Anual das Licitações por Exercício</h2>
      <PieChart width={600} height={400}>
        <Pie
          data={data}
          labelLine={false}
          label={renderLabel}
          outerRadius={140}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
