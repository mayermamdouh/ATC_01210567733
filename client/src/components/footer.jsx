import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram, AiFillTikTok } from "react-icons/ai";
import { useTranslation } from "react-i18next";
const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className=" flex flex-col h-auto items-center justify-center w-full">
      <div className="text-xl mt-5 px-10">{t("subscribe")}</div>
      <div className="flex flex-row justify-center px-10 mt-7 gap-3 w-full ">
        <input
          type="tel"
          id="phone"
          className=" w-full max-w-[400px] bg-gray-50 border-2  border-gray-300 outline-none text-sm rounded-lg p-2.5 text-black rtl:text-right ltr:text-left"
          placeholder={t("phone_placeholder")}
          maxLength="11"
          minLength="11"
          pattern="^(010|011|012|015)\d{8}$"
          required
        />

        <button className=" cursor-pointer h-11  bg-transparent border border-white rounded-md  hover:bg-white   transition duration-300">
          {t("subscription")}
        </button>
      </div>
      <div className="h-[1px] w-[80%] bg-white mt-10"></div>
      <div className="flex flex-row-reverse flex-wrap  justify-between w-full items-start  p-5">
        <div className="flex flex-col text-center gap-2 basis-1/4">
          <div className="mb-4 font-bold">{t("customer_service")}</div>

          <div className="cursor-pointer group">
            <span className="relative">
              {t("terms_conditions")}
              <span className="absolute left-0 right-0 -bottom-2 h-0.5 bg-[#04AA6D] transition-all duration-300 transform scale-x-0 group-hover:scale-x-100" />
            </span>
          </div>
          <div className="cursor-pointer group">
            <span className="relative">
              {t("payment_process")}
              <span className="absolute left-0 right-0 -bottom-2 h-0.5 bg-[#04AA6D] transition-all duration-300 transform scale-x-0 group-hover:scale-x-100" />
            </span>
          </div>
        </div>
        <div className="flex flex-col text-center gap-2 basis-1/4">
          <div className="mb-4 font-bold">{t("eventra")}</div>
          <div className="cursor-pointer group">
            <span className="relative">
              {t("about_us")}
              <span className="absolute left-0 right-0 -bottom-2 h-0.5 bg-[#04AA6D] transition-all duration-300 transform scale-x-0 group-hover:scale-x-100" />
            </span>
          </div>
        </div>
        <div className="flex flex-col text-center gap-2 basis-1/4">
          <div className="mb-4 font-bold">{t("contact_us")}</div>
          <div className="cursor-pointer group">
            <span className="relative">
              WhatsApp +20 121 056 7733
              <span className="absolute left-0 right-0 -bottom-2 h-0.5 bg-[#04AA6D] transition-all duration-300 transform scale-x-0 group-hover:scale-x-100" />
            </span>
          </div>

          <div className="cursor-pointer group">
            <span className="relative">
              mairmamdoh@gmaol.com
              <span className="absolute left-0 right-0 -bottom-2 h-0.5 bg-[#04AA6D] transition-all duration-300 transform scale-x-0 group-hover:scale-x-100" />
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-center basis-1/4">
          <div className="mb-4 font-bold">{t("follow_us")}</div>
          <div className="flex flex-row-reverse gap-3 justify-center">
            <div className="group cursor-pointer">
              <FaFacebook className="text-blue-600 text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-800" />
            </div>
            <div className="group cursor-pointer">
              <AiFillInstagram className="text-pink-600 text-3xl transition duration-300 group-hover:scale-110 group-hover:text-pink-800" />
            </div>

            <div className="group cursor-pointer">
              <AiFillTikTok className="text-gray-700 text-3xl transition duration-300 group-hover:scale-110 group-hover:text-[#25F4EE]" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
