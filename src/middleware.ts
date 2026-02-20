import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (_context, next) => {
    const response = await next();

    // The response could be a Response object or a promise depending on how Astro handles it internally.
    // Astro's `next()` usually returns a Promise<Response>.
    const headers = new Headers(response.headers);

    // Prevent MIME type sniffing
    headers.set('X-Content-Type-Options', 'nosniff');

    // Protect against Clickjacking
    headers.set('X-Frame-Options', 'DENY');

    // Control referrer information
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Enforce HTTPS
    if (process.env.NODE_ENV === 'production') {
        headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    }

    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
    });
});
