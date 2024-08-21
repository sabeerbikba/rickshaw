const headersToObject = (headers: Headers) => {
   const headersObj: { [key: string]: string } = {};
   headers.forEach((value, key) => {
      headersObj[key] = value;
   });
   return headersObj;
};

export { headersToObject };         