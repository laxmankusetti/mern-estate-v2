import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log(currentUser)
  return (
    <header className="bg-slate-300">
      <div className="flex justify-between max-w-6xl m-auto p-3">
        <h1 className="font-bold">
          <span className="text-slate-500 text-xl sm:text-2xl">LAXMAN</span>
          <span className="text-slate-700 text-xl">Estate</span>
        </h1>
        <form className="flex justify-between p-3 rounded-lg bg-slate-100 items-center">
          <input
            type="text"
            placeholder="Search here..."
            className="focus:outline-none bg-transparent"
          />
          <FaSearch className="text-slate-600 cursor-pointer" />
        </form>
        <ul className="flex gap-4 items-center">
          <Link to="/">
            <li className="hidden sm:inline hover:underline text-slate-700 cursor-pointer font-medium">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline hover:underline text-slate-700 cursor-pointer font-medium">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="profile pic"
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <li className="hidden sm:inline hover:underline text-slate-700 cursor-pointer font-medium">
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
