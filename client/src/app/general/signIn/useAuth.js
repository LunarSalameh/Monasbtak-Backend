import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
//import jwtDecode from 'jwt-decode'; // Ensure this is the correct import
import { jwtDecode } from 'jwt-decode';

export default function useAuth( ) {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const urlId = searchParams.get('id'); // Get the ID from the URL

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            // router.push(redirectTo); // Redirect if no token found
            return;
        }

        try {
            // Decode the JWT token
            const decoded = jwtDecode(token);
            setUser(decoded);

            // Check if the logged-in user's ID matches the URL ID
            if (urlId && decoded.userId.toString() !== urlId) {
                router.push('/unauthorized'); // Redirect to an unauthorized page
            }
        } catch (error) {
            console.error('Invalid token:', error);
            localStorage.removeItem('token');
            router.push(redirectTo);
        }
    }, [router, urlId]);

    return user;
}