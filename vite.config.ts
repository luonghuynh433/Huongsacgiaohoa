import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import type { Plugin } from 'vite';

function surveyApiPlugin(): Plugin {
  return {
    name: 'survey-backend-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/survey/submit' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body || '{}');
              const dataDir = path.resolve(__dirname, 'data');
              if (!fs.existsSync(dataDir)) {
                fs.mkdirSync(dataDir, { recursive: true });
              }
              const filePath = path.join(dataDir, 'anonymousSurveys.json');
              let existing: unknown[] = [];
              if (fs.existsSync(filePath)) {
                const content = fs.readFileSync(filePath, 'utf-8');
                existing = JSON.parse(content || '[]');
              }
              const id = `surv_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
              const storedAt = new Date().toISOString();
              const newEntry = {
                id,
                ...data,
                receivedAt: storedAt,
              };
              existing.push(newEntry);
              fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf-8');

              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 201;
              res.end(
                JSON.stringify({
                  success: true,
                  id,
                  message: 'Kết quả khảo sát đã được lưu ẩn danh thành công',
                  storedAt,
                })
              );
            } catch {
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 400;
              res.end(JSON.stringify({ success: false, message: 'Dữ liệu không hợp lệ' }));
            }
          });
          return;
        }

        if (req.url === '/api/survey/list' && req.method === 'GET') {
          const filePath = path.resolve(__dirname, 'data', 'anonymousSurveys.json');
          let existing: unknown[] = [];
          if (fs.existsSync(filePath)) {
            existing = JSON.parse(fs.readFileSync(filePath, 'utf-8') || '[]');
          }
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          res.end(JSON.stringify({ success: true, count: existing.length, items: existing }));
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), surveyApiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
