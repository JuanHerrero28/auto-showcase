import styled from "styled-components";
import Filter from "./Filter";
import Sort from "./Sort";

const HeaderContainerMain = styled.div`
  margin: 0 auto;
  width: 83%;
`;
const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #CCCCCC;

`;

const Title = styled.h1`
  font-size: 50px;
  color: #373737;
  font-weight: 700;
  margin-top:70px;
  margin-bottom:70px;

  @media (max-width: 768px) {
    margin-top:150px;
    font-size: 35px;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-bottom:10px;
`;

const Header = () => {
  return (
    <HeaderContainerMain>
    <HeaderContainer>
      <Title>Descubrí todos los modelos</Title>
      <ControlsContainer>
        <Filter />
        <Sort />
      </ControlsContainer>
    </HeaderContainer>

    </HeaderContainerMain>
  );
};

export default Header;