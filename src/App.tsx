import React from "react";
import "./App.css";
import Form from "components/Form";
import styled from "styled-components";
import { blue } from "@material-ui/core/colors";

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Wrapper = styled.div`
  border-radius: 16px;
  background-color: ${blue[100]};
  padding: 20px;
`;

function App() {
  return (
    <Main>
      <Wrapper>
        <Form />
      </Wrapper>
    </Main>
  );
}

export default App;
