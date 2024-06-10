import styles from './Bids.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export function Bids() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://54.232.172.200:5004/list')
      .then((response) => {
        setData(response.data.res.slice(0, 3)); // limita para os 5 primeiros
      })
      .catch((error) => {
        console.error('Houve um erro ao buscar os dados:', error);
      });
  }, []);

  return (
    <aside className={styles.bid}>
      <h2>Dados da API</h2>
      <ul className={styles.list}>
        {data.map((item) => (
          <li key={item.ID}>
            <p>ID: {item.ID}</p>
            <p>Exercício: {item.EXERCICIO}</p>
            <p>Número do Processo: {item.NUMERO_PROCESSO}</p>
            <p>Número do Instrumento: {item.NUMERO_INSTRUMENTO}</p>
            <p>
              Data de Abertura: {new Date(item.DATA_ABERTURA).toLocaleString()}
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
    </aside>
  );
}
