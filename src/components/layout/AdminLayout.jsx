import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import Navbar2 from "../common/NavBar2"

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  return (
    <div className="flex flex-row-reverse h-screen overflow-hidden relative bg-[#F8FAFC]">
  
      {updating && (
        <div className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-4 shadow-lg flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600"></div>
            <span className="text-sm text-gray-700">جاري التحديث...</span>
          </div>
        </div>
      )}
      
   
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
   
      <div className="flex-1 flex flex-col h-full overflow-hidden">
   
        <Navbar2 onMenuToggle={() => setIsSidebarOpen((prev) => !prev)} />
        

        <main className="flex-1 overflow-hidden">
          <Outlet context={{ updating, setUpdating }} />
        </main>
      </div>
    </div>
  );
}