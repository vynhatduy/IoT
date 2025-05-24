// deviceApi.js trong thư mục api
export const updateDeviceStatus = (deviceId, newStatus) => {
  return new Promise((resolve, reject) => {
    console.log(`🔄 Gửi yêu cầu cập nhật thiết bị ID=${deviceId} sang trạng thái: ${newStatus}`);

    // Giả lập delay
    setTimeout(() => {
      const isSuccess = Math.random() > 0.1; // 10% xác suất lỗi để test
      if (isSuccess) {
        // console.log(`✅ Đã cập nhật thiết bị ${deviceId} sang trạng thái: ${newStatus}`);
        resolve({ success: true, deviceId, status: newStatus });
      } else {
        console.error(`❌ Thất bại khi cập nhật thiết bị ${deviceId}`);
        reject(new Error('Lỗi cập nhật thiết bị'));
      }
    }, 1000); // delay 1 giây
  });
};
