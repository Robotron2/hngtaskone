const express = require("express")
const app = express()

function getCurrentUTCWithinWindow() {
	const now = new Date()
	const currentUTC = new Date(now.getTime() + now.getTimezoneOffset() * 60000) // Convert to UTC

	// Calculate a random number between -2 and 2
	const randomMinutes = Math.floor(Math.random() * 5) - 2

	// Add the random number of minutes to the current UTC time
	currentUTC.setMinutes(currentUTC.getMinutes() + randomMinutes)

	return currentUTC.toISOString()
}

// Call the function to get the current UTC time within a +/-2 minute window

// Define a route that handles GET requests
app.get("/api", (req, res) => {
	try {
		// Get the query parameters
		const { slack_name, track } = req.query
		if (!slack_name || !track) {
			return res.status(400).json({ error: "Both Slack name and Track is required" })
		}

		// // Calculate current UTC time
		const utcTime = getCurrentUTCWithinWindow()

		const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

		// Create a new Date object to get the current day of the week
		const currentDate = new Date()

		const currentDayIndex = currentDate.getDay()

		// Use the current day index to retrieve the full day name from the array
		const currentDayOfWeek = daysOfWeek[currentDayIndex]

		res.status(200).json({
			slack_name: slack_name,
			current_day: currentDayOfWeek,
			utc_time: utcTime,
			track: track,
			github_file_url: "https://github.com/Robotron2/hngtaskone/blob/main/app.js",
			github_repo_url: "https://github.com/Robotron2/hngtaskone",
			status: 200
		})
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" })
	}
})

// Start the Express server
const port = process.env.PORT || 8080
app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
