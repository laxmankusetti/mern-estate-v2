import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { app } from "../firebase";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setLoading(true)
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setLoading(false)
        })
        .catch((error) => {
          setImageUploadError("Image upload failed (2MB max for image)");
          setLoading(false)
        });
    } else {
      setImageUploadError("You can only upload max 6 images");
      setLoading(false)
    }

  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`upload complete ${progress}%`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleImageDelete = (index) => {
    setFormData({
        ...formData, imageUrls : formData.imageUrls.filter(( _ , i ) => i !== index)
    })
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl text-center my-7 font-semibold">
        Create a Listing
      </h1>
      <div className="flex flex-col sm:flex-row gap-5">
        <form className="flex flex-col flex-1 gap-4">
          <input
            type="text"
            id="name"
            placeholder="Name"
            className="p-3 rounded-lg border border-gray-400 focus:outline-none"
          />
          <textarea
            id="description"
            className="p-3 rounded-lg border border-gray-400 focus:outline-none"
            placeholder="Describe about your listing"
          ></textarea>
          <input
            type="text"
            id="address"
            placeholder="Address"
            className="p-3 rounded-lg border border-gray-400 focus:outline-none"
          />
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="sale" />
              <span>Sell</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="rent" />
              <span>Rent</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="parking" />
              <span>Parking Spot</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="furnshed" />
              <span>Furnished</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="offer" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-5">
            <div className="flex gap-4 items-center">
              <input
                type="number"
                id="beds"
                className="p-3 border border-gray-400 w-20 focus:border-green-500 focus:outline-none rounded-lg"
              />
              <span>Beds</span>
            </div>
            <div className="flex gap-4 items-center">
              <input
                type="number"
                id="baths"
                className="p-3 border border-gray-400 w-20 focus:border-green-500 focus:outline-none rounded-lg"
              />
              <span>Baths</span>
            </div>
            <div className="flex gap-4 items-center">
              <input
                type="number"
                id="regularPrice"
                className="p-3 border border-gray-400 w-30 focus:border-green-500 focus:outline-none rounded-lg"
              />
              <p className="flex flex-col justify-center">
                <span>Regular Price</span>
                <span className="font-normal">($ / month)</span>
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <input
                type="number"
                id="discountPrice"
                className="p-3 border border-gray-400 w-30 focus:border-green-500 focus:outline-none rounded-lg"
              />
              <p className="flex flex-col justify-center">
                <span>Discount Price</span>
                <span className="font-normal">($ / month)</span>
              </p>
            </div>
          </div>
        </form>
        <div className="flex flex-col gap-5">
          <p className="font-semibold">
            Images:{" "}
            <span className="font-normal">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-5">
            <input
              type="file"
              id=""
              className="p-3 border border-gray-400 rounded-lg"
              onChange={(e) => {
                setFiles(e.target.files);
              }}
            />
            <button
              className="uppercase text-green-700 border border-green-700 rounded-lg p-3"
              type="button"
              onClick={handleImageSubmit}
            >
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className="text-red-600 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.map((imageUrl, index) => (
            <div
              className="flex justify-between items-center p-3"
              key={imageUrl + new Date().getTime()}
            >
              <img
                src={imageUrl}
                alt={imageUrl}
                className="w-10 h-10 rounded-lg"
              />
              <span
                className="uppercase text-red-600 hover:opacity-75 cursor-pointer"
                type="button"
                onClick={() => {
                  handleImageDelete(index);
                }}
              >
                delete
              </span>
            </div>
          ))}
          <button className="bg-slate-700 text-white rounded-lg p-3 uppercase">
            create listing
          </button>
        </div>
      </div>
    </div>
  );
}
