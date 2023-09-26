import { useQuery, useMutation } from "@tanstack/react-query";

interface NewListing {
  id: number;
  name: string;
  status: string;
}

const editListing = async ({ newListing }: { newListing: NewListing }) => {
  const response = await fetch("/api/edit-listing", {
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

const useEditListing = () => {
  const mutation = useMutation(editListing);
  return mutation;
};

export { useEditListing };
