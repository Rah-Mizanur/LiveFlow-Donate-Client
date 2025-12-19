import { useEffect, useMemo, useState } from "react";

const useDistrictUpazila = (districtId, upazilaId) => {
  const [zilas, setZilas] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /* -------- Fetch once -------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const zilaRes = await fetch("/zilaData.json");
        const upazilaRes = await fetch("/upzilaData.json");

        setZilas(await zilaRes.json());
        setUpazilas(await upazilaRes.json());
      } catch (err) {
        console.error("Failed to load district data", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  /* -------- Filter Upazila for dropdown -------- */
  const filteredUpazilas = useMemo(() => {
    if (!districtId) return [];

    return upazilas.filter(
      (u) => String(u.district_id) === String(districtId)
    );
  }, [districtId, upazilas]);

  /* -------- Lookup names for display -------- */
  const districtName = useMemo(() => {
    if (!districtId) return "N/A";
    const d = zilas.find((z) => String(z.id) === String(districtId));
    return d?.name || "N/A";
  }, [districtId, zilas]);

  const upazilaName = useMemo(() => {
    if (!upazilaId) return "N/A";
    const u = upazilas.find((u) => String(u.id) === String(upazilaId));
    return u?.name || "N/A";
  }, [upazilaId, upazilas]);

  return {
    zilas,             // for district dropdown
    filteredUpazilas,  // for upazila dropdown
    districtName,      // for display
    upazilaName,       // for display
    isLoading,
  };
};

export default useDistrictUpazila;
