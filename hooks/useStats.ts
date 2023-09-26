import { useQuery } from "@tanstack/react-query";

const fetchStats = async () => {
  const response = await fetch("/api/get-stats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

const useStats = () => {
  const { isLoading, isError, data, error } = useQuery(
    ["stats"], // The query key. It is an array, where the first element is a string key, and the second element is a "dependency"
    () => fetchStats(),
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

export { useStats };
