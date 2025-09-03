import React, { useState } from 'react'
import { Search, ChevronDown } from 'lucide-react'

const Settings = () => {
  const [settings, setSettings] = useState({
    appearance: 'Light',
    language: 'English',
    twoFactorAuth: true,
    mobileNotifications: true,
    desktopNotifications: true,
    emailNotifications: true
  })

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }))
  }

  const handleDropdownChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }))
  }

  const ToggleSwitch = ({ enabled, onToggle }) => (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
        enabled ? 'bg-purple-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">RA</span>
              </div>
              <span className="text-sm font-medium text-gray-900">Robert Allen</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Settings Content */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="space-y-8">
            {/* Appearance */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Appearance</h3>
                <p className="text-sm text-gray-500">Customize your theme focus on your device</p>
              </div>
              <div className="relative">
                <select
                  value={settings.appearance}
                  onChange={(e) => handleDropdownChange('appearance', e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="Light">Light</option>
                  <option value="Dark">Dark</option>
                  <option value="System">System</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Language */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Language</h3>
                <p className="text-sm text-gray-500">Select your language</p>
              </div>
              <div className="relative">
                <select
                  value={settings.language}
                  onChange={(e) => handleDropdownChange('language', e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="English">English</option>
                  <option value="French">French</option>
                  <option value="Kinyarwanda">Kinyarwanda</option>
                  <option value="Swahili">Swahili</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Two-factor Authentication */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Two-factor Authentication</h3>
                <p className="text-sm text-gray-500">Keep your account secure by enabling 2FA via email</p>
              </div>
              <ToggleSwitch
                enabled={settings.twoFactorAuth}
                onToggle={() => handleToggle('twoFactorAuth')}
              />
            </div>

            {/* Mobile Push Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Mobile Push Notifications</h3>
                <p className="text-sm text-gray-500">Receive push notification</p>
              </div>
              <ToggleSwitch
                enabled={settings.mobileNotifications}
                onToggle={() => handleToggle('mobileNotifications')}
              />
            </div>

            {/* Desktop Notification */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Desktop Notification</h3>
                <p className="text-sm text-gray-500">Receive push notification on desktop</p>
              </div>
              <ToggleSwitch
                enabled={settings.desktopNotifications}
                onToggle={() => handleToggle('desktopNotifications')}
              />
            </div>

            {/* Email Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Email Notifications</h3>
                <p className="text-sm text-gray-500">Receive email notification</p>
              </div>
              <ToggleSwitch
                enabled={settings.emailNotifications}
                onToggle={() => handleToggle('emailNotifications')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
