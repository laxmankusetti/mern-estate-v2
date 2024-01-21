import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { app } from "../firebase";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls : [],
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  console.log(formData)
  
  const handleImageSubmit = () => {
    if(files.length > 0 && (files.length + formData.imageUrls.length) < 7){
        setUploading(true)
        const promises = [];
        for(let i =0; i<files.length; i++){
            promises.push(storeImage(files[i]))
        }
        Promise.all(promises).then((urls) => {
            setFormData({...formData, imageUrls : formData.imageUrls.concat(urls)});
            setImageUploadError(false)
            setUploading(false)
        }).catch((error) => {
            setImageUploadError(error.message)
            setUploading(false)
        })
    }else{
        setImageUploadError('You can only upload 6 images per listing')
        setUploading(false)
    }
  }

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`upload is ${progress}% done`)
        },
         (error) => {
            reject(error);
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {resolve(downloadURL)})
        }
        )
    })
  }
  const handleRemoveImage = (index) => {
    setFormData({
        ...formData, 
        imageUrls : formData.imageUrls.filter((_, i) => i !== index)
    })
  }
  return (
    <main className="max-w-4xl mx-auto p-3">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            id="name"
            placeholder="Name"
            className="p-3 border rounded-lg"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            id="description"
            placeholder="Description"
            className="p-3 border rounded-lg"
            required
          />
          <input
            type="text"
            id="address"
            placeholder="Address"
            className="p-3 border rounded-lg"
            required
          />
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="sale" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="rent" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="parking" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="furnished" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="offer" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                className="rounded-lg p-3 border"
              />
              <span>Beds</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                className="rounded-lg p-3 border"
              />
              <span>Baths</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="10"
                className="rounded-lg p-3 border"
              />
              <p className="flex flex-col items-center">
                <span>Regular Price</span>
                <span className="text-xs">($ / month)</span>
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="discountPrice"
                min="1"
                max="10"
                className="rounded-lg p-3 border"
              />
              <p className="flex flex-col items-center">
                <span>Discounted Price</span>
                <span className="text-xs">($ / month)</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-5">
          <p className="font-semibold">
            Images:
            <span className="font-normal">
              {" "}
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              className="p-3 border border-gray-400 rounded-lg w-full"
              onChange={(e) => {setFiles(e.target.files)}}
            />
            <button className="text-green-700 border border-green-700 p-3 rounded-lg hover:shadow-md" type='button' onClick={handleImageSubmit}>
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className="text-red-600 text-sm">{imageUploadError && imageUploadError}</p>
          {formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
            <div className="flex justify-between p-3 border border-slate-500 rounded-lg" key={url}>
                <img src={url} alt={url} className="w-20 h-20" />
                <button className="uppercase text-red-700 hover:opacity-75" type='button' onClick={() => {handleRemoveImage(index)}}>Delete</button>
            </div>
          ))}
          <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-90">
            create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
