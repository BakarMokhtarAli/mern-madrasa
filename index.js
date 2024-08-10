import app from "./app.js";

import Student from "./backend/models/student.js";
import cron from "node-cron";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`app runing on port ${PORT}`);
});

// Function to update balance
const updateMonthlyBalances = async () => {
  try {
    const result = await Student.updateMany({}, { $inc: { balance: -30 } });

    console.log(`students balance updated`);
  } catch (error) {
    console.error("Error updating balances:", error.message);
  }
};

// // Schedule the job to run on the 1st of every month at midnight
// cron.schedule('0 0 1 * *', updateMonthlyBalances);

// schedule the job to run every sunday at midnight

cron.schedule("0 0 1 * * 0", updateMonthlyBalances);
