import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import { Auth } from "../context/authContext";

export default function EventDetails() {
  const { setMessage } = Auth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState();
  const [loading, setLoading] = useState(true);
  const { bookedEvents, userId, token, fetchBookings } = Auth();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/events/${id}`
          );
          if (response.data.status === "success") {
            setEvent(response.data.data.event);
          }
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/bookings/${id}`,
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
        navigate("/congrat");
        setLoading(false);
      }
    } catch (e) {
      setMessage(`${e.message}`);
    }
  };

  if (loading) return <Loading />;

  return (
    <section className="w-full flex items-center justify-center min-h-screen px-5 ">
      {event && (
        <div className="w-[20rem] sm:w-[28rem] md:w-[36rem] lg:w-[48rem] xl:w-[64rem] bg-white rounded-sm shadow-md my-10">
          <img
            src={`${import.meta.env.VITE_API_URL}/uploads/${event.photo}`}
            className="w-full max-h-80 object-cover rounded-t-sm"
            alt="event photo"
            loading="lazy"
          ></img>
          <div className="p-6 space-y-4">
            <div className="text-2xl font-bold text-gray-800">{event.name}</div>
            <p className="text-gray-600">{event.description}</p>

            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <div>
                <span className="font-semibold">{t("category")}:</span>{" "}
                {event.category}
              </div>
              <div>
                <span className="font-semibold">{t("tags")}:</span> {event.tags}
              </div>
              <div>
                <span className="font-semibold">{t("date")}:</span> {event.date}
              </div>
              <div>
                <span className="font-semibold">{t("venue")}:</span>{" "}
                {event.venue}
              </div>
              <div>
                <span className="font-semibold">{t("price")}:</span>{" "}
                {event.price} EGP
              </div>
            </div>
            <button onClick={handleSubmit} className="w-full">
              {bookedEvents.some(
                (booking) => booking?.event?._id === event._id
              ) ? (
                <>
                  {t("booked")}{" "}
                  {
                    bookedEvents.find(
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
      )}
    </section>
  );
}
