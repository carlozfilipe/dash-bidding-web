import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './BidsByDate.module.css';

export function BidsByDate() {
  /* ESTADOS */
  const [dataApi, setDataApi] = useState([]);
  const [dataFilteredByDate, setDataFilteredByDate] = useState([]);
  const [initialDate, setInitialDate] = useState('');
  const [finalDate, setFinalDate] = useState('');

  /* Busca na API */
  useEffect(() => {
    axios
      .get('http://54.232.172.200:5004/list')
      .then((response) => {
        setDataApi(response.data.res);
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados:', error);
      });
  }, []);

  /* Função que formata a data passada pelo usuário */
  function formatDate(dataString) {
    const [day, monthy, year] = dataString.split('/');
    return new Date(`${year}-${monthy}-${day}`);
  }

  /* Função de realizar o filtro pela data */
  const handleFilterByDate = () => {
    const formattedInitialDate = formatDate(initialDate);
    const formattedFinalDate = formatDate(finalDate);

    const finalFilteredDate = dataApi.filter((bid) => {
      const dataOpen = new Date(bid.DATA_ABERTURA);
      return dataOpen >= formattedInitialDate && dataOpen <= formattedFinalDate;
    });

    setDataFilteredByDate(finalFilteredDate);
  };

  /* Funções onChange */
  function handleChangeInitialDate(event) {
    setInitialDate(event.target.value);
  }

  function handleChangeFinalDate(event) {
    setFinalDate(event.target.value);
  }

  return (
    <div className={styles.bidContainer}>
      <h1>Licitações por data</h1>

      <div className={styles.filters}>
        <label htmlFor="initialDate">Data Inicial (DD/MM/AAAA):</label>
        <input
          type="text"
          id="initialDate"
          placeholder="DD/MM/AAAA"
          onChange={handleChangeInitialDate}
        />

        <label htmlFor="finalDate">Data Final (DD/MM/AAAA):</label>
        <input
          type="text"
          id="finalDate"
          placeholder="DD/MM/AAAA"
          onChange={handleChangeFinalDate}
        />

        <button onClick={handleFilterByDate}>Filtrar</button>
      </div>

      {dataFilteredByDate.length >= 0 ? (
        <>
          <div>
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
                {dataFilteredByDate.map((item) => (
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
                    <td className={styles.currency}>
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
        </>
      ) : (
        <p>Nenhum resultado encontrado para a data selecionada.</p>
      )}
    </div>
  );
}
