"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

/** Pass a `key` (e.g. a bump counter) to re-fetch when it changes. */
export function useApi<T = any>(path: string, key?: any) {
  const [data, set] = useState<T | null>(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api(path)
      .then(d => { set(d); setErr(""); })
      .catch(e => setErr(e.message))
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, key]);

  return { data, err, loading };
}
