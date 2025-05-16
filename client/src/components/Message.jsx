import { useEffect } from "react";
import { Auth } from "../context/authContext";

const Message = () => {
  const { message, setMessage } = Auth();
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage("");
    }, 3000);
    return () => clearTimeout(timeout);
  }, [message, setMessage]);

  const backgroundColor =
    message?.toLowerCase().includes("successful") ||
    message?.toLowerCase().includes("success")
      ? "bg-green-500"
      : "bg-red-500";

  return (
    <div
      className={`flex items-center justify-center my-2 mr-3 overflow-hidden fixed top-16 right-4 z-50`}
    >
      <div
        className={`${backgroundColor} overflow-hidden rounded-sm shadow-md text-center text-white transition-all duration-300 transform 
           ${message ? " opacity-100 p-3" : " opacity-0"}`}
      >
        {message}
      </div>
    </div>
  );
};

export default Message;
