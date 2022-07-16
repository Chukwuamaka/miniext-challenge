export const getRequest = (url: string) => {
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}`,
      }
    });
};