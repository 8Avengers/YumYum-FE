import BookmarkService from "apis/service/BookmarkService";
import { useRef } from "react";
import { BiPlus } from "react-icons/bi";
import { toast } from "react-toastify";

const BookmarkForm = () => {
  // bookmark 추가로 변경
  const { mutate: addBookmark } = BookmarkService.AddBookmark();
  const inputRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!inputRef?.current) return;
    const name = inputRef.current?.value;
    if (name?.trim()?.length < 2) {
      return toast.error("북마크 이름의 길이는 최소 2자입니다.");
    }
    addBookmark({ name });
    inputRef.current.value = "";
  };

  return (
    <label className="flex flex-col space-y-[1rem] px-[2rem] pt-[2rem]">
      <span className="Cap1">새 북마크 컬렉션</span>
      <form className="flex items-center space-x-[2rem]" onSubmit={onSubmit}>
        <input
          ref={inputRef}
          type="text"
          className="Cap4 flex-1 rounded-[1rem] border border-primary-400 bg-[#F7F6F6] p-[1rem] outline-none focus:border-primary-500"
          placeholder="추가하실 컬렉션명을 입력해주세요."
        />
        <button className="flex-center h-[3rem] w-[3rem] rounded-full bg-primary-700 transition-colors hover:bg-primary-500">
          <BiPlus size="2rem" className="text-white" strokeWidth="1.2" />
        </button>
      </form>
      <input />
    </label>
  );
};

export default BookmarkForm;
