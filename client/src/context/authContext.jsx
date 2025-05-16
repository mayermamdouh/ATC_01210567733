import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [bookedEvents, setBookedEvents] = useState([]);
  const [message, setMessage] = useState("");

  const fetchBookings = useCallback(
    async (userId) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/bookings/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.status === "success") {
          setBookedEvents(response.data.data.bookings);
        }
      } catch (error) {
        console.error("Failed to fetch booked events", error);
      }
    },
    [token]
  );

  useEffect(() => {
    if (token && userId) {
      fetchBookings(userId);
    }
  }, [token, userId, fetchBookings]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decoded = jwtDecode(storedToken);
      setToken(storedToken);
      setUserId(decoded?.id);
      setRole(decoded?.role);
    }
  }, []);

  const login = (jwtToken) => {
    const decoded = jwtDecode(jwtToken);
    setToken(jwtToken);
    setUserId(decoded?.id);
    setRole(decoded?.role);
    localStorage.setItem("token", jwtToken);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setRole(null);
    localStorage.removeItem("token");
    setMessage("You have successfully logged out.");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        role,
        bookedEvents,
        message,
        setMessage,
        login,
        logout,
        fetchBookings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const Auth = () => useContext(AuthContext);
