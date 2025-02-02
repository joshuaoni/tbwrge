import SearchIcon from "../icons/saerch";

function AdminDashboardSearchBox({ placeholder }: { placeholder: string }) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        className="pl-10 py-2 focus:outline-none border border-[#E2E8F0]"
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2">
        <SearchIcon />
      </span>
    </div>
  );
}

export default AdminDashboardSearchBox;
