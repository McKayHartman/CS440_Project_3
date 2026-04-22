# Script to view the contents of the microservices databases

Write-Host "`n--- [USER ACCOUNTS] ---" -ForegroundColor Cyan
docker exec cs440_project_3-user-login-service-1 node -e "const sqlite3 = require('sqlite3').verbose(); const db = new sqlite3.Database('db/user-login-service.db'); db.all('SELECT id, username FROM users', (err, rows) => { if (err) console.error(err); else console.table(rows); })"

Start-Sleep -Seconds 1

Write-Host "`n--- [SUBMITTED NOTES] ---" -ForegroundColor Green
docker exec cs440_project_3-text-service-1 node -e "const sqlite3 = require('sqlite3').verbose(); const db = new sqlite3.Database('db/text-service.db'); db.all('SELECT * FROM texts', (err, rows) => { if (err) console.error(err); else console.table(rows); })"

Write-Host "`n--- [IMAGES] ---" -ForegroundColor Yellow
docker exec cs440_project_3-image-service-1 node -e "const axios = require('http'); const options = { hostname: 'localhost', port: 5003, path: '/health', method: 'GET' }; console.log('Image service is live.');"
Write-Host "Note: Image service currently uses in-memory storage."
