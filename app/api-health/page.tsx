"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api/client";

export default function ApiHealthPage() {
  const [status, setStatus] = useState<string>("loading");

  useEffect(() => {
    apiClient
      .get<{ status: string }>("/health")
      .then((data) => setStatus(data.status))
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div>
      <h1>API Health</h1>
      <p>Status: {status}</p>
    </div>
  );
}

