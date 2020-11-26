import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { parseISO, formatRelative } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

//prettier-ignore
import { StatsContainer, StatsRow, StatsBox, StatsBoxTitle } from './styles';
import Header from '../../components/Header';
import shortenerService from '../../services/shortenerService';
import vars from '../../configs/vars';

function StatsPage(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [shortenedURL, setShortenedURL] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  // com Promises
  // useEffect(() => {
  //   setIsLoading(true);
  //   shortenerService
  //     .getLink(props.match.params.code)
  //     .then((response) => {
  //       setShortenedURL(response);
  //       setIsLoading(false);
  //     })
  //     .catch((_) => {
  //       setIsLoading(false);
  //       setErrorMessage('Ops, A URL solicitada não existe.');
  //     });
  // }, [props.match.params.code]);

  // com Async Await
  useEffect(() => {
    async function getShortenedURL() {
      try {
        setIsLoading(true);
        const shortenedURL = await shortenerService.getStats(
          props.match.params.code
        );
        const parsedDate = parseISO(shortenedURL.updatedAt);

        const currentDate = new Date();
        const relativeDate = formatRelative(parsedDate, currentDate, {
          locale: ptBR,
        });

        shortenedURL.relativeDate = relativeDate;

        setShortenedURL(shortenedURL);
        setIsLoading(false);
      } catch (_) {
        setIsLoading(false);
        setErrorMessage('Ops, A URL solicitada não existe.');
      }
    }
    getShortenedURL();
  }, [props.match.params.code]);

  return (
    <Container>
      <Header>Estatísticas:</Header>
      {errorMessage ? (
        <StatsContainer className="text-center">
          <FontAwesomeIcon
            size="3x"
            color="#f8d7da"
            icon="faExclamationTriangle"
          />
          <p className="m-3">{errorMessage}</p>
          <a className="btn btn-primary" href="/">
            Encutar nova URL
          </a>
        </StatsContainer>
      ) : (
        <StatsContainer className="text-center">
          {isLoading ? (
            <Spinner animation="border" />
          ) : (
            shortenedURL && (
              <>
                <p>
                  <b>{vars.HOST_APP+ shortenedURL.code}</b>
                </p>
                <p>
                  Redireciona para: <br />
                  {shortenedURL.url}
                </p>
                <StatsRow>
                  <StatsBox>
                    <b>{shortenedURL.hits}</b>
                    <StatsBoxTitle>Visitas</StatsBoxTitle>
                  </StatsBox>
                  <StatsBox>
                    <b>{shortenedURL.relativeDate}</b>
                    <StatsBoxTitle>Última visita</StatsBoxTitle>
                  </StatsBox>
                </StatsRow>
                <a className="btn btn-primary" href="/">
                  Encutar nova URL
                </a>
              </>
            )
          )}
        </StatsContainer>
      )}
    </Container>
  );
}

export default StatsPage;
