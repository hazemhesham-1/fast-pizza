import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

async function getAddress({ latitude, longitude }) {
    const res = await fetch(`${API_URL}?latitude=${latitude}&longitude=${longitude}`);
    if(!res.ok) throw new Error("Failed to get address from position");
    const json = await res.json();
    return json;
}

async function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

export const fetchAddress = createAsyncThunk("user/fetchAddress", async () => {
    const positionObj = await getPosition();
    const position = {
        latitude : positionObj.coords.latitude,
        longitude : positionObj.coords.longitude,
    }
    const addressObj = await getAddress(position.latitude, position.longitude);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;
    return { position, address };
});

const initialState = {
    username: "",
    status: "idle",
    position: {},
    address: "",
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateName(state, action) {
            state.username = action.payload;
        },
    },
    extraReducers: (builder) =>
        builder.addCase(fetchAddress.pending, (state, action) => { state.status = "loading" })
        .addCase(fetchAddress.fulfilled, (state, action) => {
            state.status = "idle"
            state.position = action.payload.position;
            state.address = action.payload.address;
        })
        .addCase(fetchAddress.rejected, (state, action) => {
            state.status = "error";
            state.error = "There was a problem getting your address 😞!";
        }),
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;

export const getUsername = (state) => state.user.username;

export const getFullAddress = (state) => state.user.address;