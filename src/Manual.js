import React from "react";

import {
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Typography,
} from "@mui/material";

import { ExpandMore } from "@mui/icons-material";

function Manual() {
  return (
    <>
      <Typography
        variant="h5"
        component="div"
        gutterBottom
        sx={{ textAlign: "center" }}
      >
        <strong>Manual do Bazar BGB</strong>
      </Typography>

      <Grid container spacing={2} sx={{ width: "85%", mt: 1, mb: 3 }}>
        <Typography
          variant="subtitle1"
          gutterBottom
          component="div"
          align="justify"
        >
          O Gerador de Anúncios é uma ferramenta para a padronização e envio dos
          anúncios ao canal do Bazar BGB. Nesta seção, iremos elaborar sobre o
          funcionamento deste site e as boas práticas de uso.
        </Typography>
      </Grid>

      <Grid container spacing={2} sx={{ width: "85%", mt: 1, mb: 5 }}>
        <Accordion id="ad">
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="diff-content"
            id="diff-header"
          >
            <Typography variant="h6" component="div" gutterBottom>
              Como gero um anúncio?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              align="justify"
            >
              Antes de tudo,{" "}
              <a href="https://telegram.org/faq?setln=pt-br#p-o-que-sao-nomes-de-usuario-como-obtenho-um">
                crie um nome de usuário
              </a>{" "}
              no Telegram, caso ainda não possua um, e então realize o login.
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              align="justify"
            >
              Agora, selecione o tipo correto de mensagem que você deseja
              enviar, preencha as informações referentes à cidade e ao estado
              onde o jogo está localizado, cadastre o jogo na lista de anúncio,
              verifique se está tudo certo e clique em enviar.
            </Typography>
            <Alert variant="outlined" severity="warning" sx={{ mt: 2, mb: 2 }}>
              Ao preencher os campos de cidade e jogo, selecione uma das opções
              da lista de sugestões!
            </Alert>
            <Alert variant="outlined" severity="warning" sx={{ mt: 2, mb: 2 }}>
              Escolha o tipo correto de anúncio! Anúncio de leilão não é venda,
              é leilão externo ou interno. Anúncios cadastrados com o tipo
              errado serão removidos.
            </Alert>
            <Alert variant="outlined" severity="info">
              Certifique-se que seu anúncio está correto antes do envio. Você
              não poderá editá-lo e só estará liberado para enviar outro após 5
              dias.
            </Alert>
            <Alert variant="outlined" severity="info" sx={{ mt: 2 }}>
              Diferentes anúncios exigem diferentes tipos de informação.
              Anúncios que envolvam venda exigem o preço antes de serem
              cadastrados. O mesmo vale para leilões.
            </Alert>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mt: 2 }} id="diff">
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="diff-content"
            id="diff-header"
          >
            <Typography variant="h6" component="div" gutterBottom>
              Qual a diferença entre as opções "anúncio" e "leilão"?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              align="justify"
            >
              A opção "anúncio" compreende os anúncios padrões do Bazar de
              compra, venda, troca, procura e divulgação de leilão em plataforma
              externa. Use-a se o seu objetivo é uma dessas opções.
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              align="justify"
            >
              Se você quiser fazer um leilão interno no Bazar, usando as nossas
              regras e o nosso sistema, então você deve escolher a opção
              "leilão". Basta definir o lance inicial e o jogo a ser leiloado
              que os lances ocorrerão nos comentários de sua mensagem. Por
              padrão, o incremento é de +5 R$ caso você não tenha informado este
              campo.
            </Typography>
            <Alert variant="outlined" severity="warning" sx={{ mt: 2, mb: 2 }}>
              Não use a opção "leilão" para divulgar um leilão em uma plataforma
              externa, como a Ludopedia!
            </Alert>
            <Alert variant="outlined" severity="warning" sx={{ mt: 2, mb: 2 }}>
              No caso de um leilão externo, lembre-se de divulgar o link do
              leilão no campo de descrição geral do anúncio!
            </Alert>
            <Alert variant="outlined" severity="info">
              Não é possível enviar um anúncio e um leilão ao mesmo tempo.
              Apenas o conteúdo da opção onde você tiver escolhido enviar será
              considerado.
            </Alert>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mt: 2 }} id="changes">
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="changes-content"
            id="changes-header"
          >
            <Typography variant="h6" component="div" gutterBottom>
              Quais as mudanças desta versão em relação à anterior?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              align="justify"
            >
              A interface foi totalmente refeita para gerar uma melhor
              experiência de usuário. Agora, é possível visualizar o conteúdo do
              seu anúncio em tempo real enquanto ele é editado.
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              align="justify"
            >
              Os itens agora são cadastrados em uma lista que é atualizada
              automaticamente a cada inserção, o que eliminou a necessidade da
              criação de um novo formulário a cada item inserido.
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              align="justify"
            >
              Implementamos a possibilidade de importar os itens de um anúncio
              enviado anteriormente ao Bazar por meio de um ID vinculado ao
              conteúdo.
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              align="justify"
            >
              Erros são gerenciados de forma assíncrona, o que evita que os
              usuários percam o conteúdo de seus anúncios devido o preenchimento
              incorreto de algum campo.
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              align="justify"
            >
              Além disso, implementamos um sistema de notificação sempre que
              alguém comentar no seu anúncio.
            </Typography>
            <Alert variant="outlined" severity="info">
              Encontrou algum problema ou comportamento inesperado? Entre em
              contato com a administração.
            </Alert>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mt: 2 }} id="notifications">
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="notifications-content"
            id="notifications-header"
          >
            <Typography variant="h6" component="div" gutterBottom>
              É possível receber notificações quando comentam no meu anúncio?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              align="justify"
            >
              Todos os anúncios enviados utilizando esta versão do gerador
              estarão aptos a notificar o anunciante no caso de uma nova
              mensagem. Por questões de compatibilidade, não é possível
              implementar essa função retroativamente.
            </Typography>
            <Alert variant="outlined" severity="info">
              Para habilitar as notificações via o bot do Bazar BGB,
              certifique-se de habilitar essa permissão durante o login.
            </Alert>
            <Alert variant="outlined" severity="info" sx={{ mt: 2 }}>
              Caso não queira receber notificação, basta recusar essa permissão
              durante o login ou bloquear o bot do BGB diretamente no Telegram.
            </Alert>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mt: 2 }} id="missing">
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="missing-content"
            id="missing-header"
          >
            <Typography variant="h6" component="div" gutterBottom>
              Minha cidade ou meu jogo não aparece na lista de sugestões!
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              align="justify"
            >
              Certifique-se que o nome em questão foi digitado corretamente,
              incluindo os acentos.
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              align="justify"
            >
              Caso o nome esteja correto, utilize{" "}
              <a href="https://www.comparajogos.com.br/incluir-do-bgg">
                este formulário
              </a>{" "}
              para adicionar um novo jogo ou entre em contato com a
              administração caso não encontre uma cidade na lista.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mt: 2 }} id="images">
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="images-content"
            id="images-header"
          >
            <Typography variant="h6" component="div" gutterBottom>
              Como adiciono imagens ao meu anúncio?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              align="justify"
            >
              Você pode enviar fotos diretamente nos comentários de sua mensagem
              no Bazar, na ordem e disposição que preferir.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mt: 2 }} id="import">
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="import-content"
            id="import-header"
          >
            <Typography variant="h6" component="div" gutterBottom>
              Como posso importar os itens de outro anúncio?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              align="justify"
            >
              Para evitar o preenchimento repetitivo de itens, agora é possível
              importar os itens de outro anúncio.
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              align="justify"
            >
              Todo anúncio agora possui um ID de 8 dígitos no formato ____.____
              no final de cada mensagem publicada no Bazar. Basta selecionar
              esse número, ir até a lista de itens após realizar o login,
              apertar "Importar Itens" e informar o ID.
            </Typography>

            <Alert variant="outlined" severity="info">
              Esta opção só está disponível caso nenhum item tenha sido
              cadastrado no anúncio atual. Este mecanismo serve para evitar que
              a importação sobrescreva algum item que você tenha cadastrado.
            </Alert>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mt: 2 }} id="limit">
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="limit-content"
            id="limit-header"
          >
            <Typography variant="h6" component="div" gutterBottom>
              Qual o limite de itens por anúncio?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              align="justify"
            >
              Existe uma limitação técnica no Telegram que impede o envio de uma
              mensagem com mais de 4.096 caracteres. Por isso, não é possível
              delimitar a quantidade máxima pois isso depende do total de
              caracteres presentes no anúncio como um todo. O Bazar se reserva a
              utilização de 296 caracteres para formatação do anúncio, fixando o
              limite em 3.800 caracteres.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mt: 2 }} id="login-problems">
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="login-problems-content"
            id="login-problems-header"
          >
            <Typography variant="h6" component="div" gutterBottom>
              Estou com problemas para realizar o login pelo Telegram!
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              align="justify"
            >
              Primeiro, certifique-se que o Telegram está atualizado em seu
              aparelho, você possui um nome de usuário válido e não está
              impedido por tempo de postagem.
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              align="justify"
            >
              Sendo este o caso, tente realizar o login em um navegador externo
              ao do Telegram, copiando e colando o link em seu navegador de
              preferência.
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              align="justify"
            >
              Se os problemas persistirem, tente realizar o login utilizando
              outro aparelho, desktop ou notebook.
            </Typography>
            <Alert variant="outlined" severity="info">
              O erro "bot domain invalid!" tem sido observado em usuários do
              Firefox. Portanto, tente utilizar outro navegador.
            </Alert>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mt: 2 }} id="privacy">
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="privacy-content"
            id="privacy-header"
          >
            <Typography variant="h6" component="div" gutterBottom>
              Quais informações do login são utilizadas por este site?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              align="justify"
            >
              Apenas o seu nome e seu ID de usuário para finalidades de controle
              de mensagens. Nenhuma informação privada, como número de telefone
              ou conversas, é possível de ser acessada por meio do login pelo
              Telegram, seja por este site, seja por outros usuários.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mt: 2 }} id="feedback">
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="feedback-content"
            id="feedback-header"
          >
            <Typography variant="h6" component="div" gutterBottom>
              Eu tenho uma sugestão, reclamação ou dúvida não respondida nesta
              página!
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              align="justify"
            >
              Entre em contato com a administração do BGB. Sugestões e críticas
              construtivas são sempre bem-vindas!
            </Typography>
            <Alert variant="outlined" severity="info">
              Todas as sugestões serão avaliadas pela administração quanto à
              utilidade e possibilidade de implementação.
            </Alert>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </>
  );
}

export default Manual;
