import { useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import MenuIcon from '@mui/icons-material/Menu'

export default function Navbar2({ onMenuToggle }) {
  const [search, setSearch] = useState('')
  const [currentDate, setCurrentDate] = useState('')

  useEffect(() => {
    const updateDate = () => {
      const now = new Date()
      const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }
      const formatted = now.toLocaleDateString('ar-EG', options)
      setCurrentDate(formatted)
    }

    updateDate()
    const interval = setInterval(updateDate, 60000) 

    return () => clearInterval(interval)
  }, [])

  return (
    <header className="relative z-50 bg-white px-6 py-4 flex flex-row-reverse items-center justify-between shadow-sm shrink-0">
      {/* Title + Menu button (mobile) */}
      <div className="flex flex-row-reverse checked: items-center gap-3 cursor-pointer">
        <button
          onClick={onMenuToggle}
          className="lg:hidden cursor-pointer flex items-center justify-center w-10 h-10 rounded-lg text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <MenuIcon />
        </button>
        <div className="text-xl font-bold text-gray-800">محافظة القاهرة</div>
      </div>

      {/* Search + Notifications + Date */}
      <div className="flex flex-row-reverse items-center gap-5">
        <div className="relative hidden sm:block">
          <SearchIcon className="absolute right-3 top-2.5 text-gray-400" fontSize="small" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث برقم البلاغ، المنطقة..."
            className="bg-gray-100 rounded-lg pr-10 pl-4 py-2 text-sm w-48 md:w-72 outline-none transition"
            onFocus={e => e.target.style.outline = '2px solid var(--color-primary)'}
            onBlur={e => e.target.style.outline = 'none'}
          />
        </div>

     

        <div className="text-sm text-gray-400 whitespace-nowrap">{currentDate}</div>
      </div>
    </header>
  )
}