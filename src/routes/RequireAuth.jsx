import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Books from "./pages/Books";
import RequireAuth from "./routes/RequireAuth";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="/books" element={<RequireAuth><Books /></RequireAuth>} />
      </Routes>
    </BrowserRouter>
  );
}
