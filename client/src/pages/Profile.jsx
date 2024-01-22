import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";

import { app } from "../firebase";
import { Link } from "react-router-dom";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [listShowingError, setListShowingError] = useState(false);
  const [formData, setFormData] = useState({});
  const [userListings, setUserListings] = useState([]);
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')
  useEffect(() => {
    if (file) {
      handleUploadFile(file);
    }
  }, [file]);

  const handleUploadFile = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(progress);
      },
      (error) => {
        setFileUploadError(true);
        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setListShowingError(false)
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if(data.success === false){
        setListShowingError(true)
        return
      }
      setUserListings(data)
    } catch (error) {
      setListShowingError(true)
      console.log(error)
    }
  }

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl text-center font-semibold my-5">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileRef}
          hidden
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <img
          src={formData.avatar || currentUser.avatar}
          alt="profile pic"
          className="w-24 h-24 rounded-full self-center cursor-pointer"
          onClick={() => {
            fileRef.current.click();
          }}
          accept="image/*"
        />
        <p className="self-center font-sm">
          {fileUploadError ? (
            <span className="text-red-700">
              An error accured when uploading image (image should be less than
              2MB)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-600">{`uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-600">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          id="username"
          placeholder="username"
          className="p-3 border rounded-lg focus:outline-none"
          onChange={handleChange}
          defaultValue={currentUser.username}
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          className="p-3 border rounded-lg focus:outline-none"
          onChange={handleChange}
          defaultValue={currentUser.email}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="p-3 border rounded-lg focus:outline-none"
          onChange={handleChange}
          defaultValue={currentUser.password}
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase">
          {loading ? "Loading..." : "update"}
        </button>
        <Link to='/create-listing' className="bg-green-700 p-3 rounded-lg text-white uppercase text-center hover:opacity-90">
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          className="text-red-700 cursor-pointer font-semibold"
          onClick={handleDeleteUser}
        >
          Delete account
        </span>
        <span
          className="text-red-700 cursor-pointer font-semibold"
          onClick={handleSignOut}
        >
          Sign out
        </span>
      </div>
      <p className="text-red-600">{error}</p>
      <button className="text-green-600 w-full font-semibold" onClick={handleShowListings}>Show Listings</button>
      <p className="text-red-600">{listShowingError ? 'Error Showing List' : ''}</p>
      {
      userListings && userListings.length > 0 && 
      <div>
        <h1 className="text-2xl font-semibold text-center my-5">Your Listings</h1>
        {userListings.map((listing) => (
          <div className="flex justify-between gap-4 items-center my-4 border p-2 rounded-lg" key={listing._id}>
            <img src={listing.imageUrls[0]} alt={listing.imageUrls[0]} className="w-20 h-20"/>
            <p className="hover:underline truncate flex-1">{listing.name}</p>
            <div className="flex flex-col items-center">
              <span className="uppercase text-red-700 font-semibold cursor-pointer">Delete</span>
              <span className="uppercase text-green-700 font-semibold cursor-pointer">edit</span>
            </div>
          </div>
        ))}
      </div>
      }
    </div>
  );
}
