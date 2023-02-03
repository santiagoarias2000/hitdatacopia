export const getLocalDate = (date: Date | string) => {
    const dateList = new Date(date);
    return dateList.toLocaleDateString();
  };