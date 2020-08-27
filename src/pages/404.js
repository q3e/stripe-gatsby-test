import React from "react";
import { Link } from "gatsby";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import Section from "../components/Section";
import PageWrapper from "../components/PageWrapper";

import { Title, Text } from "../components/Core";

const ButtonStyled = styled.button`
  min-width: 250px;
  min-height: 60px;
  border-radius: 10px;
  border: ${({ theme }) => `1px solid ${theme.colors.primary}`};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 21px;
  font-weight: 500;
  letter-spacing: -0.66px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  box-shadow: none;
  outline: none;
  padding-left: 20px;
  padding-right: 20px;
  transition: 0.4s;
  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.light};
    box-shadow: none;
    outline: none;
  }
`;

const NotFoundPage = () => {
  return (
    <>
      <PageWrapper footerDark>
        <Section>
          <div className="pt-5"></div>
          <Container>
            <div className="text-center">
              <div>
                <Title variant="hero">404 Error!</Title>
                <Text>
                  The page you are looking for is not available or doesn’t
                  <br className="d-none d-md-block" /> belong to this website!
                </Text>
              </div>
              <div className="mt-5">
                <Link to="/">
                  <ButtonStyled>Go back to home</ButtonStyled>
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      </PageWrapper>
    </>
  );
};

export default NotFoundPage;
