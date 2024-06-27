export default function transformText(text: string): string {
   return text.replace(/-\d+$/, '').split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}