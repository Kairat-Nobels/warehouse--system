const timeToDate = (time: string | Date | null | undefined): Date | null => {
  if (!time) return null;

  if (time instanceof Date) return time;

  if (typeof time === "string" && time.includes(":")) {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  return null;
};

export const calculatePrice = (
  pricePerHour: number | undefined,
  rawStartTime: Date | string | null | undefined,
  rawEndTime: Date | string | null | undefined
): number => {
  const startTime = timeToDate(rawStartTime);
  const endTime = timeToDate(rawEndTime);

  if (!startTime || !endTime || !pricePerHour) return 0;

  const durationInMinutes = (endTime.getTime() - startTime.getTime()) / 60000;
  const durationInHours = durationInMinutes / 60;

  return pricePerHour * Number(durationInHours.toFixed(1));
};
