import { withAuth } from "next-auth/middleware";
export default withAuth({
  secret: process.env.NEXTAUTH_SECRET,
});
export const config = {
  matcher: ["/dashboard", "/products/:path*", "/new/:path*"],
};