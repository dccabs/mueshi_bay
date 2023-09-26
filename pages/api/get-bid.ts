import { NextApiRequest, NextApiResponse } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

const getBids = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createPagesServerClient({ req, res });
  const { id } = req.body;

  const { data, error } = await supabase
    .from("mueshi_bids")
    .select("*, listing_id(*)")
    .eq("id", id)
    .single();

  if (error) return res.status(401).json({ error: error.message });

  return res.status(200).json(data);
};

export default getBids;
