import { useEffect, useState, useMemo } from 'react';


const useDistrictUpazila = (districtId, upazilaId) => {
    // 1. State for Data Storage
    const [zilas, setZilas] = useState([]); 
    const [upazilas, setUpazilas] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);

    // 2. Data Fetching (Runs only once)
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Zila Data
                const zilaResponse = await fetch("/zilaData.json");
                const zilaData = await zilaResponse.json();
                
                // Fetch Upazila Data
                const upzilaResponse = await fetch("/upzilaData.json");
                const upzilaData = await upzilaResponse.json();

                setUpazilas(upzilaData);
                setZilas(zilaData);
            } catch (err) {
                console.error("Error fetching location data:", err);
                // Optionally handle error state here
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

   
    const zilaLookup = useMemo(() => {
        return zilas.reduce((acc, zila) => {
            acc[zila.id] = zila;
            return acc;
        }, {});
    }, [zilas]);

    const upazilaLookup = useMemo(() => {
        return upazilas.reduce((acc, upazila) => {
            acc[upazila.id] = upazila;
            return acc;
        }, {});
    }, [upazilas]);

    // 4. Perform Lookup based on input IDs
    // This calculation runs every time districtId or upazilaId changes (i.e., every row in your table)
    const districtName = useMemo(() => {
        if (isLoading) return 'Loading...';
        
        const district = zilaLookup[districtId];
        return district ? district.name : districtId || 'N/A';
    }, [districtId, zilaLookup, isLoading]);

    const upazilaName = useMemo(() => {
        if (isLoading) return 'Loading...';
        
        const upazila = upazilaLookup[upazilaId];
        return upazila ? upazila.name : upazilaId || 'N/A';
    }, [upazilaId, upazilaLookup, isLoading]);


    // 5. Return the calculated names and loading state
    return { 
        districtName, 
        upazilaName, 
        isLoading 
    };
};

export default useDistrictUpazila;