const transformText = (text: string): string => {
   if (typeof text == undefined) return "";
   return text.replace(/-\d+$/, '').split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
};

export default transformText;