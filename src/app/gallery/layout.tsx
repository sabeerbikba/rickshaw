export default function Layout({
   children,
   modal,
}: Readonly<{
   children: React.ReactNode;
   modal: React.ReactNode;

}>) {
   console.log(modal);
   return (
      <>
         {children}
         {modal}
      </>
   );
}