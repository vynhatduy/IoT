import React, { useEffect, useState } from 'react';
import { Grid, Typography, Paper, Box, Divider } from '@mui/material';
import Hls from 'hls.js';

const ListCardCamera = ({ cameras }) => {
  const [videoRefs, setVideoRefs] = useState({});

  // Hàm để tạo ref mới cho mỗi camera
  const createRef = (id) => {
    if (!videoRefs[id]) {
      videoRefs[id] = React.createRef();
    }
    return videoRefs[id];
  };

  useEffect(() => {
    if (!cameras || cameras.length === 0) return;

    cameras.forEach((camera) => {
      const videoElement = videoRefs[camera.id]?.current;
      if (!videoElement) return;

      // Xử lý dựa trên loại kết nối
      if (camera.typeConnect === 'HTTP') {
        // Không cần xử lý gì thêm cho HTTP stream
      } else if (camera.typeConnect === 'RTSP' && window.Hls && window.Hls.isSupported()) {
        // Kết nối RTSP - cần proxy hoặc chuyển đổi sang HLS
        try {
          const videoUrl = `http://${camera.url}:${camera.port}/hls/${camera.id}/index.m3u8`;

          const hls = new window.Hls();

          const loadOptions = {
            xhrSetup: (xhr) => {
              xhr.setRequestHeader('Authorization', 'Basic ' + btoa(`${camera.username}:${camera.password}`));
            }
          };
          hls.loadSource(videoUrl, loadOptions);
          hls.attachMedia(videoElement);

          hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
            // console.log(`Camera ${camera.id}: Stream sẵn sàng`);
            videoElement.play().catch((err) => {
              console.warn(`Camera ${camera.id}: Không thể tự động phát: ${err.message}`);
            });
          });

          hls.on(window.Hls.Events.ERROR, (event, data) => {
            if (data.fatal) {
              console.error(`Camera ${camera.id}: Lỗi HLS nghiêm trọng:`, data);
              setTimeout(() => {
                hls.destroy();
                setupHlsConnection(camera, videoElement);
              }, 5000);
            }
          });

          return () => {
            hls.destroy();
          };
        } catch (error) {
          console.error(`Camera ${camera.id}: Lỗi khi thiết lập HLS:`, error);
        }
      }
    });
  }, [cameras, videoRefs]);

  const renderStream = (camera) => {
    if (camera.typeConnect === 'HTTP') {
      // Sử dụng img tag cho MJPEG stream
      return (
        <Box sx={{ position: 'relative', width: '100%', height: '200px', bgcolor: 'black', borderRadius: 2, overflow: 'hidden' }}>
          <img
            src={`http://${camera.url}:${camera.port}/video?username=${encodeURIComponent(camera.username)}&password=${encodeURIComponent(camera.password)}`}
            alt={`Stream từ ${camera.name}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
      );
    } else {
      // Sử dụng video tag cho RTSP/HLS
      return (
        <Box sx={{ position: 'relative', width: '100%', height: '200px', bgcolor: 'black', borderRadius: 2, overflow: 'hidden' }}>
          <video ref={createRef(camera.id)} controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} playsInline>
            Trình duyệt của bạn không hỗ trợ video.
          </video>
        </Box>
      );
    }
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Paper sx={{ p: 2, bgcolor: 'background.paper', height: '100%', overflow: 'auto' }}>
        {cameras && cameras.length > 0 ? (
          <Grid container spacing={3}>
            {cameras.map((camera) => (
              <Grid item xs={12} md={6} key={camera.id}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                    {camera.name}
                  </Typography>
                  {renderStream(camera)}
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="textSecondary">
                      {camera.typeConnect} • {camera.area}
                    </Typography>
                    <Typography variant="body2" color="primary">
                      {camera.url}:{camera.port}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body2" color="textSecondary" align="center" sx={{ py: 5 }}>
            Không có camera nào
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default ListCardCamera;
