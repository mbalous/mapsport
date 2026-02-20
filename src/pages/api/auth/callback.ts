import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request, cookies }) => {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');

    if (error) {
        return new Response(`Strava auth error: ${error}`, { status: 400 });
    }

    if (!code) {
        return new Response('No authorization code provided.', { status: 400 });
    }

    const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID || import.meta.env.STRAVA_CLIENT_ID;
    const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET || import.meta.env.STRAVA_CLIENT_SECRET;

    if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET) {
        return new Response('Strava credentials are not configured.', { status: 500 });
    }

    try {
        const response = await fetch('https://www.strava.com/oauth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: STRAVA_CLIENT_ID,
                client_secret: STRAVA_CLIENT_SECRET,
                code,
                grant_type: 'authorization_code'
            }),
        });

        if (!response.ok) {
            const errData = await response.text();
            return new Response(`Failed to exchange token: ${errData}`, { status: response.status });
        }

        const data = await response.json();

        // Store access token in cookie (httpOnly for security, but we need it readable for SSR if we want to fetch server side)
        // Actually we will fetch Strava activities server-side in Astro components, so httpOnly is best.
        cookies.set('strava_access_token', data.access_token, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: data.expires_in,
            sameSite: 'lax',
        });

        // Optionally save the refresh token as well, though for this app we might just force login when expired
        cookies.set('strava_refresh_token', data.refresh_token, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 30, // 30 days
            sameSite: 'lax',
        });

        // Redirect to home page
        return Response.redirect(new URL('/', url).toString(), 302);
    } catch (err) {
        return new Response('Internal Server Error while exchanging token', { status: 500 });
    }
};
