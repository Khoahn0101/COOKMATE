import React, { useState, useEffect } from "react";
import * as echarts from "echarts";

const NutritionCard = ({ nutrition }) => {
  const [chartInstance, setChartInstance] = useState(null);
  const [chartError, setChartError] = useState(false);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const chartDom = document.getElementById("nutrition-chart");
      console.log("Chart DOM element:", chartDom);
      console.log("Nutrition data:", nutrition);
      
      if (chartDom && nutrition) {
        // Dispose of previous chart instance if it exists
        if (chartInstance) {
          chartInstance.dispose();
        }

        const myChart = echarts.init(chartDom);
        setChartInstance(myChart);

        const option = {
          animation: true,
          tooltip: { 
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)",
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderColor: '#e5e7eb',
            borderWidth: 1,
            textStyle: {
              color: '#374151'
            }
          },
          color: ["#FFA500", "#000000", "#FFC0CB", "#FFA500"], // Orange, Black, Light Pink, Orange
          series: [
            {
              name: "Nutrition",
              type: "pie",
              radius: ["45%", "75%"],
              center: ["50%", "50%"],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 8,
                borderColor: "#fff",
                borderWidth: 2,
              },
              label: { 
                show: false, 
                position: "center" 
              },
              emphasis: {
                label: { 
                  show: true, 
                  fontSize: "16", 
                  fontWeight: "600",
                  color: '#374151'
                },
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.3)',
                  scale: 1.05
                }
              },
              labelLine: { show: false },
              data: [
                { value: parseInt(nutrition.carbs) || 0, name: "Carbs" },
                { value: parseInt(nutrition.protein) || 0, name: "Protein" },
                { value: parseInt(nutrition.fat) || 0, name: "Fat" },
                { value: parseInt(nutrition.fiber) || 0, name: "Fiber" },
              ].filter(item => item.value > 0), // Only show segments with values > 0
            },
          ],
        };
        
        console.log("Chart option:", option);
        try {
          myChart.setOption(option);
          setChartError(false);
        } catch (error) {
          console.error("Error setting chart option:", error);
          setChartError(true);
        }
        
        // Handle resize
        const handleResize = () => myChart.resize();
        window.addEventListener("resize", handleResize);
        
        return () => {
          window.removeEventListener("resize", handleResize);
          myChart.dispose();
        };
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [nutrition]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (chartInstance) {
        chartInstance.dispose();
      }
    };
  }, [chartInstance]);

  if (!nutrition) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Nutrition</h3>
        <div className="text-gray-500 text-center">
          <p>No nutrition information available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center h-fit">
      <h3 className="text-lg font-bold text-gray-800 mb-6">Nutrition</h3>
      
      {/* Fixed size chart container */}
      <div className="relative mb-6">
        {chartError ? (
          <div className="w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center bg-gray-100 rounded-lg">
            <div className="text-center text-gray-500">
              <p>Chart unavailable</p>
              <p className="text-sm">Check console for details</p>
            </div>
          </div>
        ) : (
          <div 
            id="nutrition-chart" 
            className="w-56 h-56 sm:w-64 sm:h-64"
            style={{ minWidth: '224px', minHeight: '224px' }}
          ></div>
        )}
      </div>
      
      {/* Nutrition table */}
      <div className="w-full max-w-xs mb-4">
        <ul className="text-sm text-gray-600 space-y-3">
          {Object.entries(nutrition).map(([key, value]) => (
            <li key={key} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-b-0">
              <span className="capitalize font-medium text-gray-700">
                {key === 'calories' ? 'Calories' : 
                 key === 'carbs' ? 'Carbohydrates' :
                 key === 'protein' ? 'Protein' :
                 key === 'fat' ? 'Fat' :
                 key === 'fiber' ? 'Fiber' :
                 key === 'sugar' ? 'Sugar' :
                 key === 'sodium' ? 'Sodium' : key}
              </span>
              <span className="font-semibold text-gray-900">
                {value}
                <span className="text-gray-500 ml-1">
                  {key === 'calories' ? 'kcal' : 'g'}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Daily Values Note */}
      <div className="w-full max-w-xs pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-500 leading-relaxed text-center">
          * Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs.
        </p>
      </div>
    </div>
  );
};

export default NutritionCard; 