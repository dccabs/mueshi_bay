import { useQuery } from "@tanstack/react-query";

const fetchBid = async (id: number) => {
  const response = await fetch("/api/get-bid", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  return await response.json();
};

const useBid = (id) => {
  const { isLoading, isError, data, error } = useQuery(
    ["bids", id], // The query key. It is an array, where the first element is a string key, and the second element is a "dependency"
    () => fetchBid(id),
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

export { useBid };
