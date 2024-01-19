import { useSelector } from "react-redux";

export default function Profile() {
  const currentUser = useSelector(state => state.user.currentUser)
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl text-center font-semibold my-5">Profile</h1>
      <form className="flex flex-col gap-4">
        <img src={currentUser.avatar} alt="profile pic" className="w-24 h-24 rounded-full self-center"/>
        <input type="text" id="username" placeholder="username" className="p-3 border rounded-lg focus:outline-none"/>
        <input type="email" id="email" placeholder="email" className="p-3 border rounded-lg focus:outline-none"/>
        <input type="password" id="password" placeholder="password" className="p-3 border rounded-lg focus:outline-none"/>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer font-semibold">
          Delete account
        </span>
        <span className="text-red-700 cursor-pointer font-semibold">
          Sign out
        </span>
      </div>
    </div>
  )
}
