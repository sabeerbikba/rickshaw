// "use client";
// import { ReactNode } from "react";
// import { usePathname } from "next/navigation";

// export default function NavLink({ url, children }: { url: string, children: ReactNode }) {
//    const pathname = usePathname();
//    return (
//       <>
//          {pathname === url && (
//             { children }
//          )}
//       </>
//    )
// }


"use client";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface NavLinkProps {
   urls: string[];
   children: ReactNode;
}

export default function NavLink({ urls, children }: NavLinkProps) {
   const pathname = usePathname();
   return (
      <>
         {urls.includes(pathname) && children}
      </>
   );
}
