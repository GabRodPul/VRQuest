const apiCall = {
    getData: async (url: string = "", body: Object = {}) => {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(body)
        })

        return response.json();
    },

    postData: async (url: string = "", data: Object = {}) => {

    },
}

export { apiCall };