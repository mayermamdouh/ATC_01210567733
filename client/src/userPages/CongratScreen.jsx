import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MdOutlineDone } from "react-icons/md";

export default function CongratScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <section className="w-full min-h-screen flex items-center justify-center  ">
      <div className="flex flex-col items-center justify-center p-10 rounded-xl shadow-2xl text-center space-y-4 bg-white min-w-[40%]">
        <MdOutlineDone className="text-[#04AA6D] h-40 w-40" />
        <div className="text-3xl font-bold text-black">
          {t("congratulations")}
        </div>
        <p className="text-gray-700">{t("booking_successful")}</p>
        <button onClick={() => navigate("/")} className="">
          {t("back_to_events")}
        </button>
      </div>
    </section>
  );
}
