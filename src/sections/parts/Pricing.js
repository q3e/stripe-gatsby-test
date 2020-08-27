import React, { useState } from 'react'
import styled from 'styled-components'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { rgba } from 'polished'
import { loadStripe } from '@stripe/stripe-js'

import {
  Title,
  Section,
  Box,
  Text,
  Badge,
  Button,
  Switch,
} from '../../components/Core'
import { device } from '../../utils'

const SectionStyled = styled(Section)`
  position: relative;
  &::after {
    content: '';
    left: 0;
    bottom: 0;
    height: 30%;
    width: 100%;
    position: absolute;
    background: ${({ theme }) => theme.colors.dark}!important;
  }
`

const ULStyled = styled.ul`
  list-style: none;
  max-width: 350px;
  margin: 30px auto 0;
  padding-left: 0;

  @media ${device.sm} {
    display: flex;
    flex-wrap: wrap;
  }
  @media ${device.lg} {
    justify-content: space-between;
  }

  li {
    color: #19191b;
    font-size: 21px;
    font-weight: 300;
    letter-spacing: -0.66px;
    line-height: 50px;
    display: flex;
    margin-bottom: 5px;

    &:before {
      content: '\f00c';
      font-family: 'Font Awesome 5 Free';
      font-weight: 900;
      display: inline-block;
      font-size: 13px;
      width: 30px;
      height: 30px;
      background-color: ${({ theme }) => rgba(theme.colors.secondary, 0.1)};
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 500px;
      color: ${({ theme }) => theme.colors.secondary};
      position: relative;
      top: 9px;
      margin-right: 13px;
    }
  }
`

const CardPricing = styled(Box)`
  box-shadow: ${({ theme }) =>
    `0 52px 54px ${rgba(theme.colors.shadow, 0.125)}`};
  border-radius: 10px;
  background-color: #fff;
  padding-top: 30px;

  button {
    width: 100% !important;
    border-radius: 0 0 10px 10px !important;
  }
`

const TitleSmall = styled.h4`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 16px;
  font-weight: 300;
  letter-spacing: -0.5px;
  line-height: 28px;
`

const Currency = styled.span`
  color: ${({ theme }) => theme.colors.dark};
  font-size: 30px;
  font-weight: 300;
  letter-spacing: -0.52px;
  line-height: 1;
  margin-bottom: 5px;
`

const TimePer = styled.span`
  color: ${({ theme }) => theme.colors.dark};
  font-size: 30px;
  font-weight: 300;
  letter-spacing: -0.52px;
  line-height: 1;
  margin-bottom: 5px;
`

let stripePromise
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)
  }
  return stripePromise
}

const Pricing = () => {
  const [timeMonthly, setTimeMonthly] = useState(false)
  const [loading, setLoading] = useState(false)

  const redirectToCheckout = (pricingTier) => async (event) => {
    console.log(pricingTier)
    event.preventDefault()
    setLoading(true)

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      mode: 'subscription',
      lineItems: [{ price: pricingTier, quantity: 1 }],
      successUrl: `${window.location.origin}/payment-success/`,
      cancelUrl: `${window.location.origin}/payment-cancel`,
    })

    if (error) {
      console.warn('Error:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: '100vh' }}
      >
        <Spinner
          style={{ height: '6rem', width: '6rem' }}
          size="lg"
          animation="border"
        />
      </div>
    )
  }

  return (
    <>
      {/* <!-- Pricing section --> */}
      <SectionStyled bg="#F7F7FB" pt="90px !important" pb="0 !important">
        <Container
          className="position-relative"
          css={`
            z-index: 1;
          `}
        >
          <Row className="justify-content-center">
            <Col md="8" lg="9">
              <div className=" text-center">
                <Title>Pricing &amp; Plans</Title>
                <Text>
                  Create custom landing pages with Omega that converts{' '}
                  <br className="d-none d-md-block" /> more visitors than any
                  website.
                </Text>
              </div>
            </Col>
          </Row>
          <div className="text-center pt-5">
            <div className="d-inline-flex justify-content-between align-items-center mb-5">
              <Text>Monthly</Text>

              <Switch onClick={() => setTimeMonthly(!timeMonthly)} />
              <div className="d-flex align-items-center">
                <Text>Yearly</Text>
                <Badge ml={2}>Save 25%</Badge>
              </div>
            </div>

            <Row>
              <Col lg="6" className="mb-5">
                <CardPricing>
                  <div className="mb-4">
                    <TitleSmall>Starter</TitleSmall>
                    <div className="d-flex align-items-end justify-content-center my-3">
                      <Currency>$</Currency>
                      <Title
                        css={`
                          font-size: 80px;
                          letter-spacing: -1.38px;
                          margin-bottom: 0 !important;
                        `}
                      >
                        {timeMonthly ? 24 : 20}
                      </Title>
                      <TimePer>/mo</TimePer>
                    </div>
                    <Text fontSize="18px">Per site</Text>
                    <ULStyled>
                      <li>5 responsive landing pages</li>
                      <li>50+ HTML UI elements</li>
                      <li>Unlimited domains</li>
                      <li>6 months premium support</li>
                      <li>Lifetime updates</li>
                    </ULStyled>
                  </div>
                  <Button
                    bg="secondary"
                    onClick={redirectToCheckout(
                      `${
                        timeMonthly
                          ? process.env.GATSBY_INDIVIDUAL_MONTHLY_PRICE_ID
                          : process.env.GATSBY_TEAM_MONTHLY_PRICE_ID
                      }`,
                    )}
                  >
                    Start 14 Days Free Trial
                  </Button>
                </CardPricing>
              </Col>
              <Col lg="6" className="mb-5">
                <CardPricing>
                  <div className="mb-4">
                    <TitleSmall>Team</TitleSmall>
                    <div className="d-flex align-items-end justify-content-center my-3">
                      <Currency>$</Currency>
                      <Title
                        css={`
                          font-size: 80px;
                          letter-spacing: -1.38px;
                          margin-bottom: 0 !important;
                        `}
                      >
                        {timeMonthly ? 60 : 50}
                      </Title>
                      <TimePer> /mo</TimePer>
                    </div>
                    <Text fontSize="18px">Per site</Text>
                    <ULStyled>
                      <li>5 responsive landing pages</li>
                      <li>50+ HTML UI elements</li>
                      <li>Unlimited domains</li>
                      <li>6 months premium support</li>
                      <li>Lifetime updates</li>
                    </ULStyled>
                  </div>
                  <Button
                    bg="secondary"
                    onClick={redirectToCheckout(
                      `${
                        timeMonthly
                          ? process.env.GATSBY_INDIVIDUAL_YEARLY_PRICE_ID
                          : process.env.GATSBY_TEAM_YEARLY_PRICE_ID
                      }`,
                    )}
                  >
                    Start 14 Days Free Trial
                  </Button>
                </CardPricing>
              </Col>
            </Row>
          </div>
        </Container>
      </SectionStyled>
    </>
  )
}

export default Pricing
