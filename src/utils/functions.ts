// This file contains re-used functions.

const transformText = (text: string): string => {
   return text.replace(/-\d+$/, '').split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}

const matchesUrl = (pathname: string, urlPattern: string): boolean => {
   if (urlPattern === pathname) return true;
   if (urlPattern.endsWith('/*')) {
      const basePattern = urlPattern.slice(0, -1);
      return pathname.startsWith(basePattern);
   }
   return false;
}

export { transformText, matchesUrl };