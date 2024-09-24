const matchesUrl = (pathname: string, urlPattern: string): boolean => {
   if (urlPattern === pathname) return true;
   if (urlPattern.endsWith('/*')) {
      const basePattern = urlPattern.slice(0, -1);
      return pathname.startsWith(basePattern);
   }
   return false;
};

export default matchesUrl;