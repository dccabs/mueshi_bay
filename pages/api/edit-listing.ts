import { NextApiRequest, NextApiResponse } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

const getBids = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, name, status } = req.body;
  const supabase = createPagesServerClient({ req, res });

  const { data, error } = await supabase
    .from("mueshi_listings")
    .update({ name, status })
    .eq("id", req.body.id)
    .select("*");

  if (error) return res.status(401).json({ error: error.message });

  return res.status(200).json(data[0]);
};

export default getBids;
