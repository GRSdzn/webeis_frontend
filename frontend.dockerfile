# Этап 1: Сборка
FROM node:18 AS builder

WORKDIR /app

# Копируем файлы для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости с помощью npm ci
RUN rm -f package-lock.json && npm install


# Копируем весь исходный код
COPY . .

# Собираем проект (будет создана папка dist)
RUN npm run build

# Этап 2: Деплой через Nginx
FROM nginx:alpine

# Копируем собранные файлы из этапа сборки в директорию Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Открываем порт 80 для веб-трафика
EXPOSE 80

# Запускаем Nginx в foreground
CMD ["nginx", "-g", "daemon off;"]
