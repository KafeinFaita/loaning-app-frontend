import { Outlet } from "react-router-dom";
import MobileNav from './components/MobileNav';
import DesktopNav from "./components/DesktopNav";

const Layout = () => {
    return (
        <div>
            <MobileNav />
            <div className="App flex bg-red-200">
                {/* sidebar for desktop */}
                <DesktopNav />
                <div className='md:w-[70%] lg:w-[75%] xl:w-[80%] bg-yellow-100 p-12'>
                    <Outlet />
                </div>
                
            </div>
        </div>
    )
}

export default Layout;