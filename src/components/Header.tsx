import React, { useState } from 'react';
import { Bell, X } from 'lucide-react';

const Header: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "New Project Release",
      message: "The Conjuring: Last Rites is now available",
      time: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      title: "Award Nomination",
      message: "Nominated for Best Original Score at the Golden Globes",
      time: "1 day ago",
      unread: true
    },
    {
      id: 3,
      title: "Collaboration Opportunity",
      message: "Disney has reached out for a new project",
      time: "3 days ago",
      unread: false
    },
    {
      id: 4,
      title: "Interview Request",
      message: "Rolling Stone wants to feature your work",
      time: "1 week ago",
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="relative w-full py-6 px-8">
      <div className="flex justify-between items-center">
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 hover:bg-stone-200 rounded-full transition-colors duration-200"
          >
            <Bell className="w-6 h-6 text-stone-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-2xl border border-stone-200 z-50">
              <div className="p-4 border-b border-stone-200 flex justify-between items-center">
                <h3 className="font-semibold text-stone-800">Notifications</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-1 hover:bg-stone-100 rounded-full transition-colors duration-200"
                >
                  <X className="w-4 h-4 text-stone-600" />
                </button>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-stone-100 hover:bg-stone-50 transition-colors duration-200 ${
                      notification.unread ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className={`font-medium text-sm ${
                        notification.unread ? 'text-stone-900' : 'text-stone-700'
                      }`}>
                        {notification.title}
                      </h4>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                      )}
                    </div>
                    <p className="text-stone-600 text-sm mb-2">{notification.message}</p>
                    <span className="text-stone-400 text-xs">{notification.time}</span>
                  </div>
                ))}
              </div>
              
              <div className="p-3 text-center border-t border-stone-200">
                <button className="text-stone-600 text-sm hover:text-stone-800 transition-colors duration-200">
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Artist Name - Centered */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-stone-800 tracking-wide">
            <span className="italic font-light">Sseruwagi Sinclaire Sebastian</span>
          </h1>
        </div>

        {/* Empty space to balance the layout */}
        <div className="w-10"></div>
      </div>

      {/* Overlay to close notifications when clicking outside */}
      {showNotifications && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowNotifications(false)}
        />
      )}
    </header>
  );
};

export default Header;