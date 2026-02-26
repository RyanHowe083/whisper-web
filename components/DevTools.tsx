"use client";

import DevBanner from "./DevBanner";
import DevIdentityPanel from "./DevIdentityPanel";

export default function DevTools() {
  if (process.env.NODE_ENV !== "development") return null;
  return (
    <>
      <DevBanner />
      <DevIdentityPanel />
    </>
  );
}

