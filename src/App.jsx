import React, { useState } from 'react'
import axios from 'axios'
import './App.css'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import { toast, Toaster } from 'react-hot-toast'
const TipCalculator = () => {
  const [billAmount, setBillAmount] = useState('')
  const [tipPercentage, setTipPercentage] = useState(0)
  const [tipAmount, setTipAmount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  const handleBillAmountChange = (e) => {
    setBillAmount(e.target.value)
  }

  const handleTipPercentageChange = (percentage) => {
    setTipPercentage(percentage)
  }

  const calculateTip = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/calculate-tip',
        {
          billAmount: Number(billAmount),
          tipPercentage: Number(tipPercentage),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (response.status === 200) {
        toast.success('Tip was successfully calculated')
      } else if (response.status === 401) {
        toast.error('Error ! Tip amount should not be greater than 100%')
      }
      const data = response.data
      setTipAmount(parseFloat(data.tipAmount).toFixed(2))
      setTotalAmount(parseFloat(data.totalBill).toFixed(2))
    } catch (error) {
      console.error(
        'Error:',
        error.response ? error.response.data : error.message
      )
      toast.error('Error: Tip Value Should be between 0 and 100')
    }
  }

  return (
    <>
      <Navbar />
      <Banner />

      <div className="flex flex-col  p-3 bg-blue-500 m-2 rounded-md h-screen">
        <Toaster />
        <h1 className="text-3xl font-bold bg-green-300 p-3 rounded-lg text-center mb-6">
          Tip Calculator
        </h1>
        <div className="wrapper flex flex-col">
          <div className="flex flex-col justify-between mb-4">
            <div>
              <label
                htmlFor="billAmount"
                className="mr-2  text-sm bg-black text-white p-3 rounded-lg font-bold"
              >
                Bill Amount:
              </label>
              <input
                type="number"
                id="billAmount"
                value={billAmount}
                onChange={handleBillAmountChange}
                className="p-2   border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex tips mb-4">
              <span className="mr-2  text-sm mt-5 bg-black text-white p-3 rounded-lg font-bold">
                Select Tip Percentage:
              </span>
              {[5, 10, 15, 20, 25, 105].map((percentage) => (
                <button
                  key={percentage}
                  onClick={() => handleTipPercentageChange(percentage)}
                  className={ `focus:bg-white focus:text-black tipbtn px-4 py-2 mt-6 h-16 w-32
                   mr-2 bg-yellow-500 text-white rounded hover:bg-yellow-8
                   00 focus:outline-none`}
                >
                  {percentage}%
                </button>
              ))}
            </div>
          </div>
          <div className="second">
            <button
              onClick={calculateTip}
              className="px-6 py-3 w-32 mx-auto mt-4 mb-4 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
            >
              Calculate
            </button>
            <div className="flex text-center flex-col ">
              <p className="mr-2   text-xl bg-black text-white p-3 rounded-lg font-bold">
                Tip Amount:{' '}
                <span className="text-sm   right-0 text-yellow-600">
                  ${tipAmount}
                </span>{' '}
              </p>
              <p className="mr-2  text-xl bg-black mt-3 text-white p-3 rounded-lg font-bold">
                Total Amount:{' '}
                <span className=" text-sm text-yellow-600">${totalAmount}</span>{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TipCalculator
