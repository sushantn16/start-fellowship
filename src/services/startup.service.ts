interface Startup {
    name: string;
    website: string;
    founder: string;
    description: string;
    city: string;
    country: string;
    stage: string;
}

export async function createStartup(
    name: string,
    website: string,
    founder: string,
    description: string,
    city: string,
    country: string,
    stage: string,
  ): Promise<Startup> {
    const response = await fetch('/api/startup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, website, founder, description, city, country, stage })
    });

    if (!response.ok) {
        throw new Error('Failed to create startup');
    }

    const res: Startup = await response.json();
    return res;
}

export async function getStartup(): Promise<Startup[]> {
    const response = await fetch('/api/startup', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch statups');
    }

    const data: Startup[] = await response.json();
    return data;
}