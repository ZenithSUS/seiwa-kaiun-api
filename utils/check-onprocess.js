export const isProcess = (status, expirationDate, onProcessedDate, frequency) => {
  if (status !== "On Process" || frequency === "Monthly") return true;

  if(!onProcessedDate || onProcessedDate === null || onProcessedDate === "") return false

  const today = new Date();
  const expiration = new Date(expirationDate);

  const remainingDays = Math.ceil(
    Math.floor((expiration - today)) / (1000 * 60 * 60 * 24)
  );

  // console.log("===========================")
  // console.log("Frequency:", frequency)
  // console.log("Remaining Days:", remainingDays)
  // console.log("If days less than 30 and Onprocess:", remainingDays <= 30 && status === "On Process")
  // console.log("===========================")

  return remainingDays <= 30 && status === "On Process";
};
