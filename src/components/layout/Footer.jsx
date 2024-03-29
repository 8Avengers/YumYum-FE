import { BiHomeAlt2, BiReceipt, BiUser } from "react-icons/bi";
import { CiSquarePlus } from "react-icons/ci";
import { AiFillHome } from "react-icons/ai";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { useMatch, useNavigate } from "react-router-dom";
import { FaMap, FaRegMap, FaUser } from "react-icons/fa";
import styled from "@emotion/styled";
import useUser from "hooks/useUser";

const Footer = () => {
  const navigate = useNavigate();
  const homeMatch = useMatch("/");
  const newsfeedMatch = useMatch("/newsfeed/*");
  const writeMatch = useMatch("/post/write");
  const mapMatch = useMatch("/quest/*");
  const profileMatch = useMatch("/profile/*");
  const [user] = useUser();
  return (
    <footer className="bg-white">
      <nav className="screen-width  fixed bottom-0 w-screen  border-t bg-primary-100">
        <ul className="grid h-[6rem]  grid-cols-5 bg-primary-100">
          <Icon onClick={() => navigate("/")} className="cursor-pointer">
            {homeMatch ? (
              <AiFillHome size="2.5rem" color="#444444" strokeWidth="0.1" />
            ) : (
              <BiHomeAlt2 size="2.5rem" color="#616161" strokeWidth="0.1" />
            )}
          </Icon>
          <Icon
            onClick={() => navigate("/newsfeed")}
            className="cursor-pointer"
          >
            <BiReceipt
              size="2.5rem"
              color={newsfeedMatch ? "#444444" : "#616161"}
              strokeWidth={newsfeedMatch ? "0.8" : "0.1"}
            />
          </Icon>
          <Icon
            onClick={() => navigate("/post/write")}
            className="cursor-pointer"
          >
            {writeMatch ? (
              <BsFillPlusSquareFill size="2.2rem" color="#444444" />
            ) : (
              <CiSquarePlus size="2.6rem" color="#616161" strokeWidth="0.8" />
            )}
          </Icon>
          <Icon onClick={() => navigate("/quest")} className="cursor-pointer">
            {mapMatch ? (
              <FaMap size="2.5rem" color="#444444" />
            ) : (
              <FaRegMap size="2.5rem" color="#616161" strokeWidth="0.1" />
            )}
          </Icon>
          <Icon
            onClick={() => navigate(`/profile/${user?.id}`)}
            className="cursor-pointer"
          >
            {profileMatch ? (
              <FaUser size="2.2rem" color="#444444" />
            ) : (
              <BiUser size="2.5rem" color="#616161" strokeWidth="0.1" />
            )}
          </Icon>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;

const Icon = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`;
