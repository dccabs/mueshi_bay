import { NextApiRequest, NextApiResponse } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

const getBids = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createPagesServerClient({ req, res });

  const { data, error } = await supabase
    .from("mueshi_bids")
    .select("*, listing_id(*)");

  if (error) return res.status(401).json({ error: error.message });

  if (!data || !Array.isArray(data)) return res.status(200).json([]);

  // Group bids by their listing_id
  const groupedBids: { [key: number]: any[] } = {};
  data.forEach((bid) => {
    if (!groupedBids[bid.listing_id.id]) {
      groupedBids[bid.listing_id.id] = [];
    }
    groupedBids[bid.listing_id.id].push(bid);
  });

  // Determine the highest bid for each listing and mark them accordingly
  const enhancedData = data.map((bid) => {
    const bidsForThisListing = groupedBids[bid.listing_id.id];
    const highestBid = Math.max(
      ...bidsForThisListing.map((b) => parseFloat(b.bid_price))
    );
    return {
      ...bid,
      isHighestBid: parseFloat(bid.bid_price) === highestBid,
    };
  });

  return res.status(200).json(enhancedData);
};

export default getBids;
