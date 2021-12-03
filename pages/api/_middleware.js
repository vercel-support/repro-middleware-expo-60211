export default async function middleware(request, event) {
  return new Response('Hi dan', {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control':
        'public, s-maxage=3600, maxage=3600, stale-while-revalidate',
    },
  });
}
