import { useState } from "react";
import { useBids } from "@/hooks/useBids";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import classNames from "classnames";
import { useSelectBid } from "@/hooks/useSelectBid";

export default function LatestBids() {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);
  const bids = useBids();
  const selectBidMutation = useSelectBid();

  const handleAccept = () => {
    if (selectedBid) {
      const newListing: { id: number } = {
        id: selectedBid?.id, // or any other status you have
      };

      selectBidMutation.mutate(
        { newListing },
        {
          onSuccess: () => {
            setConfirmModalOpen(false);
          },
          onError: (error: any) => {
            console.log("Error deleting listing:", error);
          },
        }
      );
    }
  };

  return (
    <>
      <div className="border-t border-white/10 pt-11 bg-gray-800 mt-16">
        <h2 className="px-4 text-xl font-semibold leading-7 text-white sm:px-6 lg:px-8">
          Most Recent Bids
        </h2>
        {bids.loading ? (
          <div>loading...</div>
        ) : (
          <table className="mt-6 w-full whitespace-nowrap text-left">
            <colgroup>
              <col className="w-full sm:w-4/12" />
              <col className="lg:w-4/12" />
              <col className="lg:w-2/12" />
              <col className="lg:w-1/12" />
              <col className="lg:w-1/12" />
            </colgroup>
            <thead className="border-b border-white/10 text-sm leading-6 text-white">
              <tr>
                <th
                  scope="col"
                  className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
                >
                  User
                </th>
                <th
                  scope="col"
                  className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell"
                >
                  Listing
                </th>
                <th
                  scope="col"
                  className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20"
                >
                  Last Bid
                </th>
                <th
                  scope="col"
                  className="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {bids.data.map((bid) => {
                const priceClasses = classNames({
                  "text-green-500": bid.isHighestBid,
                  "text-gray-400": !bid.isHighestBid,
                });
                return (
                  <tr key={bid.id}>
                    <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                      <div className="flex items-center gap-x-4">
                        <div className="truncate text-sm font-medium leading-6 text-white">
                          {bid.name}
                        </div>
                        {bid.isHighestBid && (
                          <span className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-400/20">
                            Highest Bid
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                      <div className="flex gap-x-3">
                        <div className="font-mono text-sm leading-6 text-gray-400">
                          {bid.listing_id.name}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                      <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                        <div className={priceClasses}>${bid.bid_price}</div>
                      </div>
                    </td>
                    <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">
                      {bid.isHighestBid && (
                        <Button
                          onClick={() => {
                            setSelectedBid(bid);
                            setConfirmModalOpen(true);
                          }}
                        >
                          Accept Bid
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <Modal
        open={confirmModalOpen}
        variant="alert"
        title={`Are you sure you want to accept this bid?`}
        description="Once this bid is accepted you will no longer be able to reverse that decison."
        cancelText={"Cancel"}
        onCancel={() => {
          setConfirmModalOpen(false);
        }}
        confirmText={"Accept Bid"}
        onConfirm={handleAccept}
      />
    </>
  );
}
