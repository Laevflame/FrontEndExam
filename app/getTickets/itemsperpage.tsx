"use client";

import { useRouter, useSearchParams } from "next/navigation";

const ItemsPerPageSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const itemsPerPage = Number(searchParams.get("itemsPerPage")) || 5;
  const currentPage = Number(searchParams.get("page")) || 1;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = e.target.value;
    router.push(`/getTickets?itemsPerPage=${newItemsPerPage}&page=1`);
  };

  return (
    <label className="block mb-2">
      Show per page:{" "}
      <select
        value={itemsPerPage}
        onChange={handleChange}
        className="border rounded p-1"
      >
        {[5, 10, 20].map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </label>
  );
};

export default ItemsPerPageSelect;
