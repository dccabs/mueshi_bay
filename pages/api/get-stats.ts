import { NextApiRequest, NextApiResponse } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { isWithinInterval, sub } from "date-fns";

const getListins = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createPagesServerClient({ req, res });

  const { count: listingCount, error: activeLisingsError } = await supabase
    .from("mueshi_listings")
    .select("*", { count: "exact", status: "active" });

  if (activeLisingsError)
    return res.status(401).json({ error: activeLisingsError.message });

  const { count: bidCount, error: bidCountError } = await supabase
    .from("mueshi_bids")
    .select("*", { count: "exact" });

  if (bidCountError)
    return res.status(401).json({ error: bidCountError.message });

  const { data: soldListings, error: soldListingsError } = await supabase
    .from("mueshi_listings")
    .select("*")
    .eq("status", "sold");

  if (soldListingsError)
    return res.status(401).json({ error: soldListingsError.message });

  const listIds = soldListings.map((listing) => listing.id);

  const { data: biddingData, error: biddingError } = await supabase
    .from("mueshi_bids")
    .select("*, listing_id(*)")
    .in("listing_id", listIds);

  if (biddingError)
    return res.status(401).json({ error: biddingError.message });

  soldListings.forEach((listing) => {
    const filteredData = biddingData.filter(
      (bid) => bid.listing_id.id === listing.id
    );

    const highestBid = filteredData.length
      ? filteredData.reduce((prev, current) =>
          Number(prev.bid_price) > Number(current.bid_price) ? prev : current
        )
      : null;

    listing.highestBid = highestBid;
    listing.bids = filteredData;
  });

  const lifetimeSales = soldListings.reduce(
    (prev, current) => prev + Number(current.price),
    0
  );

  const today = new Date();

  const todaysSales = soldListings.reduce((acc, current) => {
    const soldDate = new Date(current.sale_date);

    // Check if the sale_date is within the last 24 hours
    if (
      isWithinInterval(soldDate, {
        start: sub(today, { days: 1 }),
        end: today,
      })
    ) {
      if (current?.highestBid?.listing_id?.price) {
        return acc + Number(current.highestBid.listing_id.price);
      } else {
        return acc;
      }
    } else {
      return acc;
    }
  }, 0);

  const listingsData = {
    activeListings: listingCount,
    bids: bidCount,
    soldListings,
    lifetimeSales,
    todaysSales,
  };

  return res.status(200).json(listingsData);
};

export default getListins;
