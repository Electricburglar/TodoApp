import React from 'react';
import styled from "styled-components";

const MarginTop = styled.div`
    margin-top: 7rem;
`;

export default () => (
  <MarginTop>
    <h1>Error 404 Not Found!</h1>
    <p>페이지를 찾을 수 없습니다.</p>
  </MarginTop>
);