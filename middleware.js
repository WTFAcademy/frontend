import { geolocation } from '@vercel/edge';

const BLOCKED_COUNTRY = ['CN','TW'];

export const config = {
  // Only run the middleware on the home route
  matcher: '/',
};

export default function middleware(request) {
  const url = new URL(request.url);

  const { country } = geolocation(request);
  // You can also get the country using dot notation on the function
  // const country = geolocation(request).country;

  if (BLOCKED_COUNTRY.includes(country)) {
    url.pathname = '/zh';
  } else {
    url.pathname = '/index.html';
  }

  // Return a new redirect response
  return Response.redirect(url);
}
