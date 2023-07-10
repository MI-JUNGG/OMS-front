export const datePlusHandler = () => {
    const formatDate = new Date(date);
    formatDate.setDate(formatDate.getDate() + 1);
    const year = formatDate.getFullYear();
    const month = String(formatDate.getMonth() + 1).padStart(2, "0");
    const day = String(formatDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setDate(formattedDate);
    const newLocation = `/day?date=${year}-${month}-${day}`;
    navigate(newLocation);
};

export const dateMinusHandler = () => {
    const formatDate = new Date(date);
    formatDate.setDate(formatDate.getDate() - 1);
    const year = formatDate.getFullYear();
    const month = String(formatDate.getMonth() + 1).padStart(2, "0");
    const day = String(formatDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setDate(formattedDate);
    const newLocation = `/day?date=${year}-${month}-${day}`;
    navigate(newLocation);
};
