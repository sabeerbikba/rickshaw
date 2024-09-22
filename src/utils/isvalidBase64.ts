const isValidBase64 = (base64String: string): boolean => {
   if (typeof base64String !== 'string') return false;

   const validMimeTypes = ['image/svg+xml', 'image/webp'];
   const base64PrefixMatch = base64String.match(/^data:(image\/[a-zA-Z]+);base64,/);
   if (!base64PrefixMatch) return false;

   const mimeType = base64PrefixMatch[1];
   if (!validMimeTypes.includes(mimeType)) return false;

   const base64Content = base64String.slice(base64PrefixMatch[0].length);
   const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/;
   return base64Regex.test(base64Content) && base64Content.length % 4 === 0;
};

export default isValidBase64;
