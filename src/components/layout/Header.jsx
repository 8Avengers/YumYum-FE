import { BiChevronLeft } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import HEADER_TYPE from "./headerType";
const Header = ({ hasBack, title, headerType }) => {
  const navigate = useNavigate();
  return (
    <header className="screen-width fixed top-0 flex h-[5rem] w-screen items-center justify-between border-b px-[2rem]">
      <div className="flex items-center space-x-[1rem]">
        {hasBack && (
          <span className="cursor-pointer" onClick={() => navigate(-1)}>
            <BiChevronLeft size="3rem" className="#444444" strokeWidth="0.1" />
          </span>
        )}

        <Title className="H1">{title}</Title>
      </div>
      <nav>{headerType ? HEADER_TYPE[headerType] : null}</nav>
    </header>
  );
};

export default Header;

const Title = tw.h3`
 text-[2rem] font-semibold
`;
