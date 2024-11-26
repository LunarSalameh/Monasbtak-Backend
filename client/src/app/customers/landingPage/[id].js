import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const LandingPage = () => {
    const router = useRouter();
    const { id } = router.query; // Extract user ID from the URL
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost/backend2/profile.php?id=${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setUserData(data); // Set the user data to state
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }, [id]);

    if (!id || !userData) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Welcome, {userData.name}</h1>
            <p>Email: {userData.email}</p>
        </div>
    );
};

export default LandingPage;
