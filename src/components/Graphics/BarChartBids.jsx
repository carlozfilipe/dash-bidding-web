import { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export function BarChartBids() {
  const [, setDataApi] = useState([]);
  const [yearlySums, setYearlySums] = useState([]);

  /* Busca na API */
  useEffect(() => {
    axios
      .get('http://54.232.172.200:5004/list')
      .then((response) => {
        setDataApi(response.data.res);
        calculateYearlySums(response.data.res);
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados:', error);
      });
  }, []);

  // Calcula a soma total de cada ano
  const calculateYearlySums = (data) => {
    const totalSumByYear = data.reduce((acc, bid) => {
      const year = new Date(bid.DATA_ABERTURA).getFullYear();
      if (!acc[year]) {
        acc[year] = 0;
      }
      acc[year] += bid.VALOR_TOTAL_DESPESA;
      console.log('ACC anual das depesas', acc);
      return acc;
    }, {});

    const formattedSums = Object.keys(totalSumByYear)
      .filter((year) => !isNaN(year) && totalSumByYear[year] !== 0)
      .map((year) => ({
        year: parseInt(year, 10),
        total: totalSumByYear[year],
      }));

    setYearlySums(formattedSums);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const formatYAxis = (value) => {
    return `${(value / 1e6).toFixed(1)}M`;
  };

  return (
    <div>
      <h2>Despesas Totais por Ano</h2>
      <BarChart
        width={600}
        height={400}
        data={yearlySums}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis tickFormatter={formatYAxis} />
        <Tooltip formatter={(value) => formatCurrency(value)} />
        <Legend />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </div>
  );
}
