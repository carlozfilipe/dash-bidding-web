import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './BidsByNumbers.module.css';

export function BidsByNumbers() {
  const [dataApi, setDataApi] = useState([]);
  const [dataFilteredByNumbers, setdataFilteredByNumbers] = useState([]);

  useEffect(() => {
    axios
      .get('http://54.232.172.200:5004/list')
      .then((response) => {
        setDataApi(response.data.res);
        setdataFilteredByNumbers(response.data.res);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da API:', error);
      });
  }, []);

  function handleFilterByNumbers (event) {
    const term = event.target.value;
    const filtered = dataApi.filter((item) => item.NUMERO_PROCESSO.includes(term));
    setdataFilteredByNumbers(filtered);
  }

  return (
    <div className={styles.bidContainer}>
      <h1>Licitações</h1>

      <div className={styles.filters}>
      <label htmlFor="filteredData">Digite o Nº do Processo:</label>
      <input
        type="text"
        id="filteredData"
        placeholder="Filtrar por número do processo"
        onChange={handleFilterByNumbers}
      />
      </div>

      
      <div />
      <table>
        <thead>
          <tr>
            <th>Exercício</th>
            <th>Nº Processo</th>
            <th>Nº do Instrumento</th>
            <th>Data da Abertura</th>
            <th>Unidade</th>
            <th>Modalidade</th>
            <th>Tipo de Licitação</th>
            <th>Tipo de Objeto</th>
            <th>Status</th>
            <th>Despesa Total</th>
            <th>Objeto</th>
            <th>Data do Envio</th>
          </tr>
        </thead>
        <tbody>
          {dataFilteredByNumbers.map((item) => (
            <tr key={item.ID}>
              <td>{item.EXERCICIO}</td>
              <td>{item.NUMERO_PROCESSO}</td>
              <td>{item.NUMERO_INSTRUMENTO}</td>
              <td>{new Date(item.DATA_ABERTURA).toLocaleDateString()}</td>
              <td>{item.UNIDADE_NOME}</td>
              <td>{item.MODALIDADE_NOME}</td>
              <td>{item.TIPO_LICITACAO_NOME}</td>
              <td>{item.TIPO_OBJETO_NOME}</td>
              <td>{item.STATUS_LICITACAO_NOME}</td>
              <td>
                {item.VALOR_TOTAL_DESPESA.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </td>
              <td>{item.OBJETO}</td>
              <td>{new Date(item.DATA_ENVIO).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
