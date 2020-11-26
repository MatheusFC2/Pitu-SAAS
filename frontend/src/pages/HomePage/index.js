import React from 'react';
import { useState } from 'react';
//prettier-ignore
import {Container, InputGroup, FormControl, Button, Spinner, Alert} from 'react-bootstrap';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from '../../components/Header';
import { ContentContainer, Form, AdsBlock } from './styles';
import shortenerService from '../../services/shortenerService';
import vars from '../../configs/vars';

function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [inputURL, setInputURL] = useState(null);

  const handleChange = ({ target }) => {
    setUrl(target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    if (!url) {
      setIsLoading(false);
      setErrorMessage('Informe uma URL para encurtar.');
      return;
    }
    try {
      const result = await shortenerService.postCreate({ url });
      setIsLoading(false);
      setCode(result.code);
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(`Ops, Ocorreu um erro ao tentar encurtar a URL: ${err}`);
    }
  };

  const handleClickCopy = () => {
    const element = inputURL;
    element.select();
    document.execCommand('copy');
  };

  return (
    <Container>
      <Header>Seu novo encurtador de URL. :)</Header>
      <ContentContainer>
        <Form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Digite a URL para encurtar"
              defaultValue=""
              onChange={handleChange}
            />
            <InputGroup.Append>
              <Button variant="primary" type="submit">
                Encurtar
              </Button>
            </InputGroup.Append>
          </InputGroup>
          {isLoading ? (
            <Spinner animation="border" />
          ) : (
            code && (
              <>
                <InputGroup className="mb-3">
                  <FormControl
                    autoFocus={true}
                    defaultValue={vars.HOST_APP + code}
                    ref={(input) => setInputURL(input)}
                  />
                  <InputGroup.Append>
                    <Button
                      variant="outline-secondary"
                      onClick={handleClickCopy}
                    >
                      Copiar
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
                <p>
                  Para acompanhar as estatísticas, acesse {vars.HOST_APP + code}
                </p>
              </>
            )
          )}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        </Form>
      </ContentContainer>
      <ContentContainer>
        <AdsBlock>Adense</AdsBlock>
      </ContentContainer>
    </Container>
  );
}

export default HomePage;
