import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Auth } from "../context/authContext";
import { useTranslation } from "react-i18next";
import Loadingg from "../components/Loading";

export default function Events() {
  const { t } = useTranslation();
  const [events, setEvents] = useState([]);
  const { bookedEvents, userId, fetchBookings, setMessage, token } = Auth();
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(true);
  const [LoadingTwo, setLoadingTwo] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/events`
        );
        if (response.data.status === "success") {
          setEvents(response.data.data.events);
        }
      } catch (e) {
        setMessage(`${e.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [setMessage]);

  const handleSubmit = async (eventId) => {
    try {
      setLoadingTwo(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/bookings/${eventId}`,
        {
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === "success") {
        await fetchBookings(userId);
        setLoadingTwo(false);
        navigate("/congrat");
      }
    } catch (e) {
      setMessage(`${e.message}`);
    }
  };

  if (LoadingTwo) return <Loadingg />;
  return (
    <section className="flex flex-col items-center justify-center min-h-[50vh]  my-10 w-full">
      <div className="text-center w-full font-semibold text-2xl mb-10">
        {Loading
          ? null
          : events.length === 0
            ? t("no_events")
            : t("upcoming_events")}
      </div>
      <div className="flex items-center justify-center flex-wrap gap-8">
        {events &&
          events?.map((event, index) => (
            <div
              key={index}
              className="bg-gray-200 w-72 relative rounded-2xl h-52 transform transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Link
                to={`event/${event._id}`}
                className="block w-full h-full rounded-2xl overflow-hidden"
              >
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/${event.photo}`}
                  alt={event.name}
                  className="w-full h-full object-cover transition-all duration-300 hover:brightness-90"
                  loading="lazy"
                />
              </Link>
              <div className=" flex absolute bottom-0 right-2 items-center justify-center h-12">
                <button onClick={() => handleSubmit(event._id)} className="">
                  {bookedEvents.some(
                    (booking) => booking?.event?._id === event._id
                  ) ? (
                    <>
                      {t("booked")}{" "}
                      {
                        bookedEvents?.find(
                          (booked) => booked?.event?._id === event._id
                        )?.tickets
                      }
                      {t("tickets")}
                    </>
                  ) : (
                    t("book_now")
                  )}
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
