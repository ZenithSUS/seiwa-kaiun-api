export const isProcess = (status, processedDate, frequency) => {
    if (status !== "On Process" || frequency === "Monthly") return true

    const today = new Date();
    const processDateFormat = new Date(processedDate);

    const elapseDays = Math.ceil(
        (processDateFormat - today) / (1000 * 60 * 60 * 24)
      );

    return !(status === "On Process" && elapseDays <= 15)
    
}