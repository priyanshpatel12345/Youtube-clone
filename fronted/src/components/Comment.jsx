import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "timeago.js";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EditOutlined from "@mui/icons-material/EditOutlined";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
  display: flex;
  gap: 20px;
  cursor: pointer;
`;

const Comment = ({ comment, onEdit }) => {
  const [channel, setChannel] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comments);

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await fetch(`/api/user/getUser/${comment.userId}`);

      const data = await res.json();

      if (res.ok) {
        setChannel(data);
      }
    };
    fetchChannel();
  }, []);

  const handleEditing = () => {
    setIsEditing(true);
    setEditedComment(comment.comments);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/comment/updateComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comments: editedComment }),
      });

      if (res.ok) {
        setIsEditing(false);
        onEdit(comment._id, editedComment);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container>
      <Avatar src={channel.img} />
      <Details>
        <Name>
          {channel.username} <Date>{format(comment.createdAt)}</Date>
        </Name>
        <Text>
          {comment.comments}
          {currentUser && currentUser._id === comment.userId && (
            <EditOutlinedIcon onClick={handleEditing} />
          )}
        </Text>
        {isEditing ? (
          <>
            <Input
              onChange={(e) => setEditedComment(e.target.value)}
              value={editedComment}
            />
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </>
        ) : (
          <>{/* <Text>{comment.comments}</Text> */}</>
        )}
      </Details>
    </Container>
  );
};

export default Comment;
