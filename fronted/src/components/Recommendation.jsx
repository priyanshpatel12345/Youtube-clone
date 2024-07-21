import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "./Card";

const Container = styled.div`
  flex: 2;
`;

export default function Recommendation({ tags }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      let res = await fetch(`/api/video/tagVideo?tags=${tags}`);

      let data = await res.json();

      if (res.ok && data.length > 0) {
        setVideos(data);
      } else {
        res = await fetch("/api/video/randomVideo");

        data = await res.json();

        if (res.ok) {
          setVideos(data);
        } else {
          console.log("failed to fetch videos");
        }
      }
    };
    fetchVideos();
  }, [tags]);
  return (
    <Container>
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
    </Container>
  );
}
