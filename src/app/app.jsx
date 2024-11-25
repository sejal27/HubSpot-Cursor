import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Text,
  LoadingSpinner,
  hubspot,
} from "@hubspot/ui-extensions";

hubspot.extend(({ context, runServerlessFunction }) => {
  const QuoteCard = () => {
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchQuote = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://zenquotes.io/api/today");
        const data = await response.json();
        setQuote(data[0]);
      } catch (error) {
        console.error("Error fetching quote:", error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchQuote();
    }, []);

    if (loading) {
      return (
        <Card>
          <LoadingSpinner />
        </Card>
      );
    }

    return (
      <Card>
        {quote && (
          <>
            <Text format={{ fontWeight: "bold" }}>"{quote.q}"</Text>
            <Text>- {quote.a}</Text>
          </>
        )}
        <Button onClick={fetchQuote} variant="primary">
          Refresh Quote
        </Button>
      </Card>
    );
  };

  return <QuoteCard />;
});
