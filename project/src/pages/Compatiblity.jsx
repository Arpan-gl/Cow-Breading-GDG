import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "../components/common/Select";
import Button from "../components/common/Button";
import { toast } from "react-toastify";

const CompatibilityTest = () => {
  const [cows, setCows] = useState([]);
  const [bulls, setBulls] = useState([]);
  const [selectedCow, setSelectedCow] = useState("");
  const [selectedBull, setSelectedBull] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    ;(async () => {
      try {
        const userResponse = await axios.get(
          "http://localhost:4200/api/owners/getOwnerDetsils"
        );
        setUser(userResponse.data.id);
      } catch (error) {
        console.error(error);
        toast.error("failed to fetch user");
      }
    })();

    const fetchAnimals = async () => {
      try {
        const cowsResponse = await axios.get(
          `http://localhost:4200/api/owners/${user}/cows`
        );
        const bullsResponse = await axios.get(
          `http://localhost:4200/api/owners/${user}/bulls`
        );
        setCows(cowsResponse.data);
        setBulls(bullsResponse.data);
      } catch (error) {
        console.error("Error fetching animals:", error);
        toast.error("Failed to fetch animals. Please try again.");
      }
    };

    if(user) fetchAnimals();
    else navigate("/signIn");
  }, [user]);

  const handleCompatibilityTest = () => {
    if (!selectedCow || !selectedBull) {
      toast.error("Please select both a cow and a bull.");
      return;
    }

    navigate(`/compatibility-details/${selectedCow}/${selectedBull}`);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Compatibility Test
      </h1>
      <div className="space-y-6">
        <Select
          label="Select Cow"
          options={cows.map((cow) => ({ value: cow._id, label: cow.name }))}
          value={selectedCow}
          onChange={(e) => setSelectedCow(e.target.value)}
        />
        <Select
          label="Select Bull"
          options={bulls.map((bull) => ({ value: bull._id, label: bull.name }))}
          value={selectedBull}
          onChange={(e) => setSelectedBull(e.target.value)}
        />
        <Button onClick={handleCompatibilityTest}>Check Compatibility</Button>
      </div>
    </div>
  );
};

export default CompatibilityTest;