
import { Activity, DollarSign, Package, Users } from 'lucide-react';

const Dashboard = () => {
 

  const stats = [
    {
      title: 'Total Revenue',
      value: '$53,000',
      change: '+12.5%',
      icon: DollarSign,
    },
    {
      title: 'Total Orders',
      value: '2,345',
      change: '+15.2%',
      icon: Package,
    },
    {
      title: 'Total Customers',
      value: '1,234',
      change: '+8.4%',
      icon: Users,
    },
    {
      title: 'Active Products',
      value: '456',
      change: '+4.3%',
      icon: Activity,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      title: 'New order received',
      description: 'Order #12345 from John Doe',
      time: '2 hours ago',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 2,
      title: 'Payment received',
      description: 'Payment for Order #12344',
      time: '3 hours ago',
      image: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 3,
      title: 'New customer registered',
      description: 'Jane Smith created an account',
      time: '5 hours ago',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 4,
      title: 'Product stock updated',
      description: 'Stock level updated for 15 items',
      time: '6 hours ago',
      image: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
     

      <div className="flex-1 flex flex-col overflow-hidden">
       

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.title} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
                    <div className="p-2 bg-indigo-50 rounded-lg">
                      <Icon className="w-6 h-6 text-indigo-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="text-green-500 text-sm mt-2">{stat.change} from last month</p>
                </div>
              );
            })}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  View all
                </button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between py-4 border-b last:border-0">
                    <div className="flex items-center space-x-4">
                      <img
                        src={activity.image}
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.description}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;