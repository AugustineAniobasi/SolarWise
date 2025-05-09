import { Outlet, useLocation, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Header from "@components/header";
import Footer from "./components/footer";

function App() {
  const pathName = useLocation().pathname;

  return (
    <>
      {pathName === "/register" ? (
        <div className="wrapper">
          <div className="my-6 max-w-3xl mx-auto w-full">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="icon text-primary-500" />
              <span className="text-primary-500">Back to Home</span>
            </Link>
          </div>
        </div>
      ) : (
        <Header />
      )}
      <Outlet />
      {pathName === "/register" ? "" : <Footer />}
    </>
  );
}

export default App;
