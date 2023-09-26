import { NextApiRequest, NextApiResponse } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

const getBids = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;
  const supabase = createPagesServerClient({ req, res });

  const { data: bidsData, error: bidsError } = await supabase
    .from("mueshi_bids")
    .select("*")
    .eq("id", id);

  if (bidsError) return res.status(401).json({ error: bidsError.message });

  const { data: listingData, error: listingError } = await supabase
    .from("mueshi_listings")
    .update({ status: "sold" })
    .eq("id", bidsData[0].listing_id)
    .select();

  if (listingError)
    return res.status(401).json({ error: listingError.message });

  return res.status(200).json(listingData[0]);
};

export default getBids;
