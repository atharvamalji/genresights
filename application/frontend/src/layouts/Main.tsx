import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <header className="border-b p-4">
        <div>
          <p className="text-xl">Genresights Backend</p>
        </div>
      </header>
      <div className="p-4 bg-slate-50">
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
