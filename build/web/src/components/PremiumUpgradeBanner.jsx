import React from 'react';
import styled from 'styled-components';

const Banner = styled.div`
  background: linear-gradient(90deg, #f8d775, #f1a340);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  margin: 2rem auto;
  max-width: 600px;
  color: #000;
  font-weight: bold;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
`;

const Button = styled.button`
  background-color: #222;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  margin-top: 0.75rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #000;
  }
`;

export default function PremiumUpgradeBanner({ onUpgrade }) {
  return (
    <Banner>
      <p>You’re currently using the free version of PDF4EVER.</p>
      <p>Premium features like inline editing and font matching are available for a one-time license of <strong>$49.99</strong>.</p>
      <Button onClick={onUpgrade}>Unlock Premium</Button>
    </Banner>
  );
}
