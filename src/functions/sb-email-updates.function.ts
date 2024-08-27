import { supabase } from "@/supabaseClient";

export async function upsertReceiveUpdates(receiveUpdates: boolean) {
  const { data, error } = await supabase
    .from("munch_email_updates")
    .upsert({ receive_updates: receiveUpdates }, { onConflict: "auth_id" })
    .select();
  return { data, error };
}

export async function fetchReceiveUpdates(user: string) {
  const { data, error } = await supabase
    .from("munch_email_updates")
    .select("*")
    .eq("auth_id", user);

  if (error) {
    console.error(error);
  } else if (data) {
    const retData = data[0];
    return retData.receive_updates;
  } else return false;
}
