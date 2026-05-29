# 4D 领导力测评 H5 部署指南
# 假设腾讯云服务器运行 Ubuntu/CentOS，已安装 Node.js 18+

# 1. 将整个 4d-h5-deploy 文件夹上传到服务器
#    scp -r 4d-h5-deploy user@your-server-ip:/home/user/

# 2. SSH 登录服务器后执行以下命令

# 安装依赖
cd /home/user/4d-h5-deploy
npm install

# 3. 安装 PM2 进程守护
npm install -g pm2

# 4. 启动服务
pm2 start server/index.js --name 4d-assessment

# 5. 设置 PM2 开机自启
pm2 save
pm2 startup

# 6. Nginx 配置（如果使用 Nginx 反向代理）
# 将以下内容添加到 /etc/nginx/conf.d/4d.conf
# 然后执行 nginx -s reload

cat > /tmp/4d-nginx.conf << 'NGINX'
server {
    listen 80;
    server_name your-domain.com;  # 改成你的域名或 IP

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
NGINX

echo "=== Nginx 配置模板已生成: /tmp/4d-nginx.conf ==="
echo "=== 复制到服务器 Nginx 配置目录后执行: nginx -s reload ==="
echo ""
echo "部署完成后的访问地址: http://your-domain.com"
echo "API 健康检查: http://your-domain.com/api/health"
