export const isProcess = (status, processedDate, frequency) => {
  if (status !== "On Process" || frequency === "Monthly") return true;

  if (processedDate === null || !processedDate) return false;

  const today = new Date();
  const processDateFormat = new Date(processedDate);

  const elapseDays = Math.ceil(
    Math.floor((today - processDateFormat)) / (1000 * 60 * 60 * 24)
  );

//   console.log("=======================================");
//   console.log("Elapsed Days:", elapseDays);
//   console.log("Status:", status);
//   console.log(
//     "If time elapsed:",
//     !(status === "On Process" && elapseDays <= 15)
//   );
//   console.log("=======================================");
  return !(status === "On Process" && elapseDays <= 15);
};
