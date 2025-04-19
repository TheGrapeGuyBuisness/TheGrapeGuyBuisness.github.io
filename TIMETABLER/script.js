// Request permission for notifications
if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

// Weekly timetable with specific times (e.g., Monday, etc.)
const timetable = {
  Monday: [
    { time: "07:00", message: "Wake up, hygiene" },
    { time: "07:15", message: "Meal prep + Breakfast: 3 boiled eggs, 1 slice wholegrain toast, banana, glass of milk" },
    { time: "08:00", message: "Leave for school" },
    { time: "10:00", message: "Snack: Apple + handful of nuts" },
    { time: "12:00", message: "Lunch: Chicken wrap with salad, fruit pot, water" },
    { time: "16:15", message: "Pre-workout snack: Peanut butter on rice cake + apple juice" },
    { time: "16:45", message: "Lane swim (Endurance): 1000m warm-up, 12x100m freestyle, 4x200m IM, 200m cool down" },
    { time: "18:15", message: "Post-swim dinner: Salmon fillet, brown rice, steamed veg, berries" },
    { time: "19:15", message: "Study Session: Maths & Computer Science (Pomodoro: 25/5x3)" },
    { time: "20:15", message: "Meal prep for Tues + snack: Cottage cheese, pear" },
    { time: "21:00", message: "Stretching, mindfulness 10 min" },
    { time: "21:30", message: "Sleep" }
  ],
  // You can add full timetable for other days here, e.g., Tuesday, Wednesday, etc.
};

// Function to send a notification
function sendNotification(message) {
  if (Notification.permission === "granted") {
    new Notification(message);
  }
}

// Function to check and send notifications based on current time
function checkSchedule() {
  const now = new Date();
  const dayOfWeek = now.toLocaleString("en-US", { weekday: "long" });
  const currentTime = now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0");

  // Check the timetable for today
  const todaySchedule = timetable[dayOfWeek];
  if (todaySchedule) {
    todaySchedule.forEach((entry) => {
      if (entry.time === currentTime) {
        sendNotification(entry.message);
      }
    });
  }
}

// Check the schedule every minute
setInterval(checkSchedule, 60000); // 60000 ms = 1 minute

// Test Button Event
const testButton = document.getElementById("testButton");
testButton.addEventListener("click", () => {
  const message = "This is a test notification!";
  sendNotification(message);
});
