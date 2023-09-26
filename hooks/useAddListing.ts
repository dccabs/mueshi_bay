import { useQuery, useMutation } from "@tanstack/react-query";

interface NewListing {
  name: string;
  status: string;
}

const addListing = async ({ newListing }: { newListing: NewListing }) => {
  const response = await fetch("/api/add-listing", {
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

const useAddListing = () => {
  const mutation = useMutation(addListing);
  return mutation;
};

export { useAddListing };
