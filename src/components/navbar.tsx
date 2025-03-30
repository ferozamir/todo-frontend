function Navbar({ user, setUser }: { user: any; setUser: (user: any) => void }) {
    const handleLogout = () => {
      localStorage.removeItem("token");
      setUser(null);
    };
  
    return (
      <nav className="p-4 bg-gray-800 text-white flex justify-between">
        <h1 className="text-xl">To-Do App</h1>
        {user && <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>}
      </nav>
    );
  }
  
  export default Navbar;
  