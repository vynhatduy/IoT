graph TD
    A[Hệ thống quản lý trang trại IoT] --> B(Quản lý khu vực)
    A --> C(Quản lý thiết bị)
    A --> D(Quản lý camera)
    A --> E(Cấu hình thiết bị)
    A --> F(Thống kê)
    A --> G(Dashboard)
    A --> H(Giao diện Mobile)

    B --> B1(Thêm khu vực)
    B --> B2(Xóa khu vực)
    B --> B3(Bật/Tắt thiết bị)
    B --> B4(Xem thông số môi trường)
    B --> B5(Xem camera)

    C --> C1(Hiển thị danh sách thiết bị)
    C --> C2(Đưa thiết bị vào khu vực)
    C --> C3(Xóa thiết bị)

    D --> D1(Hiển thị danh sách camera)
    D --> D2(Thêm camera)
    D --> D3(Xóa camera)

    E --> E1(Cấu hình ngưỡng theo thời tiết)
    E --> E2(Cấu hình theo lịch)
    E --> E3(Hiển thị danh sách cấu hình)

    F --> F1(Xem thống kê thông số môi trường theo khu vực)
    F --> F2(Chọn khoảng thời gian)
    F --> F3(Chọn loại thông số)
    F --> F4(Hiển thị biểu đồ cột)

    G --> G1(Xem tổng quan thông số môi trường)
    G --> G2(Hiển thị biểu đồ cột theo khu vực: nhiệt độ, độ ẩm, ánh sáng, chất lượng không khí)

    H --> H1(Xem thông số môi trường hiện tại và realtime)
    H --> H2(Điều khiển bật/tắt thiết bị)
    H --> H3(Dự đoán thông số môi trường)
    H --> H4(Thống kê thông số môi trường)
    H --> H5(Map hiển thị khu vực)
