import { useQuery } from "@tanstack/react-query";

const fetchBids = async () => {
  const response = await fetch("/api/get-bids", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

const useBids = () => {
  const { isLoading, isError, data, error } = useQuery(
    ["bids"], // The query key. It is an array, where the first element is a string key, and the second element is a "dependency"
    () => fetchBids(),
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

export { useBids };
