// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const handleResponse = (req, res, data) => {
  res.status(200).json(data)
}

export default function handler(req, res) {
  const data = { name: 'John Doe' }
  handleResponse(req, res, data)
}

// Note refactoring: This refactors the code by extracting the logic for handling the response into a separate function, handleResponse, which takes in the req, res, and data as arguments. The handler function then calls this function and passes in the appropriate arguments.
// This allows for better separation of concerns and makes it easier to test the different parts of the code.The handleResponse can be tested without having to call the http request.
// It also allows for flexibility to change the response handling in the future without having to change the main handler function.