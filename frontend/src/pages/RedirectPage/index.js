import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from '../../components/Header';
import { RedirectContainer } from './styles';
import shortenerService from '../../services/shortenerService';

function RedirectPage(props) {
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function getLinkURL() {
      try {
        const { url } = await shortenerService.getLink(props.match.params.code);
        window.location = url;
      } catch (_) {
        setErrorMessage('Ops, A URL solicitada não existe.');
      }
    }
    getLinkURL();
  }, [props.match.params.code]);

  return (
    <Container>
      {errorMessage ? (
        <>
          <Header>Seu novo encurtador de URLs. :)</Header>
          <RedirectContainer className="text-center">
            <FontAwesomeIcon
              size="3x"
              color="#f8d7da"
              icon="faExclamationTriangle"
            />
            <p className="m-3">{errorMessage}</p>
            <a className="btn btn-primary" href="/">
              Encutar nova URL
            </a>
          </RedirectContainer>
        </>
      ) : (
        <p className="text-center">Redirecionando...</p>
      )}
    </Container>
  );
}

export default RedirectPage;
