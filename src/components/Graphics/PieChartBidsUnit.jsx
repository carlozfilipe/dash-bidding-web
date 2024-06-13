import { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

export function PieChartBidsUnit() {
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
        console.error('Houve um erro ao buscar os dados:', error);
      });
  }, []);
  
  // Função para transformar os dados da API no formato necessário
  const transformData = (data) => {
    const statusCount = data.reduce((acc, bid) => {
      const status = bid.UNIDADE_NOME;
      acc[status] = (acc[status] || 0) + 1; /* Se acc[status] já existe, incrementa seu valor em 1. Se não existe, inicializa com 0 e então adiciona 1. */
      // console.log('ACC do Unit aqui', acc)
      return acc;
    }, {});
  
    return Object.keys(statusCount).map(status => ({
      name: status,
      value: statusCount[status]
    }));
  };
  
  // Função para renderizar os rótulos dos gráficos
  function renderLabel ({ percent, value }) {
    return `${value} (${(percent * 100).toFixed(0)}%)`;
  }

  return (
    <div>
      <h2>Distribuição Anual das Licitações por Unidade</h2>
      <PieChart width={600} height={400}>
        <Pie
          data={data}
          labelLine={false}
          label={renderLabel}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
          paddingAngle={10}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
