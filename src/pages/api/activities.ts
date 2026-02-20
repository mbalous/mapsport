import type { APIRoute } from 'astro';
import { fetchStravaActivities } from '../../lib/strava';

export const GET: APIRoute = async ({ request, cookies }) => {
    const token = cookies.get('strava_access_token')?.value;

    if (!token) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const perPage = parseInt(url.searchParams.get('per_page') || '30', 10);

    try {
        const activities = await fetchStravaActivities(token, page, perPage);
        return new Response(JSON.stringify(activities), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
};
