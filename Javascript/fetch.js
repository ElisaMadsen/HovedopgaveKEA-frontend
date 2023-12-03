async function getResponse(url,method,body) {
    const response = await fetch(
        url,
        {
            method: method,
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: body
        }
    );
    const data = await response.json(); // Extracting data as a JSON Object from the response
    
    return data;

}