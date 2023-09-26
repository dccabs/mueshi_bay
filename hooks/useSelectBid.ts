import { useMutation, useQueryClient } from "@tanstack/react-query";

interface NewListing {
  id: number;
}

const selectBid = async ({ newListing }: { newListing: NewListing }) => {
  const response = await fetch("/api/select-bid", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newListing),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};

const useSelectBid = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(selectBid, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["bids"] });
    },
  });
  return mutation;
};

export { useSelectBid };
