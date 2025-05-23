export const checkFrequency = (status, remainingDays, frequency) => {
  if (isNaN(remainingDays)) return false;
  if (status === "Expired" || status === "Inactive" || remainingDays <= 0)
    return false;

  const annualFrequencies = [
    "Annual",
    "Semi Annual",
    "2 Years",
    "3 Years",
    "4 Years",
    "5 Years",
  ];

  // if (frequency === "Others") {
  //   console.log("===================================");
  //   console.log("Frequency:", frequency);
  //   console.log("Remaining Days:", remainingDays);
  //   console.log("Status:", status);
  //   console.log("If days less than 15:", remainingDays <= 15);
  //   console.log("===================================");
  // }
  
  return (
    ((status === "Active" || status === "On Process") &&
      remainingDays <= 15 &&
      frequency === "Monthly") ||
    (remainingDays <= 90 && annualFrequencies.includes(frequency)) ||
    (remainingDays <= 30 && frequency === "Quarterly") ||
    (remainingDays <= 15 && frequency === "Others") ||
    (remainingDays <= 180 && frequency === "10 Years")
  );
};
