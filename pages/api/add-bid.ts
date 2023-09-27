import { NextApiRequest, NextApiResponse } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

const getBids = async (req: NextApiRequest, res: NextApiResponse) => {
  const { listing, bid } = req.body;
  const supabase = createPagesServerClient({ req, res });

  const { data, error } = await supabase
    .from("mueshi_bids")
    .insert([
      {
        name: "Anonymous User",
        bid_price: bid,
        listing_id: Number(listing),
      },
    ])
    .select("*");

  if (error) return res.status(401).json({ error: error.message });

  return res.status(200).json(data[0]);
};

export default getBids;
