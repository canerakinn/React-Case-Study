export const calculateDaysDiff = (
  mailReceivedDate: string,
  solutionSentDate: string | undefined,
  today: Date
): number => {
  const startDate = new Date(mailReceivedDate);
  const endDate = solutionSentDate ? new Date(solutionSentDate) : today;
  return Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
};
