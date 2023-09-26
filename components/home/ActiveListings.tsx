import { useListings } from "@/hooks/useListings";
import Tabs from "@/components/Tabs";
import Button from "@/components/ui/Button";
import Link from "next/link";
import classNames from "classnames";

const tabs = [
  { name: "Today", href: "#", current: true },
  { name: "Last 7 Days", href: "#", current: false },
  { name: "All Time", href: "#", current: false },
];

export default function ActiveListings() {
  const listings = useListings();
  return (
    <>
      <div className="border-t border-white/10 pt-11">
        <div className="flex justify-between pr-16">
          <h2 className="px-4 text-base font-semibold leading-7 text-white sm:px-6 lg:px-8">
            Active Listings
          </h2>
          <Link href={`/add`}>
            <Button>Create New Listing</Button>
          </Link>
        </div>
        <Tabs tabs={tabs} />
        {listings.loading ? (
          <div>loading...</div>
        ) : (
          <table className="mt-6 w-full whitespace-nowrap text-left">
            <colgroup>
              <col className="lg:w-2/12" />
              <col className="lg:w-2/12" />
              <col className="lg:w-2/12" />
              <col className="lg:w-1/12" />
              <col className="lg:w-1/12" />
              <col className="lg:w-1/12" />
            </colgroup>
            <thead className="border-b border-white/10 text-sm leading-6 text-white">
              <tr>
                <th
                  scope="col"
                  className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell"
                >
                  Highest Bid
                </th>
                <th
                  scope="col"
                  className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20"
                >
                  Bids
                </th>
                <th
                  scope="col"
                  className="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {listings.data.map((listing) => {
                const statusClasses = classNames({
                  "hidden py-4 pl-0 pr-4 text-right text-sm leading-6 sm:table-cell sm:pr-6 lg:pr-8 capitalize":
                    true,
                  "text-green-400": listing.status === "active",
                  "text-red-400": listing.status === "sold",
                  "text-gray-400": listing.status === "inactive",
                });
                return (
                  <tr key={listing.id}>
                    <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                      <div className="flex items-center gap-x-4">
                        <div className="truncate text-sm font-medium leading-6 text-white">
                          {listing.name}
                        </div>
                      </div>
                    </td>
                    <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                      <div className="flex gap-x-3">
                        {listing?.highestBid?.bid_price ? (
                          <div className="font-mono text-sm leading-6 text-green-400">
                            ${listing?.highestBid?.bid_price}
                          </div>
                        ) : (
                          <div className="font-mono text-sm leading-6 text-red-400">
                            No Bids
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                      <div className="hidden text-white sm:block">
                        {listing.bids.length}
                      </div>
                    </td>
                    <td className={statusClasses}>
                      <div className="flex justify-end items-center">
                        <div className="h-2 w-2 rounded-full bg-current mr-2" />
                        <div className="space-x-2">
                          <span>{listing.status}</span>
                          {listing?.sale_date && (
                            <span>{listing.sale_date}</span>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
