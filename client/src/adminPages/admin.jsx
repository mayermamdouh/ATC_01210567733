import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { Auth } from "../context/authContext";
import { useTranslation } from "react-i18next";

export default function Admin() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token, role, setMessage } = Auth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchEvents = useCallback(async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/events`);
      if (response.data.status === "success") {
        setEvents(response.data.data.events);
      }
    } catch (e) {
      setMessage(`${e.message}`);
    } finally {
      setLoading(false);
    }
  }, [setEvents, setMessage, setLoading]);

  useEffect(() => {
    if (role === "USER") {
      navigate("/");
    }
  }, [navigate, role]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const deleteEvents = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/events/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === "success") {
        await fetchEvents();
        setMessage("You have successfully delete the event!");
      }
    } catch (e) {
      setMessage(`${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = events.filter((event) =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loading />;
  return (
    <section className="min-h-screen w-full flex flex-col items-center  justify-start px-5">
      <div className="min-w-[20rem] max-w-[90rem] w-full border-2 bgEventAdmin border-gray-300 my-40 rounded-md">
        <div className="flex items-center justify-start gap-5 mx-2 my-2">
          <input
            className="w-[70%] p-1 border-b-[2px] border-b-gray-400 outline-none"
            type="text"
            placeholder={t("search_placeholder")}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          <Link to="/admin/create/event" className="w-[20%] ">
            <button className="w-full text-sm">{t("create_event")}</button>
          </Link>
        </div>
        <div className="w-full bg-gray-200 h-0.5 "></div>
        <section className="p-3">
          {filterEvents.map((event, index) => (
            <div
              key={index}
              className="border-[1.5px] flex items-center justify-between border-gray-300 p-2 my-3 rounded-xl"
            >
              <div className="w-[70%] font-semibold mr-2">{event.name}</div>
              <div className="flex flex-row   gap-3">
                <Link to={`/admin/read/event/${event._id}`}>
                  <button className="read">{t("read")}</button>
                </Link>
                <Link to={`/admin/update/event/${event._id}`}>
                  <button className="edit">{t("edit")}</button>
                </Link>
                <button
                  onClick={() => deleteEvents(event._id)}
                  className="delete"
                >
                  {t("delete")}
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </section>
  );
}
