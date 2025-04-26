const fs = require("fs");
const { ObjectId } = require("bson");

// Cấu hình dữ liệu đầu vào
const areas = ["KV001"];
const deviceIds = ["ESP-01A293"];

// Ngày cần tạo dữ liệu (1 ngày = 1440 phút)
const dateString = "2025-04-26"; // YYYY-MM-DD

function getRandomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomNumber(min, max, decimal = 1) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimal));
}

function generateTimestampsForDay(dateStr) {
  const timestamps = [];
  const baseDate = new Date(`${dateStr}T00:00:00.000Z`);
  const minutesToGenerate = 20 * 60; // 20 giờ => 1200 phút

  for (let i = 0; i < minutesToGenerate; i++) {
    const timestamp = new Date(baseDate.getTime() + i * 60 * 1000); // mỗi phút
    timestamps.push(timestamp.toISOString());
  }
  return timestamps;
}

// Tạo dữ liệu
const timestamps = generateTimestampsForDay(dateString);

const data = timestamps.map((ts) => ({
  _id: { $oid: new ObjectId().toString() },
  DeviceId: getRandomFromArray(deviceIds),
  Area: getRandomFromArray(areas),
  Temperature: getRandomNumber(20, 35),
  Humidity: getRandomNumber(20, 80),
  Light: getRandomNumber(0, 100, 0),
  AirQuality: getRandomNumber(0, 1000, 0),
  Timestamp: { $date: ts },
}));

// Ghi ra file
fs.writeFileSync("iot_data.json", JSON.stringify(data, null, 2), "utf-8");

console.log(
  `✅ Đã tạo ${data.length} bản ghi từ 00h00 đến 20h00 ngày ${dateString} và lưu vào file iot_data.json`
);
