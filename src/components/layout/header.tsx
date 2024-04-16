import Button from "../ui/button";
import { FaBars } from 'react-icons/fa';
type HeaderProps = {
  title: string;
  path: string;
};

const headerUrl: HeaderProps[] = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Tokens",
    path: "/",
  },
  {
    title: "Leaderboard",
    path: "/",
  },
];

export const Header = () => {
  return (
    <div
      className="flex py-3
      container items-center gap-3 justify-between"
    >
      <div>
        <div>Logo</div>
      </div>

      <div className="hidden md:block">
        <ul className="flex items-center  gap-5">
          {headerUrl.map(({ title, path }, key) => (
            <li
              key={key}
              className="cursor-pointer text-gray-600 
              hover:text-white"
            >
              {title}
            </li>
          ))}
        </ul>
      </div>

      <div >
        <Button className="hidden md:block">Connect Wallet</Button>
        <span className="block md:hidden w-fit h-fit bg-white px-3 py-3 rounded-full
          cursor-pointer">
          <FaBars color="black"/>
        </span>
      </div>
    </div>
  );
};
