const express = require("express")
const moment = require("moment")
const app = express()

// Define a route that handles GET requests
app.get("/api", (req, res) => {
	try {
		// Get the query parameters
		const { slack_name, track } = req.query
		if (!slack_name || !track) {
			return res.status(400).json({ error: "Both Slack name and Track is required" })
		}

		// // Calculate current UTC time
		let now = moment().utc().format("YYYY-MM-DDTHH:mm:ss") + "Z"

		const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

		// Create a new Date object to get the current day of the week
		const currentDate = new Date()

		const currentDayIndex = currentDate.getDay()

		// Use the current day index to retrieve the full day name from the array
		const currentDayOfWeek = daysOfWeek[currentDayIndex]

		res.status(200).json({
			slack_name: slack_name,
			current_day: currentDayOfWeek,
			utc_time: now,
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
