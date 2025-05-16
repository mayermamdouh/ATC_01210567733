
const SideMenu = ({ isOpen, children }) => {
  return (
    <aside>
      {isOpen && <div className="fixed inset-0   opacity-50 z-40 " />}
      <div
        className={`fixed right-0 top-0  z-50 h-full w-[70%] transition-transform duration-300 asideBackground ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col m-3 gap-7">{children}</div>
      </div>
    </aside>
  );
};

export default SideMenu;
