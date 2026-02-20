export interface StravaActivity {
    id: number;
    name: string;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    total_elevation_gain: number;
    type: string;
    sport_type: string;
    start_date: string;
    start_date_local: string;
    timezone: string;
    utc_offset: number;
    location_city: string | null;
    location_state: string | null;
    location_country: string | null;
    achievement_count: number;
    kudos_count: number;
    comment_count: number;
    athlete_count: number;
    photo_count: number;
    map: {
        id: string;
        summary_polyline: string;
        resource_state: number;
    };
    manual: boolean;
    private: boolean;
    visibility: string;
    flagged: boolean;
    gear_id: string | null;
    start_latlng: [number, number];
    end_latlng: [number, number];
    average_speed: number;
    max_speed: number;
    average_cadence?: number;
    average_temp?: number;
    has_heartrate: boolean;
    average_heartrate?: number;
    max_heartrate?: number;
    elev_high?: number;
    elev_low?: number;
}

export async function fetchStravaActivities(
    accessToken: string,
    page: number = 1,
    perPage: number = 30
): Promise<StravaActivity[]> {
    const url = new URL('https://www.strava.com/api/v3/athlete/activities');
    url.searchParams.append('page', page.toString());
    url.searchParams.append('per_page', perPage.toString());

    const res = await fetch(url.toString(), {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!res.ok) {
        if (res.status === 401) {
            throw new Error('Strava authentication failed or token expired.');
        }
        throw new Error(`Failed to fetch activities: ${res.statusText}`);
    }

    const data = (await res.json()) as StravaActivity[];
    return data;
}

export interface StravaAthlete {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    profile: string; // URL to avatar
    profile_medium: string; // URL to medium avatar
}

export async function fetchStravaAthlete(accessToken: string): Promise<StravaAthlete> {
    const res = await fetch('https://www.strava.com/api/v3/athlete', {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (!res.ok) throw new Error('Failed to fetch athlete profile');
    return await res.json() as StravaAthlete;
}
