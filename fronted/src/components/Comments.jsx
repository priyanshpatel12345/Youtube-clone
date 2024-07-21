import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
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

const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getComments/${videoId}`);

        const data = await res.json();

        if (res.ok) {
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchComments();
  }, [videoId]);

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/comment/addComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser._id,
          videoId,
          comments: newComment,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Comment successful");
        setComments([data, ...comments]);
        setNewComment("");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setComments(comments.filter((comment) => comment._id !== commentId));
        alert("Comment deleted");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = (commentId, editedComment) => {
    setComments(
      comments.map((c) =>
        c._id === commentId ? { ...c, comments: editedComment } : c
      )
    );
  };

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser.img} />
        <Input
          placeholder="Add a comment..."
          onChange={(e) => setNewComment(e.target.value)}
          value={newComment}
        />
        <SaveOutlinedIcon onClick={handleComment} />
      </NewComment>
      {comments.map((comment) => (
        <CommentContainer key={comment._id}>
          <Comment comment={comment} onEdit={handleEdit} />
          {currentUser._id === comment.userId && (
            <DeleteOutlinedIcon
              onClick={() => handleDeleteComment(comment._id)}
            />
          )}
        </CommentContainer>
      ))}
    </Container>
  );
};

export default Comments;
