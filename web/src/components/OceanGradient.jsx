// src/components/OceanGradient.jsx

import styled from 'styled-components';

const OceanGradient = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: linear-gradient(
    to bottom,
    #FF7E5F 0%,
    #FEB47B 30%,
    #4B79A1 70%,
    #283E51 100%
  );
`;

export default OceanGradient;
