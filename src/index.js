import express from 'express'
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cors())
app.post('/calculate-tip', (req, res) => {
  console.log(req.body)
  const { billAmount, tipPercentage } = req.body
  if (billAmount <= 0 || tipPercentage < 0 || tipPercentage > 100) {
    return res.status(401).json({ error: 'Invalid Input Value' })
  }
  const tipAmount = billAmount * (tipPercentage / 100)
  const totalBill = billAmount + tipAmount
  res.status(200).json({ tipAmount, totalBill })
})

app.listen(3001, () => {
  console.log('Server is running on port 3001')
})
