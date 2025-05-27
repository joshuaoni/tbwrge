import SearchIcon from "../icons/saerch";

interface AdminDashboardSearchBoxProps {
  placeholder: string;
  onSearch: (term: string) => void;
}

const AdminDashboardSearchBox = ({
  placeholder,
  onSearch,
}: AdminDashboardSearchBoxProps) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        className="w-80 pl-10 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => onSearch(e.target.value)}
      />
      <svg
        className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
};

export default AdminDashboardSearchBox;
