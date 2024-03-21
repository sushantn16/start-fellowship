import { toast } from "sonner";
export async function login(email: string, password: string) {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }
    toast.success('Login Seccessful');
    const data = await response.json();

    return data;
}

export async function getUser() {
    const response = await fetch('/api/user', {
        method: 'GET'
    });

    if (!response.ok) {
        throw new Error('Getting User failed');
    }

    const data = await response.json();

    return data;
}

export async function register(name: string, email: string, password: string, role: string) {
    const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, role })
    });

    if (!response.ok) {
        throw new Error('Registration failed');
    }
    toast.success('Registered Seccessful');
    const data = await response.json();
    return data;
}

export async function logout() {
    const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Logout failed');
    }
    toast.success('Logout Seccessful');
}
