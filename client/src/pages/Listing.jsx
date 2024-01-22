import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking } from "react-icons/fa";

export default function Listing() {
  SwiperCore.use(Navigation);
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          setError(data.message);
          setLoading(false);
          return;
        }
        setLoading(false);
        setListing(data);
        setError(null);
      } catch (error) {
        console.log(error);
        setError(error);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  return (
    <main>
      {loading && <p className="text-2xl text-center">Loading...</p>}
      {error && <p className="text-2xl text-center">Something Went Wrong!!!</p>}
      {listing && !loading && !error && (
        <Swiper navigation>
          {listing.imageUrls.map((url) => (
            <SwiperSlide key={url}>
              <div
                className="h-[450px]"
                style={{
                  background: `url(${url}) no-repeat center`,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {listing && <p className="font-semibold text-2xl p-3 mt-3">
        <span>{listing.name && listing.name}</span>
        <span>
            {listing && listing.offer ? ` - $${listing.discountPrice}` : ` - $ ${listing.discountPrice}`}
            {listing.type === 'rent' && ' / month'}
        </span>
        </p>}
      {listing && <p className="text-slate-700 flex items-center p-3">
        <FaMapMarkerAlt className="text-green-700" />
        {listing.address}
        </p>}
        <div className="flex gap-2 p-3">
            <p className="w-full bg-red-700 text-white p-1 rounded-lg max-w-[200px] text-center">
                {listing && listing.type === 'rent' ? 'For Rent' : 'For Sale'}
            </p>
            {listing && listing.offer && <p className="bg-green-600 text-white p-1 rounded-lg w-full text-center max-w-[200px] ">${+listing.regularPrice - +listing.discountPrice}</p>}
        </div>
        <p className="text-slate-600 text-sm p-3"><span className="font-semibold text-lg">Description {' - '}</span>{listing && listing.description}</p>
        <ul className="text-green-900 text-sm font-semibold flex items-center gap-4 sm:gap-6 p-3 flex-wrap">
            <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBed className="text-lg" />
                {listing && listing.bedrooms && listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBath className="text-lg" />
                {listing && listing.bathrooms && listing.bathrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap">
                <FaParking className="text-lg" />
                {listing && listing.parking  ? 'Parking Available' : 'Parkning Not Available'}
            </li>
            <li className="flex items-center gap-1 whitespace-nowrap">
                <FaChair className="text-lg" />
                {listing && listing.furnished  ? 'Furnished' : 'Not Furnished'}
            </li>
        </ul>
    </main>
  );
}
