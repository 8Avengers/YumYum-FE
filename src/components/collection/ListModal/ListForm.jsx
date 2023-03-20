import ListService from "apis/service/ListService";
import { useRef } from "react";
import { BiPlus } from "react-icons/bi";

const ListForm = () => {
  const { mutate: addMyList } = ListService.AddMyList();
  const inputRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (inputRef?.current) {
      const name = inputRef.current?.value;
      addMyList({ name });
      inputRef.current.value = "";
    }
  };

  return (
    <label className="flex flex-col space-y-[1rem] px-[2rem]">
      <span className="Cap1">새 리스트</span>
      <form className="flex items-center space-x-[2rem]" onSubmit={onSubmit}>
        <input
          ref={inputRef}
          type="text"
          className="Cap4 flex-1 rounded-[1rem] border border-primary-400 bg-[#F7F6F6] p-[1rem] outline-none focus:border-primary-500"
          placeholder="추가하실 리스트명을 입력해주세요."
        />
        <button className="flex-center h-[3rem] w-[3rem] rounded-full bg-primary-700 transition-colors hover:bg-primary-500">
          <BiPlus size="2rem" className="text-white" strokeWidth="1.2" />
        </button>
      </form>
      <input />
    </label>
  );
};

export default ListForm;
