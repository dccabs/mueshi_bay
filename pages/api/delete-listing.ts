import { NextApiRequest, NextApiResponse } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

const getBids = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;
  const supabase = createPagesServerClient({ req, res });

  const { data: bidsData, error: bidsError } = await supabase
    .from("mueshi_bids")
    .delete()
    .eq("listing_id", id)
    .select("*");

  if (bidsError) return res.status(401).json({ error: error.message });

  const { data, error } = await supabase
    .from("mueshi_listings")
    .delete()
    .eq("id", id)
    .select("*");

  if (error) return res.status(401).json({ error: error.message });

  return res.status(200).json(data[0]);
};

export default getBids;
