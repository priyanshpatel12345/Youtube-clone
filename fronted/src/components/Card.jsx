import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type }) => {
  return (
    <Link to="/video/test" style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image
          type={type}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRktK_BRQ57zujXPsKlDelaT0E2MyWp3-V0Tw&s"
        />
        <Details type={type}>
          <ChannelImage
            type={type}
            src="data:image/png;base64,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"
          />
          <Texts>
            <Title>Test Video</Title>
            <ChannelName>Lama Dev</ChannelName>
            <Info>660,908 views • 1 day ago</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
