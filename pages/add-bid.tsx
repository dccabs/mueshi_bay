import { useState } from "react";
import MobileSidebar from "@/components/home/MobileSidebar";
import DesktopSidebar from "@/components/home/DesktopSidebar";
import Heading from "@/components/home/Heading";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAddBid } from "@/hooks/useAddBid";
import { useListings } from "@/hooks/useListings";

export default function Add() {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    listing: "",
    bid: "",
  });
  const router = useRouter();
  const addBidMutation = useAddBid();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBid = {
      listing: formData.listing,
      bid: formData.bid, // or any other status you have
    };

    addBidMutation.mutate(
      { newBid },
      {
        onSuccess: () => {
          setConfirmModalOpen(true);
        },
        onError: (error) => {
          console.log("Error adding listing:", error);
        },
      }
    );
  };

  const listings = useListings();
  const activeListings =
    !listings.loading &&
    listings.data.filter((listing) => listing.status === "active");
  const options = activeListings.length
    ? activeListings.map((listing) => ({
        label: listing.name.toUpperCase(),
        value: listing.id,
      }))
    : [];

  return (
    <>
      <div>
        <MobileSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <DesktopSidebar />

        <div className="xl:pl-72 mt-8">
          <main>
            <header>
              <nav className="sm:px-6 lg:px-8 mb-8">
                <Link href="/">
                  <Button>
                    <span className="flex space-x-2 items-center">
                      <ArrowLeftIcon className="h-6 w-6" />{" "}
                      <span>Back To Dashboard</span>
                    </span>
                  </Button>
                </Link>
              </nav>
              <Heading name="Add a New Bid" />
            </header>
            <form onSubmit={handleSubmit}>
              <div className="sm:px-6 lg:px-8 max-w-lg space-y-6">
                <Select
                  label="Select a Listing"
                  name="listing"
                  options={options}
                  onChange={handleChange}
                />
                <Input
                  onChange={handleChange}
                  type="number"
                  name="bid"
                  label="Bid"
                  placeholder="Ie. 299"
                />
                <div className="flex justify-end space-x-4">
                  <Link href="/">
                    <Button variant="secondary">Cancel</Button>
                  </Link>
                  <Button
                    type="submit"
                    disabled={!formData.listing || !formData.bid}
                  >
                    Submit Bid
                  </Button>
                </div>
              </div>
            </form>
          </main>
        </div>
      </div>
      <Modal
        open={confirmModalOpen}
        title="Congrats! You added a new listing!"
        description="You can now view your listing in the dashboard."
        cancelText={"Close"}
        onCancel={() => setConfirmModalOpen(false)}
        confirmText={"View Dashboard"}
        onConfirm={() => router.push("/")}
        onClose={() => setConfirmModalOpen(false)}
      />
    </>
  );
}
