import { useQuery } from "@tanstack/react-query";

const fetchListings = async () => {
  const response = await fetch("/api/get-listings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

const useListings = () => {
  const { isLoading, isError, data, error } = useQuery(
    ["listings"], // The query key. It is an array, where the first element is a string key, and the second element is a "dependency"
    () => fetchListings(),
    {
      refetchInterval: 10000,
    }
  );

  return {
    loading: isLoading,
    isError,
    data,
    error,
  };
};

export { useListings };
