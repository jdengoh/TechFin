interface SentimentInfo {
  label: string;
  badgeClasses: string;
}

export function getSentimentInfo(score: number): SentimentInfo {
  if (score <= -0.35) {
    return {
      label: "Bearish",
      badgeClasses:
        "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
    };
  }
  if (score <= -0.15) {
    return {
      label: "Somewhat-Bearish",
      badgeClasses:
        "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
    };
  }
  if (score < 0.15) {
    return {
      label: "Neutral",
      badgeClasses:
        "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
    };
  }
  if (score < 0.35) {
    return {
      label: "Somewhat-Bullish",
      badgeClasses:
        "bg-lime-100 text-lime-700 dark:bg-lime-950 dark:text-lime-300",
    };
  }
  return {
    label: "Bullish",
    badgeClasses:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  };
}
