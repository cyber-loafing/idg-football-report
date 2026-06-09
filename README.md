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

构建产物会写入 `frontend/dist`。当前部署前缀固定为 `/idg-football-report`，因此外部访问路径为：

- `/idg-football-report/ui/`
- `/idg-football-report/admin/perturbation`
- `/idg-football-report/api/...`
- `/idg-football-report/bsApi/...`
- `/idg-football-report/zx/...`

FastAPI 进程本身仍只监听本机 `127.0.0.1:8000` 的 `/api/...`、`/bsApi/...` 和 `/zx/...`，由 Nginx 负责加前缀反代。

Nginx 需要把仓库内的 `deploy/nginx/idg-football-report.conf` 作为 `location` 片段 include 到现有 `server` 里，不再单独建新站点。

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

## Deployment

按 `Nginx + uv + tmux` 部署：

```bash
# 1. 安装后端依赖
./scripts/deploy_backend.sh

# 2. 构建前端，默认生成 /idg-football-report/ui/ 这一套路径
./scripts/deploy_frontend.sh

# 3. 启动后端常驻进程
./scripts/tmux_backend.sh start
./scripts/tmux_backend.sh status
./scripts/tmux_backend.sh logs
```

Nginx 使用现有站点 `/etc/nginx/sites-available/server.conf`，把下面这行加进 443 的 `server { ... }` 内：

```bash
include /home/zjuidg/idg-football-report/deploy/nginx/idg-football-report.conf;
```

然后 reload：

```bash
sudo systemctl reload nginx
```

后端默认监听 `0.0.0.0:8000`，由 Nginx 反代：

- `/idg-football-report/ui/` -> `frontend/dist/index.html`
- `/idg-football-report/admin/perturbation` -> `frontend/dist/perturbation.html`
- `/idg-football-report/api/` -> FastAPI
- `/idg-football-report/bsApi/` -> FastAPI
- `/idg-football-report/zx/` -> FastAPI 原站镜像

tmux 会在启动时先执行一次 `uv run cfa-mirror-site`，随后常驻运行 `uv run cfa-monitor`。停止或重启：

```bash
./scripts/tmux_backend.sh stop
./scripts/tmux_backend.sh restart
```
