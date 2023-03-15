import PostService from "apis/service/PostService";
import Button from "elements/Button";
import MyListModal from "components/common/myList/MyListModal";
import Layout from "components/layout/Layout";
import AcessModal from "components/post/write/accessRange/AcessModal";
import HashTagList from "components/post/write/HashTagList";
import ImageList from "components/post/write/ImageList";
import PlaceCard from "components/post/write/PlaceCard";
import Rating from "components/post/write/Rating";
import SearchBtn from "components/post/write/search/SearchBtn";
import SearchModal from "components/post/write/search/SearchModal";
import Textarea from "components/post/write/Textarea";
import { AnimatePresence } from "framer-motion";
import useModal from "hooks/useModal";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import cls from "utils/cls";
import useUser from "hooks/useUser";

const PostEdit = () => {
  const { id } = useParams();
  const [isSearch, handleToggleSearch] = useModal(); // 검색 모달
  const [isAccessLevel, handleToggleAccessLevel] = useModal(); // 공개범위 모달
  const [isMyList, handleToggleMyList] = useModal(); // 나의 리스트 모달
  const [restaurant, setRestaurant] = useState(null); // 장소 저장
  const [imgList, setImgList] = useState([]); // 이미지 저장
  const [myListId, setMyListId] = useState([]); // 나의 리스트 데이터
  const [hashtagNames, setHashtagNames] = useState([]); // 해시태그 리스트
  const [user] = useUser();
  const { mutate: editPost } = PostService.EditPost({
    postId: id,
    profileId: user?.id + "",
  }); // 포스트 수정 함수

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: { rating: 1, visibility: "public" },
  });

  // 포스팅 추가 + 이미지 로직 수정 필요
  const onValid = async (data) => {
    if (!imgList[0]) {
      return toast.error("이미지를 첨부해주세요.");
    }
    if (!restaurant) {
      return toast.error("장소를 지정해주세요.");
    }
    delete restaurant.distance;
    delete restaurant.place_url;

    const payload = {
      ...data,
      myListId,
      ...restaurant,
      hashtagNames,
      rating: +data.rating,
      image: [url],
    };
    try {
      editPost(payload);
    } catch (e) {
      console.log(e);
      toast.error("글 작성에 실패하였습니다.");
    }
  };

  useEffect(() => {
    (async () => {
      await PostService.ReadPost(id).then((response) => {
        console.log(response);
        setValue("rating", response.rating);
        setValue("visibility", response.visibility);
        setRestaurant(response.restaurant);
        setValue("content", response.content);
        setImgList([...response?.img_url]);
        setMyListId(response.myListId);
        setHashtagNames(response.hashtags?.map((item) => item.name));
      });
    })();
  }, [id, setValue]);

  return (
    <Layout title="맛집 포스팅">
      <form
        className="flex flex-1 flex-col space-y-[2.5rem] px-[2rem]"
        onSubmit={handleSubmit(onValid)}
      >
        {restaurant && restaurant?.id ? (
          <PlaceCard restaurant={restaurant} onClick={handleToggleSearch} />
        ) : (
          <SearchBtn onClick={handleToggleSearch} />
        )}

        <div className="relative flex flex-1  flex-col space-y-[2.5rem] pt-[1rem]">
          <div className="flex items-center space-x-[3rem]">
            <span className={cls(style.title)}>평점</span>
            <Rating
              value={watch("rating")}
              register={{ ...register("rating", { required: true }) }}
            />
          </div>
          <Textarea
            register={{ ...register("content", { required: true }) }}
            style={style}
          />

          <ImageList setImgList={setImgList} imgList={imgList} style={style} />
          <HashTagList
            hashtagNames={hashtagNames}
            setHashtagNames={setHashtagNames}
            style={style}
          />

          <div
            className={cls(style.verticalContainer)}
            onClick={handleToggleAccessLevel}
          >
            <span className={cls(style.title)}>공개범위</span>
            <button
              className={cls(
                style.border,
                "Cap2 text-start text-primary-400",
                "bg-[#F7F6F6]"
              )}
            >
              {watch("visibility") === "public" ? "전체 공개" : "팔로워 공개"}
            </button>
          </div>
          <div className={cls(style.verticalContainer, "pb-[8rem]")}>
            <span className={cls(style.title)}>나의 리스트에 추가</span>
            <button
              className={cls(
                style.border,
                "Cap2 text-start text-primary-400",
                "bg-[#F7F6F6]"
              )}
              onClick={handleToggleMyList}
            >
              나의 맛집 리스트에 추가해주세요.
            </button>
          </div>
          <Button
            disabled={!isValid || !imgList[0]}
            className="absolute bottom-0"
          >
            수정하기
          </Button>
        </div>
      </form>
      <AnimatePresence>
        {isSearch && (
          <SearchModal
            setModal={handleToggleSearch}
            setRestaurant={setRestaurant}
          />
        )}
        {isAccessLevel && (
          <AcessModal
            setModal={handleToggleAccessLevel}
            setValue={setValue}
            value={watch("visibility")}
          />
        )}
        {isMyList && (
          <MyListModal
            setModal={handleToggleMyList}
            myList={myListId}
            setMyList={setMyListId}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default PostEdit;

const style = {
  verticalContainer: "flex flex-col space-y-[0.8rem]",
  title: "Cap1",
  border: "rounded-[1rem] border p-[1rem]",
};

const url =
  "https://media.istockphoto.com/id/1147544807/ko/%EB%B2%A1%ED%84%B0/%EC%97%86%EC%8A%B5%EB%8B%88%EB%8B%A4-%EC%8D%B8%EB%84%A4%EC%9D%BC-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EB%B2%A1%ED%84%B0-%EA%B7%B8%EB%9E%98%ED%94%BD.jpg?s=612x612&w=0&k=20&c=d0Ddt3qdtkhxPvpInjBRzLWFjODlfSh3IkKAB6YZwC8=";
