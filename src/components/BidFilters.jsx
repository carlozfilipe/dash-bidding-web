import styles from './BidFilters.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export function BidFilters() {
  const [data, setData] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [dataStart, setDataStart] = useState('');
  const [dataEnd, setDataEnd] = useState('');

  useEffect(() => {
    axios
      .get('http://54.232.172.200:5004/list')
      .then((response) => {
        setData(response.data.res);
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados:', error);
      });
  }, []);

  function formatData(dataString) {
    const [day, monthy, year] = dataString.split('/');
    return new Date(`${year}-${monthy}-${day}`);
  }

  const handleFilter = () => {
    const dataStartFormatted = formatData(dataStart);
    const dataEndFormatted = formatData(dataEnd);

    const returnFilteredData = data.filter((item) => {
      const dataOpen = new Date(item.DATA_ABERTURA);
      return dataOpen >= dataStartFormatted && dataOpen <= dataEndFormatted;
    });

    setDataFiltered(returnFilteredData);
  };

  return (
    <aside className={styles.bid}>
      <h2>Dados por data</h2>

      <div className={styles.filters}>
        <label htmlFor="dataStart">Data Inicial (dd/mm/aaaa):</label>
        <input
          type="text"
          id="dataStart"
          value={dataStart}
          placeholder="DD/MM/AAAA"
          onChange={(e) => setDataStart(e.target.value)}
        />

        <label htmlFor="dataEnd">Data Final (dd/mm/aaaa):</label>
        <input
          type="text"
          id="dataEnd"
          value={dataEnd}
          placeholder="DD/MM/AAAA"
          onChange={(e) => setDataEnd(e.target.value)}
        />

        <button onClick={handleFilter}>Filtrar</button>
      </div>

      {dataFiltered.length >= 0 ? (
        <ul>
          {dataFiltered.map((item) => (
            <li key={item.ID}>
              <p>ID: {item.ID}</p>
              <p>Exercício: {item.EXERCICIO}</p>
              <p>Número do Processo: {item.NUMERO_PROCESSO}</p>
              <p>Número do Instrumento: {item.NUMERO_INSTRUMENTO}</p>
              <p>
                Data de Abertura:{' '}
                {new Date(item.DATA_ABERTURA).toLocaleString()}
              </p>
              <p>
                Data de Publicação:{' '}
                {new Date(item.DATA_PUBLICACAO).toLocaleString()}
              </p>
              <p>Unidade: {item.UNIDADE_NOME}</p>
              <p>Modalidade: {item.MODALIDADE_NOME}</p>
              <p>Tipo de Licitação: {item.TIPO_LICITACAO_NOME}</p>
              <p>Tipo de Objeto: {item.TIPO_OBJETO_NOME}</p>
              <p>Status: {item.STATUS_LICITACAO_NOME}</p>
              <p>
                Valor Total da Despesa:{' '}
                {item.VALOR_TOTAL_DESPESA.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>
              <p>Objeto: {item.OBJETO}</p>
              <p>Data de Envio: {new Date(item.DATA_ENVIO).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum resultado encontrado para a data selecionada.</p>
      )}
    </aside>
  );
}
