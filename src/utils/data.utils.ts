export const formatDate = (date: any): string => {
	return new Date(date).toISOString().split("T")[0];
};