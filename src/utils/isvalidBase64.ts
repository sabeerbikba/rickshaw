const isValidBase64 = (base64String: string) => {
   const base64Prefix = 'data:image/svg+xml;base64,';
   if (base64String == undefined) return false;
   if (!base64String.startsWith(base64Prefix || '')) // if undefined used empty string
      return false;

   const base64Content = base64String.slice(base64Prefix.length);
   const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/;
   return base64Regex.test(base64Content) && base64Content.length % 4 === 0;
};

export default isValidBase64;
