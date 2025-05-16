import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import { useTranslation } from "react-i18next";
import { Auth } from "../context/authContext";

export default function ReadEvent() {
  const { t } = useTranslation();
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { setMessage } = Auth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/events/${id}`
        );
        if (response.data.status === "success") {
          setEvent(response.data.data.event);
        }
      } catch (e) {
        setMessage(`${e.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [id, setMessage]);

  if (loading) return <Loading />;

  return (
    <section className="w-full flex items-center justify-center min-h-screen px-5">
      {event && (
        <div className="w-[20rem] sm:w-[28rem] md:w-[36rem] lg:w-[48rem] xl:w-[64rem] bg-white rounded-sm shadow-md my-10">
          <img
            src={`${import.meta.env.VITE_API_URL}/uploads/${event.photo}`}
            className="w-full max-h-80 object-cover rounded-t-sm"
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
                <span className="font-semibold">{t("date")}:</span>{" "}
                {new Date(event.date).toISOString().slice(0, 16)}
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
          </div>
        </div>
      )}
    </section>
  );
}
