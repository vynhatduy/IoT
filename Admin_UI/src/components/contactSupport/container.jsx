import { useState } from 'react';
import React from 'react';
// import avatar1 from '../../assets/images/users/avatar-1.png';
import Nghia from '../../assets/images/users/Nghia.png';
import Duy from '../../assets/images/users/Duy.png';
import Hung from '../../assets/images/users/Hung.png';
import { DashboardOutlined } from '@ant-design/icons';
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';
import WaterfallChartIcon from '@mui/icons-material/WaterfallChart';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import WebIcon from '@mui/icons-material/Web';

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Tabs,
  Tab,
  Paper,
  Card,
  CardContent,
  Button,
  Grid,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';

import {
  Code,
  HelpCircle,
  User,
  Mail,
  Phone,
  MessageSquare,
  FileText,
  Book,
  ChevronDown,
  Github,
  Twitter,
  Linkedin,
  ExternalLink
} from 'lucide-react';

// Data for developers section
const developers = [
  {
    name: 'Hồ Văn Hưng',
    role: 'App mobile',
    description: 'Phát triển ứng dụng di động của đồ án',
    avatarColor: '#3b82f6',
    avata: Hung
  },
  {
    name: 'Vy Nhật Duy',
    role: 'Backend Developer',
    description: ' Phát triền phía backend cho website',
    avatarColor: '#22c55e',
    avata: Duy // green-500
  },
  {
    name: 'Lê Hà Hiếu Nghĩa',
    role: 'FrontEnd developer',
    description: 'Phát triển phần giao diện cho website.',
    avatarColor: '#a855f7', // purple-500
    avata: Nghia
  }
];

// Data for FAQ section
const faqs = [
  {
    question: 'Làm thế nào để tạo tài khoản mới?',
    answer:
      'Để tạo tài khoản mới, hãy nhấp vào nút "Đăng ký" ở góc trên cùng bên phải trang web. Sau đó điền thông tin cá nhân và xác nhận email của bạn.'
  },
  {
    question: 'Làm thế nào để đặt lại mật khẩu?',
    answer:
      'Trên trang đăng nhập, hãy nhấp vào liên kết "Quên mật khẩu". Nhập email đăng ký của bạn và chúng tôi sẽ gửi cho bạn hướng dẫn đặt lại mật khẩu.'
  },
  {
    question: 'Hệ thống hỗ trợ những trình duyệt nào?',
    answer: 'Hệ thống của chúng tôi tương thích với các trình duyệt hiện đại như Chrome, Firefox, Safari và Edge phiên bản mới nhất.'
  }
];

// Data for contact info
const contactInfo = [
  {
    icon: <Mail sx={{ color: '#3b82f6' }} />, // blue-500
    title: 'Email',
    detail: '2113005@dlu.edu.vn'
  },
  {
    icon: <Phone sx={{ color: '#3b82f6' }} />, // blue-500
    title: 'Điện thoại',
    detail: '(+84) 793 589 513'
  },
  {
    icon: <MessageSquare sx={{ color: '#3b82f6' }} />, // blue-500
    title: 'Live Chat',
    detail: 'Hỗ trợ trực tuyến 9:00 - 18:00 (T2-T6)'
  }
];

// Data for features
const features = [
  {
    icon: <DashboardOutlined style={{ color: '#3b82f6', fontSize: '22px' }} />, // blue-500
    title: 'Trang Dashboard',
    description:
      'Trang dashboard hiển thị thông tin môi trường hiện tại với 4 thông tin theo dạng biểu đồ đường: cường độ ánh sáng, nhiệt độ, độ ẩm, ánh sáng có các đơn vị đo tương ứng, có thể chọn xem từng khu vực trong trang trại.'
  },
  {
    icon: <PieChartOutlineIcon sx={{ color: '#3b82f6' }} />, // blue-500
    title: 'Cấu hình thiết bị',
    description:
      'Trang cấu hình thiết bị sẽ gồm 2 phần chính: \n- Cấu hình theo thông số môi trường: Sẽ thực hiện cấu hình tự động dựa vào các thông số thời tiết do người dùng tự điều chỉnh nếu vượt quá thông số quy định thiết bị sẽ tự động bật. Khi thông số trở về ngưỡng ổn định thì thiết bị sẽ tự động tắt. \n- Cấu hình theo lịch: Sẽ thực hiện cấu hình theo thời gian được định dạng thông qua ngày/giờ/phút các thông số này sẽ được tinh chỉnh bởi người dùng.'
  },
  {
    icon: <WaterfallChartIcon sx={{ color: '#3b82f6' }} />, // blue-500
    title: 'Thống kê chi tiết',
    description:
      'Trang thống kê giúp người dùng theo dõi các chỉ số môi trường theo từng khoảng thời gian, giúp người dùng dễ dàng đánh giá sự biến động trong các yếu tố như nhiệt độ, độ ẩm, hoặc chất lượng không khí. Giao diện cho phép lựa chọn khoảng thời gian thống kê, loại dữ liệu cần theo dõi (ví dụ: nhiệt độ), và khu vực cụ thể. Dữ liệu được biểu diễn dưới dạng biểu đồ cột, minh họa sự chênh lệch giữa các ngày trong khoảng thời gian đã chọn.'
  },
  {
    icon: <DevicesOtherIcon sx={{ color: '#3b82f6' }} />, // blue-500
    title: 'Quản lý thiết bị',
    description:
      'Trang quản lý thiết bị cung cấp giao diện hiển thị toàn bộ các thiết bị đã được cài đặt trong hệ thống, cho phép người dùng dễ dàng thêm thiết bị theo từng khu vực cụ thể cũng như xóa bỏ thiết bị khi không còn cần thiết.'
  },
  {
    icon: <WebIcon sx={{ color: '#3b82f6' }} />, // blue-500
    title: 'Quản lý khu vực',
    description:
      'Trang quản lý khu vực hiển thị các thông tin môi trường như nhiệt độ, độ ẩm và chất lượng không khí của từng khu vực. Người dùng có thể điều khiển bật/tắt các thiết bị trong khu vực hiện tại, đồng thời truy xuất hình ảnh từ camera giám sát tại khu vực đó.'
  }
];

// Data for video tutorials
const videoTutorials = [
  {
    title: 'Làm quen với giao diện',
    description: 'Video Hướng Dẫn Cơ Bản',
    duration: '5:30 phút',
    url: 'https://www.youtube.com/watch?v=NUs9lfAiTRk'
  }
];

export default function DeveloperSupportPage() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Developer tab content
  const renderDeveloperTab = () => (
    <Box sx={{ p: 6 }}>
      <Typography variant="h4" sx={{ mb: 6, color: '#1d4ed8', fontWeight: 500 }}>
        Đội Ngũ Phát Triển
      </Typography>

      <Grid container spacing={4}>
        {developers.map((developer, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ height: '100%' }}>
              <Box sx={{ textAlign: 'center', pt: 6 }}>
                <Avatar sx={{ mx: 'auto', mb: 4, width: 96, height: 96, bgcolor: developer.avatarColor }} src={developer.avata}></Avatar>
                <Typography variant="h5" sx={{ mb: 1 }}>
                  {developer.name}
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary' }}>
                  {developer.role}
                </Typography>
              </Box>
              <CardContent>
                <Typography sx={{ mb: 4 }}>{developer.description}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                  <Github color="#374151" /> {/* gray-700 */}
                  <Twitter color="#374151" />
                  <Linkedin color="#374151" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" sx={{ mb: 4, color: '#1d4ed8' }}>
          Về Dự Án
        </Typography>
        <Typography sx={{ mb: 4 }}>
          Mục tiêu chung: Phát triển một hệ thống quản lý trang trại toàn diện, tích hợp các chức năng quản lý, giám sát và thống kê báo cáo
          để hỗ trợ quản lý và theo dõi, tự động đưa ra quyết định hiệu quả.
        </Typography>
        <Typography>
          Mục tiêu cụ thể: Quản lý và theo dõi thông tin môi trường như nhiệt độ, độ ẩm, ánh sáng. Điều khiển các thiết bị như hệ thống
          thông gió, máy sưởi, đèn chiếu sáng. Tạo ra các báo cáo thống kê về môi trường, hiệu suất.
        </Typography>
      </Box>
    </Box>
  );

  // Support tab content
  const renderSupportTab = () => (
    <Box sx={{ p: 6 }}>
      <Typography variant="h4" sx={{ mb: 6, color: '#1d4ed8', fontWeight: 500 }}>
        Hỗ Trợ Người Dùng
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 6 }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <MessageSquare color="#3b82f6" className="mr-2" />
                Liên Hệ Hỗ Trợ
              </Typography>
              <List>
                {contactInfo.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon sx={{ margin: 2 }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.title} secondary={item.detail} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <FileText color="#3b82f6" className="mr-2" />
                Câu Hỏi Thường Gặp
              </Typography>

              {faqs.map((faq, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ChevronDown />}>
                    <Typography>{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  // Guide tab content
  const renderGuideTab = () => (
    <Box sx={{ p: 6 }}>
      <Typography variant="h4" sx={{ mb: 6, color: '#1d4ed8', fontWeight: 500 }}>
        Hướng Dẫn Sử Dụng
      </Typography>

      <Paper sx={{ p: 4, mb: 6 }}>
        <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
          <Book color="#3b82f6" className="mr-2" />
          Hướng Dẫn Bắt Đầu
        </Typography>
        <Divider sx={{ mb: 4 }} />

        <Typography variant="h6" sx={{ mb: 2 }}>
          1. Đăng Ký Tài Khoản
        </Typography>
        <Typography sx={{ mb: 4, pl: 6 }}>
          • Truy cập trang chủ và nhấp vào nút "Đăng Ký"
          <br />
          • Điền đầy đủ thông tin cá nhân theo yêu cầu
          <br />• Xác nhận email của bạn thông qua liên kết được gửi đến hộp thư
        </Typography>

        <Typography variant="h6" sx={{ mb: 2 }}>
          2. Đăng Nhập Hệ Thống
        </Typography>
        <Typography sx={{ mb: 4, pl: 6 }}>
          • Nhập tên đăng nhập và mật khẩu của bạn
          <br />
          • Tick vào "Ghi nhớ đăng nhập" nếu bạn muốn lưu phiên đăng nhập
          <br />• Nhấp vào "Đăng Nhập" để truy cập vào hệ thống
        </Typography>

        <Typography variant="h6" sx={{ mb: 2 }}>
          3. Khám Phá Giao Diện
        </Typography>
        <Typography sx={{ mb: 4, pl: 6 }}>
          • Trang chủ hiển thị tổng quan về các tính năng chính
          <br />
          • Menu điều hướng giúp bạn truy cập vào các phần khác nhau của ứng dụng
          <br />• Biểu tượng thông báo ở góc trên cùng hiển thị các cập nhật mới
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <Code color="#3b82f6" className="mr-2" />
                Các Tính Năng Chính
              </Typography>

              <List>
                {features.map((feature, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemIcon sx={{ margin: 2 }}>{feature.icon}</ListItemIcon>
                      <ListItemText
                        primary={feature.title}
                        secondary={feature.description.split('\n').map((line, lineIndex) => (
                          <span key={lineIndex}>
                            {line}
                            <br />
                          </span>
                        ))}
                      />
                    </ListItem>
                    {index < features.length - 1 && <Divider variant="inset" sx={{ my: 2 }} />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mt: 6 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Video Hướng Dẫn
          </Typography>
          <Grid container spacing={3}>
            {videoTutorials.map((video, index) => (
              <Grid item xs={12} sm={12} key={index}>
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: 1080,
                    bgcolor: '#f3f4f6',
                    height: 192,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    borderRadius: 2,
                    overflow: 'hidden'
                  }}
                >
                  <iframe
                    width="100%"
                    height="192"
                    src={`https://www.youtube.com/embed/${video.url.split('v=')[1]}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  {video.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {video.description}
                  {/* - {video.duration} */}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );

  return (
    <Box>
      <Container sx={{ py: 8 }}>
        <Paper sx={{ mb: 6, overflow: 'hidden' }}>
          <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" sx={{ bgcolor: '#2563eb', color: 'white' }}>
            <Tab label="Người Phát Triển" icon={<User size={16} />} />
            <Tab label="Hỗ Trợ Người Dùng" icon={<HelpCircle size={16} />} />
            <Tab label="Hướng Dẫn Sử Dụng" icon={<Book size={16} />} />
          </Tabs>

          {/* Tab content render based on selected tab */}
          {tabValue === 0 && renderDeveloperTab()}
          {tabValue === 1 && renderSupportTab()}
          {tabValue === 2 && renderGuideTab()}
        </Paper>
      </Container>
    </Box>
  );
}
