# TIP Calculator Task

Used React and Tailwind CSS for the frontend.

- Created a endpoint "/calculate-tip" whicbh recieves the billAmount, and tipPercentage from the frontend as request and the TipAmount calculated will be sent as response to the frontend. status200 for success and status 401 for errors like Tip percentage being more than 100% or etc

- Structured the frontend part to check for response's status code and used a dependency called "react-hot-toast" to alert user on the scenario of errors and on succesfully retrieving the response from backend.
