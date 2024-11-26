import './page.css'
import Sidebar from "../../components/adminSidebar/page";
import TopSection from "../../components/Admin/adminTopSection/page";
import HomeScrollBar from '../../components/Admin/homeScrollBar/page'
import CategoriesSection from '../../components/Admin/categoriesSection/page'


export default function dashboard () {
    return (
        <div className="flex">
        <Sidebar/>
        <div className="flex flex-col" style={{width:'90%', marginLeft:'auto'}}>
            <TopSection />
            <HomeScrollBar />
            <CategoriesSection />

         </div>
    </div>
    )
}