import React, { useEffect, useState } from "react";

export default function Splash({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-primary">
        <h1 className="text-4xl font-bold animate-pulse">Doxxie</h1>
      </div>
    );
  }

  return children;
}
