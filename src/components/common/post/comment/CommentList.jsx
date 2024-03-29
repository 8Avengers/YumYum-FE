import CommentService from "apis/service/CommentService";
import { postQueryKeyAtom } from "atoms/queryKeyAtom";
import useObserver from "hooks/useObserver";
import useUser from "hooks/useUser";
import React, { useCallback, useMemo } from "react";
import { useRecoilValue } from "recoil";
import CommentCard from "./CommentCard";

const CommentList = ({ postId }) => {
  const queryKey = useRecoilValue(postQueryKeyAtom);
  const [user] = useUser();
  const {
    data: comments,
    hasNextPage,
    fetchNextPage,
  } = CommentService.ReadComments(postId);

  const getNextPage = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage]);

  const [observerRef] = useObserver(getNextPage);

  const commentList = useMemo(() => {
    if (!comments) return [];
    return comments?.pages?.flat();
  }, [comments]);

  return (
    <ul className="mb-[12rem] h-[calc(100vh-18.7rem)]  overflow-y-auto px-[2rem] scrollbar-hide">
      {commentList?.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          postId={postId + ""}
          queryKey={queryKey}
          isOwner={comment?.user?.id === user?.id}
        />
      ))}
      <div ref={observerRef} className="" />
    </ul>
  );
};

export default CommentList;
