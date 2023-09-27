import { useQuery, useMutation } from "@tanstack/react-query";

interface NewBid {
  listing: string;
  bid: string;
}

const addBid = async ({ newBid }: { newBid: NewBid }) => {
  const response = await fetch("/api/add-bid", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBid),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};

const useAddBid = () => {
  const mutation = useMutation(addBid);
  return mutation;
};

export { useAddBid };
