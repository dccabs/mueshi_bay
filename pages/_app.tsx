import { useState } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionContextProvider>
  );
}
