const googleScriptURL = "https://script.google.com/macros/s/AKfycbxdahHC-6Kw0iPP7J-qK49WAV6wCWZRwpDJpxwXHg5HTkk8kdpsM1momkeMKM-P2YorWw/exec";

function showMessage(message, type) {
  const messageBox = document.getElementById("message");
  messageBox.textContent = message;
  messageBox.className = `message ${type}`;
  messageBox.style.display = "block";

  setTimeout(() => {
    messageBox.style.display = "none";
  }, 3000);
}

async function saveMileage() {
  const currentMileage = document.getElementById("currentMileage").value;
  const endMileage = document.getElementById("endMileage").value;
  const totalDistance = endMileage - currentMileage;

  if (!currentMileage || !endMileage || totalDistance < 0) {
    showMessage("Invalid mileage data. Please check your inputs.", "error");
    return;
  }

  const data = {
    type: "mileage",
    currentMileage: currentMileage,
    endMileage: endMileage,
    totalDistance: totalDistance,
  };

  try {
    const response = await fetch(googleScriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      showMessage(result.message, "success");
    } else {
      showMessage(result.error, "error");
    }
  } catch (error) {
    showMessage("Failed to save mileage record.", "error");
  }
}

async function saveOdometer() {
  const odometerReading = document.getElementById("odometerReading").value;
  const fuelAmount = document.getElementById("fuelAmount").value;
  const fuelPrice = document.getElementById("fuelPrice").value;

  if (!odometerReading || !fuelAmount || !fuelPrice) {
    showMessage("Invalid odometer data. Please check your inputs.", "error");
    return;
  }

  const data = {
    type: "odometer",
    odometerReading: odometerReading,
    fuelAmount: fuelAmount,
    fuelPrice: fuelPrice,
  };

  try {
    const response = await fetch(googleScriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      showMessage(result.message, "success");
    } else {
      showMessage(result.error, "error");
    }
  } catch (error) {
    showMessage("Failed to save odometer record.", "error");
  }
}