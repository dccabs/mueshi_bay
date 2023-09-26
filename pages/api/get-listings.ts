import { NextApiRequest, NextApiResponse } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

const getListins = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createPagesServerClient({ req, res });

  const { data: listingsData, error: listingsError } = await supabase
    .from("mueshi_listings")
    .select("*");

  if (listingsError)
    return res.status(401).json({ error: listingsError.message });

  const listIds = listingsData.map((listing) => listing.id);

  const { data: biddingData, error: biddingError } = await supabase
    .from("mueshi_bids")
    .select("*, listing_id(*)")
    .in("listing_id", listIds);

  if (biddingError)
    return res.status(401).json({ error: biddingError.message });

  listingsData.forEach((listing) => {
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

  return res.status(200).json(listingsData);
};

export default getListins;
