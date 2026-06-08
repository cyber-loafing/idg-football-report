# CFA Local Monitor

本项目会在本机启动一个 FastAPI 服务，提供：

- `/zx/`：原站静态页面镜像，保持 hash 路由兼容。
- `/bsApi/...`：本地兼容代理，供镜像页面读取数据。
- `/api/...`：监控、快照、历史变化和 SSE 事件接口。

比赛报告前端使用 Vite 构建，生产环境由 Nginx 托管 `/ui/` 和 `/admin/perturbation`。

默认固定监控 fixture：

```text
d4vguyrwop1mcc3d9a9ox280k
cq1wnjypozp0xc3b1z3b2hlp0
```

## Setup

```bash
uv sync --extra dev
uv run cfa-mirror-site
uv run cfa-monitor
```

前端现在使用 Vite。开发报告页时先启动后端，再启动 Vite：

```bash
cd frontend
npm install
npm run dev -- --host 0.0.0.0
```

生产环境由 Nginx 托管前端静态文件，构建命令：

```bash
cd frontend
npm run build
```

构建产物会写入 `frontend/dist`。FastAPI 只提供 `/api/...`、`/bsApi/...` 和 `/zx/...`，不再托管 `/ui/` 或 `/admin/perturbation`。

Nginx 需要将 `/ui/` 指向 `frontend/dist/index.html`，将 `/admin/perturbation` 指向 `frontend/dist/perturbation.html`，并反代 `/api/`、`/bsApi/` 到后端。示例：

```nginx
location /ui/assets/ {
    alias /path/to/idg-football-report/frontend/dist/assets/;
}

location /ui/ {
    alias /path/to/idg-football-report/frontend/dist/;
    try_files $uri /index.html;
}

location = /admin/perturbation {
    root /path/to/idg-football-report/frontend/dist;
    try_files /perturbation.html =404;
}

location /api/ {
    proxy_pass http://127.0.0.1:8000/api/;
}

location /bsApi/ {
    proxy_pass http://127.0.0.1:8000/bsApi/;
}
```

后端启动后可直接访问 API 和原站镜像：

```text
http://127.0.0.1:8000/zx/#/pages/tabBar/detail?type&id=d4vguyrwop1mcc3d9a9ox280k
http://127.0.0.1:8000/api/fixtures
```

前端开发环境打开：

```text
http://127.0.0.1:5173/ui/?id=cq1wnjypozp0xc3b1z3b2hlp0
http://127.0.0.1:5173/admin/perturbation
```

局域网访问时服务需监听 `0.0.0.0`，同一 Wi-Fi/局域网设备可用本机 IPv4 访问，例如：

```text
http://10.196.28.64:8000/zx/#/pages/tabBar/detail?type&id=d4vguyrwop1mcc3d9a9ox280k
http://10.196.28.64:8000/zx/#/pages/tabBar/detail?id=cq1wnjypozp0xc3b1z3b2hlp0
```

## Useful APIs

- `GET /api/fixtures`
- `GET /api/fixtures/{fixture_id}/latest`
- `GET /api/fixtures/{fixture_id}/history`
- `GET /api/fixtures/{fixture_id}/changes`
- `GET /api/events`

运行测试：

```bash
uv run pytest
cd frontend && npm run build && npm run lint && npm run test:config
```
