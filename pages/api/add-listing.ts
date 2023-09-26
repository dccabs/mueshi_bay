import { NextApiRequest, NextApiResponse } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

const getBids = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, status } = req.body;
  const supabase = createPagesServerClient({ req, res });

  const { data, error } = await supabase
    .from("mueshi_listings")
    .insert([{ name, status }])
    .select("*");

  if (error) return res.status(401).json({ error: error.message });

  return res.status(200).json(data[0]);
};

export default getBids;
