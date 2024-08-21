// TODO: give better name for this file
// TODO: is this file really needed

const transformText = (text: string): string => {
   // if (typeof text === 'number') return text.toString();
   if (text === undefined) "Not Defined yet!!"; // TODO: need to check this function is used and then better to use this text or not 
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

const formatBytes = (bytes: number): string => {
   if (bytes === 0) return '0 Bytes';
   const k = 1024;
   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   const i = Math.floor(Math.log(bytes) / Math.log(k));
   return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export { transformText, matchesUrl, formatBytes };