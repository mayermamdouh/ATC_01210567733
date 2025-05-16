import { lazy, Suspense, useEffect } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Event = lazy(() => import("./userPages/events.jsx"));
import EventDetails from "./userPages/eventDetails.jsx";
import Congrat from "./userPages/CongratScreen.jsx";
const Admin = lazy(() => import("./adminPages/admin.jsx"));
import ReadEvent from "./adminPages/readEvent.jsx";
import CreateEvent from "./adminPages/createEvent.jsx";
import UpdateEvent from "./adminPages/updateEvent.jsx";
import AdminPaths from "./adminPages/adminPaths.jsx";
import UserLayout from "./userPages/userLayout.jsx";
import AdminLayout from "./adminPages/adminLayout.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import "./i18n";
import Loading from "./components/Loading.jsx";
import Message from "./components/Message.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Event />
          </Suspense>
        ),
      },
      { path: "event/:id", element: <EventDetails /> },
      { path: "congrat", element: <Congrat /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminPaths>
        <AdminLayout />
      </AdminPaths>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Admin />
          </Suspense>
        ),
      },
      { path: "read/event/:id", element: <ReadEvent /> },
      { path: "update/event/:id", element: <UpdateEvent /> },
      { path: "create/event", element: <CreateEvent /> },
    ],
  },
]);

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <AuthProvider>
      <Message />
      <RouterProvider router={routes} />
    </AuthProvider>
  );
}

export default App;
