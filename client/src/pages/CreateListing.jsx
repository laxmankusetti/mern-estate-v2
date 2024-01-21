export default function CreateListing() {
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
                <span className="font-normal"> The first image will be the cover (max 6)</span>
            </p>
            <div className="flex gap-4">
                <input type="file" id="images" multiple accept="image/*" className="p-3 border border-gray-400 rounded-lg w-full" />
                <button className="text-green-700 border border-green-700 p-3 rounded-lg hover:shadow-md">upload</button>
            </div>
            <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-90">create Listing</button>
        </div>
      </form>
    </main>
  );
}
