import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: space-between;
`;
const VideoCard = styled.div`
  flex: 1 1 calc(33.33% - 10px);
  box-sizing: border-box;
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(`/api/video/${type}`);

        const data = await res.json();

        if (res.ok) {
          setVideos(data);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchVideo();
  }, [type]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
    }
  }, [currentUser, navigate]);
  return (
    <Container>
      {videos.map((video) => (
        <VideoCard key={video._id}>
          <Card video={video} />
        </VideoCard>
      ))}

      {error && <div> {error.message}</div>}
    </Container>
  );
};

export default Home;
