const transformText = (text: string): string => {
   // if (typeof text === 'number') return text.toString();
   if (typeof text == undefined) return ""; // TODO: need to check this function is used and then better to use this text or not 
   return text.replace(/-\d+$/, '').split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
};

export default transformText;