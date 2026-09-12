import { Routes, Route, Outlet } from "react-router-dom";
import { LangProvider } from "./i18n/LangContext";
import { SettingsProvider } from "./api/SettingsContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Doctors from "./pages/Doctors";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Appointment from "./pages/Appointment";

import { AuthProvider } from "./admin/AuthContext";
import RequireAuth from "./admin/RequireAuth";
import AdminLayout from "./admin/AdminLayout";
import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import ContentEditor from "./admin/ContentEditor";
import ServicesManager from "./admin/ServicesManager";
import DoctorsManager from "./admin/DoctorsManager";
import GalleryManager from "./admin/GalleryManager";
import BlogManager from "./admin/BlogManager";
import TestimonialsManager from "./admin/TestimonialsManager";
import AppointmentsManager from "./admin/AppointmentsManager";
import MessagesManager from "./admin/MessagesManager";
import SettingsManager from "./admin/SettingsManager";

export default function App() {
  return (
    <Routes>
      <Route
        element={
          <LangProvider>
            <SettingsProvider>
              <Layout />
            </SettingsProvider>
          </LangProvider>
        }
      >
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="contact" element={<Contact />} />
        <Route path="appointment" element={<Appointment />} />
      </Route>

      <Route
        path="admin"
        element={
          <AuthProvider>
            <Outlet />
          </AuthProvider>
        }
      >
        <Route path="login" element={<Login />} />
        <Route
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="content" element={<ContentEditor />} />
          <Route path="services" element={<ServicesManager />} />
          <Route path="doctors" element={<DoctorsManager />} />
          <Route path="gallery" element={<GalleryManager />} />
          <Route path="blog" element={<BlogManager />} />
          <Route path="testimonials" element={<TestimonialsManager />} />
          <Route path="appointments" element={<AppointmentsManager />} />
          <Route path="messages" element={<MessagesManager />} />
          <Route path="settings" element={<SettingsManager />} />
        </Route>
      </Route>
    </Routes>
  );
}
