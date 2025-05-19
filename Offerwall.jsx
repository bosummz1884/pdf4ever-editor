import React from 'react';

export default function Offerwall({ onEarn }) {
  const handleClick = () => {
    // TODO: Integrate real offerwall SDK
    alert('Offerwall would appear here');
    onEarn(1);
  };

  return (
    <div style={{ margin: '1rem' }}>
      <button onClick={handleClick}>
        Unlock a Free Edit (Watch Ad)
      </button>
    </div>
  );
}
