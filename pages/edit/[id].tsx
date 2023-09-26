import { useState, useEffect } from "react";
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
import { useListing } from "@/hooks/useListing";
import { useEditListing } from "@/hooks/useEditListing";

export default function Edit() {
  const [init, setInit] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    status: "inactive",
  });
  const router = useRouter();
  const id = router.query.id;
  const addListingMutation = useEditListing();
  const listing = useListing(id);

  useEffect(() => {
    if (!listing.loading && !init) {
      setFormData({
        name: listing.data.name,
        status: listing.data.status,
      });
      setInit(true);
    }
  }, [listing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log("submitting");
    e.preventDefault();
    const newListing = {
      id: listing.data.id,
      name: formData.name,
      status: formData.status, // or any other status you have
    };

    addListingMutation.mutate(
      { newListing },
      {
        onSuccess: () => {
          console.log("Listing added successfully");
          setConfirmModalOpen(true);
        },
        onError: (error) => {
          console.log("Error adding listing:", error);
        },
      }
    );
  };

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
              <Heading name="Edit Listing" />
            </header>
            {listing.loading ? (
              <div>Loading...</div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="sm:px-6 lg:px-8 max-w-lg space-y-6">
                  <Input
                    onChange={handleChange}
                    type="text"
                    name="name"
                    label="Listing Name"
                    placeholder="Ie. Brand New Samsung TV"
                    defaultValue={listing.data.name}
                  />
                  <Select
                    label="Status"
                    name="status"
                    options={[
                      { label: "Inactive", value: "inactive" },
                      { label: "Active", value: "active" },
                      { label: "Sold", value: "sold" },
                    ]}
                    defaultValue={listing.data.status}
                    onChange={handleChange}
                  />
                  <div className="flex justify-end space-x-4">
                    <Link href="/">
                      <Button variant="secondary">Cancel</Button>
                    </Link>
                    <Button type="submit">Save</Button>
                  </div>
                </div>
              </form>
            )}
          </main>
        </div>
      </div>
      <Modal
        open={confirmModalOpen}
        title="Your edits have been saved"
        description="You have successfully edited your listing. You may now view it in your dashboard."
        cancelText={"Close"}
        onCancel={() => setConfirmModalOpen(false)}
        confirmText={"View Dashboard"}
        onConfirm={() => router.push("/")}
        onClose={() => setConfirmModalOpen(false)}
      />
    </>
  );
}
