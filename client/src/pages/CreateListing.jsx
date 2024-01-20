export default function CreateListing() {
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
                <input type="number" id="beds" className="p-3 border border-gray-400 w-20 focus:border-green-500 focus:outline-none rounded-lg"/>
                <span>Beds</span>
            </div>
            <div className="flex gap-4 items-center">
                <input type="number" id="baths" className="p-3 border border-gray-400 w-20 focus:border-green-500 focus:outline-none rounded-lg"/>
                <span>Baths</span>
            </div>
            <div className="flex gap-4 items-center">
                <input type="number" id="regularPrice" className="p-3 border border-gray-400 w-30 focus:border-green-500 focus:outline-none rounded-lg"/>
                <p className="flex flex-col justify-center">
                    <span>Regular Price</span>
                    <span className="font-normal">($ / month)</span>
                </p>
            </div>
            <div className="flex gap-4 items-center">
                <input type="number" id="discountPrice" className="p-3 border border-gray-400 w-30 focus:border-green-500 focus:outline-none rounded-lg"/>
                <p className="flex flex-col justify-center">
                    <span>Discount Price</span>
                    <span className="font-normal">($ / month)</span>
                </p>
            </div>
          </div>
        </form>
        <div className="flex flex-col gap-5">
            <p className="font-semibold">Images: <span className="font-normal">The first image will be the cover (max 6)</span></p>
            <div className="flex gap-5">
                <input type="file" id="" className="p-3 border border-gray-400 rounded-lg"/>
                <button className="uppercase text-green-700 border border-green-700 rounded-lg p-3">upload</button>
            </div>
            <button className="bg-slate-700 text-white rounded-lg p-3">create listing</button>
        </div>
      </div>
    </div>
  );
}
