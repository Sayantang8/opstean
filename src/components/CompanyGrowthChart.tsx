
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Stethoscope, Heart, Shield, Award } from 'lucide-react';

const CompanyGrowthChart = () => {
  const [animatedData, setAnimatedData] = useState<Array<{year: number, products: number}>>([]);
  
  const currentYear = new Date().getFullYear();
  
  const generateGrowthData = () => {
    const data = [];
    const startYear = 2010;
    const endYear = Math.max(currentYear, 2025);
    
    for (let year = startYear; year <= endYear; year++) {
      // Simulate realistic product growth with some fluctuations
      const yearsInBusiness = year - startYear;
      let products;
      
      if (year <= 2015) {
        // Early growth phase
        products = 5 + (yearsInBusiness * 3) + Math.floor(Math.random() * 3);
      } else if (year <= 2020) {
        // Expansion phase
        products = 20 + ((year - 2015) * 8) + Math.floor(Math.random() * 5);
      } else {
        // Mature growth phase
        products = 60 + ((year - 2020) * 10) + Math.floor(Math.random() * 8);
      }
      
      data.push({
        year,
        products: Math.round(products)
      });
    }
    
    return data;
  };

  const fullData = generateGrowthData();

  useEffect(() => {
    // Animate the chart data loading
    const timer = setInterval(() => {
      setAnimatedData(prev => {
        if (prev.length < fullData.length) {
          return fullData.slice(0, prev.length + 1);
        }
        clearInterval(timer);
        return prev;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [fullData.length]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length >= 1) {
      const productsData = payload.find((item: any) => item.dataKey === 'products');
      
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-navy">{`Year: ${label}`}</p>
          {productsData && <p className="text-purple-600">{`Field of Expertise: ${productsData.value}`}</p>}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-12 animate-fade-in">
      <div className="text-center mb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-navy mb-4">
          Our Growth Journey (2010-{currentYear})
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Witness our remarkable growth trajectory from a startup to a leading pharmaceutical company,
          consistently expanding our field of expertise over the years.
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-teal to-navy mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="text-center p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Stethoscope className="w-8 h-8 text-purple-600 mr-2" />
            <div className="text-3xl font-bold text-purple-600">
              {animatedData.length > 0 ? animatedData[animatedData.length - 1]?.products || 0 : 0}+
            </div>
          </div>
          <div className="text-gray-600">Field of Expertise</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-navy/10 to-navy/20 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <Award className="w-8 h-8 text-navy mr-2" />
            <div className="text-3xl font-bold text-navy">
              15+
            </div>
          </div>
          <div className="text-gray-600">Years of Excellence</div>
        </div>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={animatedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="year" 
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#8B5CF6"
              fontSize={12}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="products"
              stroke="#8B5CF6"
              strokeWidth={3}
              dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#8B5CF6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6 text-center">
        <div className="flex justify-center space-x-8 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-purple-500 rounded mr-2"></div>
            <span>Field of Expertise Count</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyGrowthChart;
