import { useState } from "react";
import MobileSidebar from "@/components/home/MobileSidebar";
import DesktopSidebar from "@/components/home/DesktopSidebar";
import Heading from "@/components/home/Heading";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/select";
import Button from "@/components/ui/Button";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { useAddListing } from "@/hooks/useAddListing";

export default function Add() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    status: "inactive",
  });
  const router = useRouter();
  const addListingMutation = useAddListing();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log("submitting");
    e.preventDefault();
    const newListing = {
      name: formData.name,
      status: formData.status, // or any other status you have
    };

    addListingMutation.mutate(
      { newListing },
      {
        onSuccess: () => {
          console.log("Listing added successfully");
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
                <Button onClick={() => router.push("/")}>
                  <span className="flex space-x-2 items-center">
                    <ArrowLeftIcon className="h-6 w-6" />{" "}
                    <span>Back To Dashboard</span>
                  </span>
                </Button>
              </nav>
              <Heading name="Add a New Listing" />
            </header>
            <form onSubmit={handleSubmit}>
              <div className="sm:px-6 lg:px-8 max-w-lg space-y-6">
                <Input
                  onChange={handleChange}
                  type="text"
                  name="name"
                  label="Listing Name"
                  placeholder="Ie. Brand New Samsung TV"
                />
                <Select
                  label="Status"
                  name="status"
                  options={[
                    { label: "Inactive", value: "inactive" },
                    { label: "Active", value: "active" },
                    { label: "Sold", value: "sold" },
                  ]}
                  onChange={handleChange}
                />
                <div className="flex justify-end space-x-4">
                  <Button
                    onClick={() => {
                      router.push("/");
                    }}
                    variant="secondary"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={!formData.name}>
                    Save
                  </Button>
                </div>
              </div>
            </form>
          </main>
        </div>
      </div>
    </>
  );
}
