
export async function createMessage(title:string, description:string, startupId:number){
    const response = await fetch('/api/milestone', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            description: description,
            startupId: startupId
        })
    });

    if (!response.ok) {
        throw new Error('Failed to create message');
    }

    const data: any = await response.json();
    return data;

}

export async function getMessages(startupId:number){
    const response = await fetch('/api/messages?id='+startupId, {
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
