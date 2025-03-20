export const checkFrequency = (status, remainingDays, frequency) => {
  if (isNaN(remainingDays)) return false;
  if (status === "Expired" || remainingDays <= 0) return false;

  const annualFrequencies = [
    "Annual",
    "Semi Annual",
    "2 Years",
    "3 Years",
    "4 Years",
    "5 Years",
  ];

  return (
    ((status === "Active" || status === "On Process") &&
      remainingDays <= 15 &&
      frequency === "Monthly") ||
    (remainingDays <= 90 && annualFrequencies.includes(frequency)) ||
    (remainingDays <= 30 && frequency === "Quarterly") ||
    (remainingDays <= 180 && frequency === "10 Years")
  );
};
