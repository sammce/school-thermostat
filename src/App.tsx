import HiveForm from "components/HiveForm";
import styled from "styled-components";
import WaveSVG from "static/wave2.svg";

const StyledImage = styled.img`
  position: absolute;
  z-index: -2;
  bottom: 0;
  right: 0;
  left: 0;
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  color: #ffffff;
`;

const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0.35);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.18);

  padding-top: 20px;
`;

function App() {
  return (
    <Main>
      <Wrapper>
        <HiveForm />
      </Wrapper>
      <StyledImage src={WaveSVG} alt="waves" />
    </Main>
  );
}

export default App;
