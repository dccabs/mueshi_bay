import { useQuery } from "@tanstack/react-query";

const fetchListing = async (id: number) => {
  const response = await fetch("/api/get-listing", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  return await response.json();
};

const useListing = (id) => {
  const { isLoading, isError, data, error } = useQuery(
    ["listings", id], // The query key. It is an array, where the first element is a string key, and the second element is a "dependency"
    () => fetchListing(id)
  );

  return {
    loading: isLoading,
    isError,
    data,
    error,
  };
};

export { useListing };
