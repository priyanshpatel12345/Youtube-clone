import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(`/api/video/${type}`);

        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setVideos(data);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchVideo();
  }, []);
  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}

      {error && <div> {error.message}</div>}
    </Container>
  );
};

export default Home;
