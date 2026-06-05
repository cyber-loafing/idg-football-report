# CFA Local Monitor

本项目会在本机启动一个 FastAPI 服务，提供：

- `/zx/`：原站静态页面镜像，保持 hash 路由兼容。
- `/ui/`：新的本地比赛报告界面，适配桌面端和移动端。
- `/bsApi/...`：本地兼容代理，供镜像页面读取数据。
- `/api/...`：监控、快照、历史变化和 SSE 事件接口。

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

启动后打开：

```text
http://127.0.0.1:8000/zx/#/pages/tabBar/detail?type&id=d4vguyrwop1mcc3d9a9ox280k
http://127.0.0.1:8000/ui/?id=cq1wnjypozp0xc3b1z3b2hlp0
```

局域网访问时服务需监听 `0.0.0.0`，同一 Wi-Fi/局域网设备可用本机 IPv4 访问，例如：

```text
http://10.196.28.64:8000/zx/#/pages/tabBar/detail?type&id=d4vguyrwop1mcc3d9a9ox280k
http://10.196.28.64:8000/zx/#/pages/tabBar/detail?id=cq1wnjypozp0xc3b1z3b2hlp0
http://10.196.28.64:8000/ui/?id=cq1wnjypozp0xc3b1z3b2hlp0
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
```
