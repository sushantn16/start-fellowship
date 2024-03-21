export async function createFile(file: File | null, startupId: number) {

    if(file){
        const formData = new FormData();
        formData.append("file", file);
        formData.append("startupId", startupId.toString());
    
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });
    
        if (!response.ok) {
            throw new Error('Failed to create message');
        }
    
        const data = await response.json();
        return data;
    }

}

export async function getFiles(startupId: number) {
    const response = await fetch('/api/upload?id=' + startupId, {
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
