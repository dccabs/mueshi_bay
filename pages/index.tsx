import { useState } from "react";
import MobileSidebar from "@/components/home/MobileSidebar";
import DesktopSidebar from "@/components/home/DesktopSidebar";
import SearchHeader from "@/components/home/SearchHeader";
import SecondaryNavigation from "@/components/home/SecondaryNavigation";
import Heading from "@/components/home/Heading";
import Stats from "@/components/home/Stats";
import ActiveListings from "@/components/home/ActiveListings";
import LatestBids from "@/components/home/LatestBids";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const stats = [
    { name: "Number of Active Listings", value: "24" },
    { name: "Current Bids", value: "15" },
    { name: "Today's Sales", value: "$300.23" },
    { name: "LifeTime Sales", value: "$12,000.44" },
  ];

  return (
    <>
      <div>
        <MobileSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <DesktopSidebar />

        <div className="xl:pl-72">
          <SearchHeader setSidebarOpen={setSidebarOpen} />
          <main>
            <header>
              {/*<SecondaryNavigation />*/}
              <Heading name="Your Listings" />
              <Stats stats={stats} />
            </header>
            <div className="">
              <ActiveListings />
              <LatestBids />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
