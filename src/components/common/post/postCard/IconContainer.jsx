import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { TbMessageCircle2 } from "react-icons/tb";
import { FiBookmark } from "react-icons/fi";
import { strToBool } from "utils/isLike";
import PostService from "apis/service/PostService";
import { useRecoilValue } from "recoil";
import { postQueryKeyAtom } from "atoms/queryKeyAtom";
import { useEffect, useState } from "react";

//import { BsBookmarkFill } from "react-icons/bs"

// [] DM
// [] 북마크

const IconContainer = ({ handleCommentModal, post }) => {
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const queryKey = useRecoilValue(postQueryKeyAtom);
  const { mutate: addPostLike, isLoading: addLoading } =
    PostService.AddPostLike(queryKey);
  const { mutate: removePostLike } = PostService.RemovePostLike(queryKey);

  const handleToggleLike = () => {
    if (isLikeLoading) return;
    if (strToBool(post?.isLiked)) {
      removePostLike(post?.id);
    } else {
      addPostLike(post?.id);
    }
  };

  useEffect(() => {
    if (addLoading) {
      setIsLikeLoading(true);
    } else {
      setIsLikeLoading(false);
    }
  }, [addLoading]);

  return (
    <div className="flex items-center justify-between px-[2rem] py-[1rem]  text-primary-600 ">
      <div className="flex items-center space-x-[1.5rem]">
        {strToBool(post?.isLiked) ? (
          <AiFillHeart
            size="2.7rem"
            className="cursor-pointer text-primary-600 hover:text-primary-400"
            onClick={handleToggleLike}
          />
        ) : (
          <AiOutlineHeart
            size="2.7rem"
            className="cursor-pointer hover:text-primary-500"
            onClick={handleToggleLike}
          />
        )}

        <TbMessageCircle2
          className="scale-x-[-1] cursor-pointer hover:text-primary-500"
          size="2.7rem"
          onClick={handleCommentModal}
        />
        <HiOutlinePaperAirplane
          size="2.5rem"
          className="mt-[-0.4rem] rotate-[45deg] cursor-pointer hover:text-primary-500"
        />
      </div>
      <FiBookmark
        size="2.7rem"
        className="cursor-pointer text-primary-600 hover:text-primary-500"
      />
      {/* <BsBookmarkFill size={"2.3rem"} /> */}
    </div>
  );
};

export default IconContainer;
