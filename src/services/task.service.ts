export async function createTask(name:string, startupId:number){
    const response = await fetch('/api/task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            startupId: startupId
        })
    });

    if (!response.ok) {
        throw new Error('Failed to create message');
    }

    const data = await response.json();
    return data;

}

export async function getTasks(startupId:number){
    const response = await fetch('/api/task?id='+startupId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch events');
    }

    const data = await response.json();
    return data;
}
