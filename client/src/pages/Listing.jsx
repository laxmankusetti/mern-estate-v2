import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

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
                    <div className="h-[450px]" style={{background : `url(${url}) no-repeat center`, backgroundSize:'cover'}}></div>
                </SwiperSlide>
            ))}
        </Swiper>
      )}
    </main>
  );
}
