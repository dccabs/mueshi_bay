import { NextApiRequest, NextApiResponse } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

const getListins = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createPagesServerClient({ req, res });

  const { data, error } = await supabase.from("mueshi_listings").select("*");

  if (error) return res.status(401).json({ error: error.message });
  return res.status(200).json(data);
};

export default getListins;
