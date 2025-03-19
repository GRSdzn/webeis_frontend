import React from "react";
import { Dashboard } from "@/components/Dashboard/Dashboard";

const mockData = [
  {
    title: "Пользователи",
    description: "Всего пользователей: 1234",
  },
  {
    title: "Заказы",
    description: "Новых заказов: 56",
  },
  {
    title: "Доход",
    description: "За месяц: $12,345",
  },
  {
    title: "Конверсия",
    description: "Рост на 12%",
  },
];

export default function DashboardPage() {
  return (
    <div>
      <h1>Панель управления</h1>
      <Dashboard data={mockData} />
    </div>
  );
}
