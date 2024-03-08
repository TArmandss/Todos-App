import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function AreaChart() {
  const [completedMonths, setCompletedMonths] = useState(null);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const storedTodos = JSON.parse(localStorage.getItem("todos"));

  useEffect(() => {
    if (!storedTodos) return; // Exit early if no todos are stored

    const months = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };

    storedTodos.forEach((todo) => {
      if (todo.completed) {
        const todoDate = new Date(todo.date).toLocaleDateString(
          "en-US",
          options
        );
        const month = todoDate.split(" ")[0];
        months[month]++;
      }
    });

    setCompletedMonths(months);
  }, [options]);

  if (!completedMonths) {
    return <p>Loading...</p>;
  }
  const barOptions = {
    // Adjust width of the bars
    barThickness: 20, // Change this value as needed

    // Adjust height of the bars
    categoryPercentage: 0.8, // Adjust the percentage of the available width for each bar
    barPercentage: 0.9, // Adjust the percentage of the available height for each bar
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      animationDuration: 100, // Set animation duration for tooltip (milliseconds)
    },
  };
  const userData = {
    labels: Object.keys(completedMonths),
    datasets: [
      {
        label: "Length Of Todos For Each Month",
        data: Object.values(completedMonths),
        backgroundColor: "#F3EF52",
      },
    ],
  };

  return <Bar data={userData} options={barOptions} />;
}

export default AreaChart;
