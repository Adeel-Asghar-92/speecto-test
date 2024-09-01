import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigation = useNavigate();
  const navigate = (route: string) => {
    navigation(route);
  };
  
  return (
    <div className="h-full flex items-center">
      <div className="w-full  overflow-hidden  shadow-lg">
        {/* Nav bar */}
        <nav className="bg-gray-50 dark:bg-gray-700">
          <div className="px-4 py-3 mx-auto">
            <div className="flex items-center">
              <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                <li>
                  <a
                    onClick={() => navigate("/home")}
                    className="text-gray-900 dark:text-white hover:underline"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => navigate("/books")}
                    className="text-gray-900 dark:text-white hover:underline"
                  >
                    Books
                  </a>
                </li>
                
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};
export default NavBar;
