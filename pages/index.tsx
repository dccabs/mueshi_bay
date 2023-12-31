import { useState } from "react";
import MobileSidebar from "@/components/home/MobileSidebar";
import DesktopSidebar from "@/components/home/DesktopSidebar";
import SearchHeader from "@/components/home/SearchHeader";
import SecondaryNavigation from "@/components/home/SecondaryNavigation";
import Heading from "@/components/home/Heading";
import Stats from "@/components/home/Stats";
import ActiveListings from "@/components/home/ActiveListings";
import LatestBids from "@/components/home/LatestBids";
import { useStats } from "@/hooks/useStats";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const statsData = useStats();

  const stats = !statsData.loading
    ? [
        {
          name: "Number of Active Listings",
          value: statsData?.data?.activeListings,
        },
        { name: "Current Bids", value: statsData?.data?.bids },
        { name: "Today's Sales", value: `$${statsData?.data?.todaysSales}` },
        { name: "LifeTime Sales", value: `$${statsData?.data?.lifetimeSales}` },
      ]
    : [];

  const searchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div>
        <MobileSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <DesktopSidebar />

        <div className="xl:pl-72">
          <SearchHeader
            searchQueryChange={searchQueryChange}
            setSidebarOpen={setSidebarOpen}
          />
          <main>
            <header>
              {/*<SecondaryNavigation />*/}
              <Heading name="Your Listings" />
              <Stats stats={stats} />
            </header>
            <div className="">
              <ActiveListings searchQuery={searchQuery} />
              <LatestBids searchQuery={searchQuery} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
