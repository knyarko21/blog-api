
export const getToken = () => {

    return localStorage.getItem("token");

};


export const getUserFromToken = () => {

    const token = getToken();


    // ==========================================
    // NO TOKEN
    // ==========================================

    if (!token) {

        return null;

    }


    try {

        // ==========================================
        // JWT STRUCTURE
        // ==========================================
        //
        // header.payload.signature
        //
        // We need the payload.
        //

        const parts = token.split(".");

        const payload = parts[1];


        // ==========================================
        // DECODE PAYLOAD
        // ==========================================

        const decodedPayload = atob(payload);


        // ==========================================
        // CONVERT JSON STRING INTO JAVASCRIPT OBJECT
        // ==========================================

        const user = JSON.parse(decodedPayload);


        return user;

    } catch (error) {

        console.error(
            "Unable to decode token:",
            error
        );

        return null;

    }
};