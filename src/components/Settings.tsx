import { Database, Globe, Bell, Shield, Link2, CheckCircle, AlertCircle, Copy, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { testConnection } from '../services/googleSheetsApi';

export default function Settings() {
  const [sheetUrl, setSheetUrl] = useState('');
  const [saved, setSaved] = useState(false);
  const [testResult, setTestResult] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState('');
  const [sheetTabs, setSheetTabs] = useState<string[]>([]);

  useEffect(() => {
    const savedUrl = localStorage.getItem('hris_api_url') || '';
    setSheetUrl(savedUrl);
  }, []);

  const handleSave = () => {
    localStorage.setItem('hris_api_url', sheetUrl);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleTest = async () => {
    if (!sheetUrl) {
      setTestResult('error');
      setTestMessage('Please enter a URL first');
      return;
    }

    setTestResult('testing');
    setTestMessage('Testing connection...');

    try {
      const result = await testConnection();
      
      if (result.success) {
        setTestResult('success');
        setTestMessage(`✅ ${result.message}`);
        if (result.sheets) {
          setSheetTabs(result.sheets);
        }
      } else {
        setTestResult('error');
        setTestMessage(`❌ ${result.message}`);
      }
    } catch (error: any) {
      setTestResult('error');
      setTestMessage(`❌ ${error.message || 'Unknown error'}`);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(sheetUrl);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Configure your HRIS system and Google Sheets integration</p>
      </div>

      {/* Google Sheets Connection - PRIMARY */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Database size={20} className="text-green-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Google Sheets Connection</h2>
            <p className="text-sm text-gray-500">Paste your Google Apps Script Web App URL below</p>
          </div>
        </div>

        <div className="space-y-4 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Web App URL <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={sheetUrl}
                onChange={e => setSheetUrl(e.target.value)}
                placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
                className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none font-mono"
              />
              {sheetUrl && (
                <button onClick={handleCopyUrl} className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50" title="Copy URL">
                  <Copy size={16} className="text-gray-500" />
                </button>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Get this URL from: Google Sheet → Extensions → Apps Script → Deploy → New deployment → Web app
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              💾 Save URL
            </button>
            <button
              onClick={handleTest}
              disabled={testResult === 'testing'}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {testResult === 'testing' ? '⏳ Testing...' : '🧪 Test Connection'}
            </button>
            {sheetUrl && (
              <a
                href={sheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-1"
              >
                <ExternalLink size={14} /> Open API
              </a>
            )}
          </div>

          {/* Test Result */}
          {testResult !== 'idle' && (
            <div className={`p-4 rounded-lg border ${
              testResult === 'success' ? 'bg-green-50 border-green-200' :
              testResult === 'error' ? 'bg-red-50 border-red-200' :
              'bg-blue-50 border-blue-200'
            }`}>
              <p className={`text-sm font-medium ${
                testResult === 'success' ? 'text-green-800' :
                testResult === 'error' ? 'text-red-800' :
                'text-blue-800'
              }`}>{testMessage}</p>
            </div>
          )}

          {/* Saved confirmation */}
          {saved && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-800">URL saved successfully!</p>
                <p className="text-xs text-green-600 mt-1">The frontend will now fetch data from your Google Sheet. Refresh the page to see live data.</p>
              </div>
            </div>
          )}

          {/* Connected Sheet Tabs */}
          {sheetTabs.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                ✅ Connected Sheet Tabs ({sheetTabs.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                {sheetTabs.map(tab => (
                  <div key={tab} className="px-3 py-2 bg-green-50 rounded-lg text-xs font-mono text-green-700 border border-green-100">
                    {tab}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Setup Instructions */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-100">
        <h3 className="text-sm font-semibold text-indigo-900 mb-3">📋 Quick Setup Instructions</h3>
        <ol className="text-xs text-indigo-700 space-y-2 list-decimal list-inside">
          <li>Open your Google Sheet → <strong>Extensions</strong> → <strong>Apps Script</strong></li>
          <li>Copy the code from <code className="bg-indigo-100 px-1 rounded">google-apps-script/Code.gs</code> and paste it</li>
          <li>Click <strong>Deploy</strong> → <strong>New deployment</strong> → Type: <strong>Web app</strong></li>
          <li>Set "Execute as" = <strong>Me</strong>, "Who has access" = <strong>Anyone</strong></li>
          <li>Copy the <strong>Web app URL</strong> and paste it above</li>
          <li>Click <strong>Save URL</strong> then <strong>Test Connection</strong></li>
          <li>Refresh the page to see live data from your Google Sheet!</li>
        </ol>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"><Globe size={20} className="text-purple-600" /></div>
          <div><h2 className="text-lg font-semibold text-gray-900">General Settings</h2><p className="text-sm text-gray-500">97_Settings tab</p></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name</label><input type="text" defaultValue="Vientiane Hotel" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Location</label><input type="text" defaultValue="Vientiane Capital, Laos" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Currency</label><select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none"><option value="LAK">LAK - Lao Kip (₭)</option><option value="USD">USD - US Dollar</option></select></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Language</label><select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none"><option value="en">English</option><option value="lo">ລາວ (Lao)</option></select></div>
        </div>
      </div>

      {/* User Roles */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center"><Shield size={20} className="text-red-600" /></div>
          <div><h2 className="text-lg font-semibold text-gray-900">User Roles</h2><p className="text-sm text-gray-500">User_Roles tab</p></div>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Role</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">View</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Edit</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Delete</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Approve</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[{ role: 'Admin', view: true, edit: true, delete: true, approve: true }, { role: 'HR Manager', view: true, edit: true, delete: false, approve: true }, { role: 'Department Head', view: true, edit: false, delete: false, approve: true }, { role: 'Employee', view: true, edit: false, delete: false, approve: false }].map((item, i) => (
                <tr key={i}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.role}</td>
                  <td className="px-4 py-3 text-center">{item.view ? '✅' : '❌'}</td>
                  <td className="px-4 py-3 text-center">{item.edit ? '✅' : '❌'}</td>
                  <td className="px-4 py-3 text-center">{item.delete ? '✅' : '❌'}</td>
                  <td className="px-4 py-3 text-center">{item.approve ? '✅' : '❌'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
