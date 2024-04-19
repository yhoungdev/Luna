import { Link } from "@tanstack/react-router";

const Logo = () => {
  return (
    <div>
      <Link to="/">
        <img src="/logo.png" alt="logo" width={80} />
      </Link>
    </div>
  );
};

export default Logo;
