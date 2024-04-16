try {
    // Fetch a random landscape sunset image from the specified API
    const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=sunset")
    const data = await res.json()

    // Set the retrieved image as the background of the document body
    document.body.style.backgroundImage = `url(${data.urls.regular})`

    // Display the author's name below the image
    document.getElementById("author").textContent = `By: ${data.user.name}`
} catch (err) {
    // In case of an error, use a fallback image and display a default author
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`
    document.getElementById("author").textContent = `By: Dodi Achmad`
}

try {
    // Fetch real-time data for the cryptocurrency "Dogecoin"
    const res = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin")

    // Check if the response is successful
    if (!res.ok) {
        throw Error("Something went wrong")
    }

    // Extract relevant data from the response
    const data = await res.json()

    // Display the coin's image and name
    document.getElementById("crypto-top").innerHTML = `
        <img src=${data.image.small} />
        <span>${data.name}</span>
    `

    // Display additional cryptocurrency information
    document.getElementById("crypto").innerHTML += `
        <p>🎯: $${data.market_data.current_price.usd}</p>
        <p>👆: $${data.market_data.high_24h.usd}</p>
        <p>👇: $${data.market_data.low_24h.usd}</p>
    `
} catch (err) {
    // Log any errors related to cryptocurrency data fetching
    console.error(err)
}

// Function to update the displayed time every second
function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", { timeStyle: "short" })
}

// Call the function initially and then every second
setInterval(getCurrentTime, 1000)

// Fetch weather data based on the user's geolocation
navigator.geolocation.getCurrentPosition(async position => {
    try {
        // Construct the weather API URL using latitude and longitude
        const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)

        // Check if weather data is available
        if (!res.ok) {
            throw Error("Weather data not available")
        }

        // Extract weather information from the response
        const data = await res.json()
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

        // Display weather icon
        document.getElementById("weather").innerHTML = `
            <img src=${iconUrl} />
            <p>${data.weather[0].description}</p>
        `
    } catch (err) {
        // Log any errors related to weather data fetching
        console.error(err)
    }
})

