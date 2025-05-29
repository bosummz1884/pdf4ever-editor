// src/components/OfferWall.jsx

import React from 'react';
import styled from 'styled-components';

const WallContainer = styled.div`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 2rem auto;
`;

const OfferList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const OfferItem = styled.div`
  padding: 0.75rem 1rem;
  background: #fff6e5;
  border-left: 6px solid gold;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #fffbef;
  }
`;

const CreditBar = styled.div`
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
`;

export default function OfferWall({ credits, onComplete }) {
  const offers = [
    { id: 1, desc: 'Watch a 30s ad', reward: 1 },
    { id: 2, desc: 'Download app trial', reward: 2 },
    { id: 3, desc: 'Complete a short survey', reward: 3 }
  ];

  return (
    <WallContainer>
      <CreditBar>Free Edit Credits: {credits}</CreditBar>
      <OfferList>
        {offers.map((o) => (
          <OfferItem key={o.id} onClick={() => onComplete(o.reward)}>
            <span>{o.desc}</span>
            <strong>+{o.reward}</strong>
          </OfferItem>
        ))}
      </OfferList>
    </WallContainer>
  );
}
