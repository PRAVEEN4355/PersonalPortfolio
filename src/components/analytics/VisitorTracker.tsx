"use client";

import { useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

export function VisitorTracker() {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    const trackVisit = async () => {
      // Don't track if we don't have supabase keys
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;

      try {
        let country = "Unknown";
        let city = "Unknown";
        
        // Try to fetch location data anonymously
        try {
          const res = await fetch("https://ipapi.co/json/");
          if (res.ok) {
            const data = await res.json();
            country = data.country_name || "Unknown";
            city = data.city || "Unknown";
          }
        } catch (e) {
          console.error("Location fetch failed");
        }

        const viewData = {
          pathname: window.location.pathname,
          referrer: document.referrer || "Direct",
          user_agent: navigator.userAgent,
          country: country,
          city: city,
          viewed_at: new Date().toISOString()
        };

        const { error } = await supabase
          .from("page_views")
          .insert([viewData]);

        if (error) {
          console.error("Error logging visit:", error);
        }
      } catch (err) {
        console.error("Tracking error:", err);
      }
    };

    // Delay tracking slightly to prioritize page load performance
    setTimeout(trackVisit, 2000);
  }, []);

  return null; // This is a hidden tracking component
}
