export const formatDate = (date: string) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    });
};
