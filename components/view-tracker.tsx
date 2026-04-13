"use client";

import { useEffect } from "react";

type ViewTrackerProps = {
  schemeId: number;
};

export function ViewTracker({ schemeId }: ViewTrackerProps) {
  useEffect(() => {
    void fetch(`/api/schemes/${schemeId}/view`, {
      method: "POST",
      cache: "no-store",
    });
  }, [schemeId]);

  return null;
}
