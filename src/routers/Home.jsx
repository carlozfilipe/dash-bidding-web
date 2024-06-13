import styles from './Home.module.css';
import './../global.css';

export function Home() {
  return (
    <>
      <div className={styles.wrapper}>
        <h1>Seletivo para desenvolvedor frontend</h1>
        <h2>Workcenter 2024</h2>
        <main>
          <p>
            O primeiro desafio, o designer será avaliado, consiste em
            desenvolver usando o React uma dashboard com os dados listados no
            endpoint (link), cada item desse JSON será chamado de licitação. Os
            gráficos devem apresentar e seguir os requisitos abaixo: O usuário
            deve conseguir filtrar os dados por data, para que apenas os dados
            que passem no filtro sejam mostrados. Formatar a data para o
            DD/MM/AAAA. Elabore gráficos que mostrem as seguintes informações:
            Soma de todos os valores ou soma de todos os valores em um ano X.
            Por exemplo: Total ou média dos valores das licitações nos últimos
            anos. Quantidade de resultados de um certo status em um ano X. Por
            exemplo: No ano de 2023 tiveram 15 licitações com o status “EM
            AVISO”. Quantidade de licitações por unidade. Entrega e
            apresentação: Marcaremos a reunião remotamente na segunda-feira ou
            terça-feira. O desafio deve ser entregue até as 9h da segunda-feira
            (10/06/2024). O candidato deve colocar o código no seu GitHub. O
            candidato deve fazer um vídeo explicando apenas o primeiro desafio.
            Deve explicar os gráficos e como foi feito. Vídeo de no máximo 7
            minutos. Não precisa mostrar o rosto apenas a tela do computador e o
            áudio de sua voz. O vídeo pode ser colocado no YouTube ou Google
            Drive. O link do GitHub e do vídeo deve ser encaminhado para o
            WhatsApp do João Caires, no privado. O candidato está livre para
            adicionar mais respostas para cada requisito acima. O candidato está
            livre para criar gráficos que não estejam nos requisitos, mas o
            mesmo deve ser explicado. O candidato será avaliado segundo a sua
            criatividade, sendo assim não fiquem presos aos exemplos.
          </p>
        </main>
      </div>
    </>
  );
}
