import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../api/config";

const fetchUserProfile = createAsyncThunk(
    "profile/fetchUserProfile",
    async () => {
        const response = await fetch(API_URL+"/profile/1");
        return response.json();
    }
)

export { fetchUserProfile };