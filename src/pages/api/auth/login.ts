import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
    const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID || import.meta.env.STRAVA_CLIENT_ID;
    const PUBLIC_SITE_URL = process.env.PUBLIC_SITE_URL || import.meta.env.PUBLIC_SITE_URL || 'http://localhost:4321';

    if (!STRAVA_CLIENT_ID) {
        return new Response('Strava client ID is not configured.', { status: 500 });
    }

    const redirectUri = `${PUBLIC_SITE_URL}/api/auth/callback`;
    const scope = 'read,read_all,activity:read_all';

    const authUrl = new URL('https://www.strava.com/oauth/authorize');
    authUrl.searchParams.append('client_id', STRAVA_CLIENT_ID);
    authUrl.searchParams.append('redirect_uri', redirectUri);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('scope', scope);
    authUrl.searchParams.append('approval_prompt', 'force'); // useful for development, can be auto for prod

    return Response.redirect(authUrl.toString(), 302);
};
