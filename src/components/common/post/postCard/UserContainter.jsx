import { AiOutlineMore } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import getTime from "utils/getTime";
import { handleProfileError } from "utils/handleImgError";

const UserContainter = ({ post, handlePostConfigModal, isOwner }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between  px-[2rem] pb-[1rem]  ">
      <div className="flex items-center space-x-[0.8rem] ">
        <img
          className="h-[3rem] w-[3rem] cursor-pointer rounded-full bg-primary-300 object-cover hover:opacity-80"
          src={post?.user?.profile_image}
          onError={(e) => handleProfileError(e, post?.user?.id)}
          alt="프로필"
          onClick={() => navigate(`/profile/${post?.user?.id}`)}
        />
        <span
          className="Cap3 cursor-pointer hover:opacity-80"
          onClick={() => navigate(`/profile/${post?.user?.id}`)}
        >
          {post?.user?.nickname}
        </span>
        <span className="Cap6 mt-[0.2rem] text-primary-500">
          · {getTime(post?.updated_at)}
        </span>
      </div>
      {isOwner && (
        <span
          className="flex-center h-[3rem] w-[3rem] cursor-pointer rounded-full transition-colors hover:bg-[rgba(0,0,0,0.05)]"
          onClick={handlePostConfigModal}
        >
          <AiOutlineMore
            size="2rem"
            strokeWidth="5"
            className="text-primary-600"
          />
        </span>
      )}
    </div>
  );
};

export default UserContainter;
