import React, { useState, useEffect } from 'react';
import './App.css';

const API_BASE = 'http://localhost:5000/api';

function App() {
  // Todos স্টেট
  const [todos, setTodos] = useState([]);
  const [inputTitle, setInputTitle] = useState('');
  const [filter, setFilter] = useState('all');
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Auth স্টেট (Local Storage থেকে চেক)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('todo_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem('todo_token') || null;
  });

  // Auth ফর্ম স্টেট
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [authUsername, setAuthUsername] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // এডিটিং স্টেট
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  // 🔔 টোস্টার নোটিফিকেশন হেল্পার
  const addToast = (method, endpoint, message, type = 'info', status = null) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      method,
      endpoint,
      message,
      type, // 'get' | 'post' | 'patch' | 'delete' | 'error' | 'warning'
      status,
      time: new Date().toLocaleTimeString(),
    };

    setToasts((prev) => [newToast, ...prev].slice(0, 4));

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth হেডার পাওয়ার হেল্পার ফাংশন
  const getAuthHeaders = () => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  };

  // ১. সব Todos আনা (GET /api/todos)
  const fetchTodos = async (showNotification = false) => {
    try {
      const res = await fetch(`${API_BASE}/todos`);
      const json = await res.json();
      const data = Array.isArray(json) ? json : json.data || [];

      setTodos(data);
      setIsBackendConnected(true);

      if (showNotification) {
        addToast('GET', '/api/todos', `সফলভাবে ${data.length}টি টাস্ক ব্যাকএন্ড থেকে ফেচ হয়েছে!`, 'get', res.status);
      }
    } catch (err) {
      setIsBackendConnected(false);
      if (showNotification) {
        addToast('GET', '/api/todos', 'ব্যাকএন্ড অফলাইন!', 'error', 'OFFLINE');
      }
    }
  };

  useEffect(() => {
    fetchTodos(true);
  }, []);

  // ২. লগইন বা রেজিস্টার হ্যান্ডলার
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);

    const endpoint = authMode === 'register' ? '/auth/register' : '/auth/login';

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: authUsername,
          password: authPassword,
        }),
      });

      const json = await res.json();

      if (res.ok) {
        const { user, token } = json.data;
        setCurrentUser(user);
        setToken(token);
        localStorage.setItem('todo_user', JSON.stringify(user));
        localStorage.setItem('todo_token', token);

        addToast(
          'POST',
          `/api${endpoint}`,
          authMode === 'register' ? `রেজিস্ট্রেশন সফল! স্বাগতম @${user.username}` : `স্বাগতম @${user.username}! লগইন সফল হয়েছে।`,
          'post',
          res.status
        );

        setAuthUsername('');
        setAuthPassword('');
      } else {
        addToast(
          'POST',
          `/api${endpoint}`,
          json.message || 'অথেনটিকেশন ব্যর্থ হয়েছে!',
          'error',
          res.status
        );
      }
    } catch (err) {
      addToast('AUTH', `/api${endpoint}`, 'ব্যাকএন্ডের সাথে সংযোগ পাওয়া যায়নি!', 'error', 'OFFLINE');
    } finally {
      setAuthLoading(false);
    }
  };

  // ৩. লগআউট হ্যান্ডলার
  const handleLogout = () => {
    const prevName = currentUser?.username;
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem('todo_user');
    localStorage.removeItem('todo_token');
    addToast('AUTH', '/api/auth/logout', `@${prevName} সফলভাবে লগআউট হয়েছেন।`, 'warning', 'LOGOUT');
  };

  // ৪. নতুন Todo যোগ করা (POST /api/todos)
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!inputTitle.trim()) {
      addToast('VALIDATION', '/api/todos', 'টাস্কের টাইটেল ফাঁকা রাখা যাবে না!', 'error');
      return;
    }

    // যদি লগইন না থাকে, রিকোয়েস্ট আটকে ফ্রন্টএন্ড থেকেই সচেতন করা
    if (!token) {
      addToast('MIDDLEWARE', '/api/todos', '🔒 [401 Unauthorized] টাস্ক যোগ করতে হলে আগে লগইন করতে হবে!', 'error', '401');
      return;
    }

    const title = inputTitle.trim();
    setInputTitle('');

    try {
      const res = await fetch(`${API_BASE}/todos`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ title }),
      });

      const json = await res.json();

      if (res.ok) {
        const newTodo = json.data || json;
        setTodos((prev) => [...prev, newTodo]);
        addToast('POST', '/api/todos', `টাস্ক "${title}" যোগ হয়েছে!`, 'post', res.status);
      } else {
        addToast('POST', '/api/todos', json.message || 'টাস্ক যোগ ব্যর্থ!', 'error', res.status);
      }
    } catch (err) {
      addToast('POST', '/api/todos', 'সার্ভার অফলাইন!', 'error', 'OFFLINE');
    }
  };

  // ৫. এডিট শুরু করা
  const handleStartEdit = (todo) => {
    if (todo.done) {
      addToast('RULE', `/api/todos/${todo.id}`, '⚠️ সম্পূর্ণ হওয়া (Completed) টাস্ক এডিট করা যাবে না! আগে আন-চেক করুন।', 'warning', 'BLOCKED');
      return;
    }

    if (!token) {
      addToast('MIDDLEWARE', `/api/todos/${todo.id}`, '🔒 [401 Unauthorized] এডিট করতে হলে আগে লগইন করুন!', 'error', '401');
      return;
    }

    setEditingId(todo.id);
    setEditingTitle(todo.title);
  };

  // ৬. এডিট সেভ করা (PATCH /api/todos/:id)
  const handleSaveEdit = async (id) => {
    if (!editingTitle.trim()) {
      addToast('VALIDATION', `/api/todos/${id}`, 'টাইটেল ফাঁকা রাখা যাবে না!', 'error');
      return;
    }

    const newTitle = editingTitle.trim();
    setEditingId(null);

    try {
      const res = await fetch(`${API_BASE}/todos/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ title: newTitle }),
      });

      const json = await res.json();

      if (res.ok) {
        setTodos((prev) =>
          prev.map((t) => (t.id === id ? { ...t, title: newTitle } : t))
        );
        addToast('PATCH', `/api/todos/${id}`, `টাস্ক এডিট সফল: "${newTitle}"`, 'patch', res.status);
      } else {
        addToast('PATCH', `/api/todos/${id}`, json.message || 'এডিট ব্যর্থ হয়েছে!', 'error', res.status);
        fetchTodos(false);
      }
    } catch (err) {
      addToast('PATCH', `/api/todos/${id}`, 'সার্ভার অফলাইন!', 'error', 'OFFLINE');
    }
  };

  // ৭. টাস্ক স্ট্যাটাস টগল করা (PATCH /api/todos/:id/toggle)
  const handleToggleTodo = async (id, currentDone) => {
    if (!token) {
      addToast('MIDDLEWARE', `/api/todos/${id}`, '🔒 [401 Unauthorized] টাস্ক সম্পন্ন/টগল করতে হলে আগে লগইন করুন!', 'error', '401');
      return;
    }

    const updatedDone = !currentDone;

    // অপটিমিস্টিক আপডেট
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: updatedDone } : t))
    );

    try {
      const res = await fetch(`${API_BASE}/todos/${id}/toggle`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
      });

      const json = await res.json();

      if (res.ok) {
        addToast('PATCH', `/api/todos/${id}/toggle`, `টাস্ক স্ট্যাটাস: ${updatedDone ? 'Completed' : 'Pending'}`, 'patch', res.status);
      } else {
        addToast('PATCH', `/api/todos/${id}/toggle`, json.message || 'স্ট্যাটাস আপডেট ব্যর্থ!', 'error', res.status);
        fetchTodos(false);
      }
    } catch (err) {
      addToast('PATCH', `/api/todos/${id}/toggle`, 'সার্ভার অফলাইন!', 'error', 'OFFLINE');
    }
  };

  // ৮. টাস্ক মুছে ফেলা (DELETE /api/todos/:id)
  const handleDeleteTodo = async (id) => {
    if (!token) {
      addToast('MIDDLEWARE', `/api/todos/${id}`, '🔒 [401 Unauthorized] টাস্ক মুছে ফেলতে হলে আগে লগইন করুন!', 'error', '401');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/todos/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      const json = await res.json();

      if (res.ok) {
        setTodos((prev) => prev.filter((t) => t.id !== id));
        addToast('DELETE', `/api/todos/${id}`, `টাস্ক সফলভাবে ডিলিট করা হয়েছে!`, 'delete', res.status);
      } else {
        addToast('DELETE', `/api/todos/${id}`, json.message || 'ডিলিট ব্যর্থ!', 'error', res.status);
      }
    } catch (err) {
      addToast('DELETE', `/api/todos/${id}`, 'সার্ভার অফলাইন!', 'error', 'OFFLINE');
    }
  };

  // ফিল্টারিং
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.done;
    if (filter === 'completed') return todo.done;
    return true;
  });

  const completedCount = todos.filter((t) => t.done).length;

  return (
    <div className="app-container">
      {/* 🔔 টোস্টার নোটিফিকেশন */}
      <div className="toaster-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast-card toast-${toast.type}`}>
            <div className="toast-header">
              <span className={`toast-method-badge method-${toast.type}`}>
                {toast.method}
              </span>
              <span className="toast-endpoint">{toast.endpoint}</span>
              {toast.status && (
                <span className="toast-status">[{toast.status}]</span>
              )}
              <button
                className="toast-close-btn"
                onClick={() => removeToast(toast.id)}
              >
                ✕
              </button>
            </div>
            <div className="toast-message">{toast.message}</div>
            <div className="toast-time">{toast.time}</div>
          </div>
        ))}
      </div>

      {/* হেডার */}
      <header className="app-header">
        <div className="header-top">
          <h1 className="app-title">⚡ Express Auth & Todo</h1>
          <span
            className={`status-badge ${
              isBackendConnected ? 'online' : 'offline'
            }`}
          >
            <span className="status-dot"></span>
            {isBackendConnected ? 'Backend Connected' : 'Offline'}
          </span>
        </div>
        <p className="app-subtitle">
          Middleware Security: Input Validation, Unique Username & JWT Protection
        </p>

        {/* Auth স্ট্যাটাস বার অথবা লগইন বক্স */}
        <div className="auth-box">
          {currentUser ? (
            <div className="user-profile-bar">
              <div className="profile-info">
                <span className="user-avatar">👤</span>
                <div>
                  <strong>@{currentUser.username}</strong>
                  <span className="auth-tag">Logged In (JWT Guard Active)</span>
                </div>
              </div>
              <button className="btn-logout" onClick={handleLogout}>
                🚪 Logout
              </button>
            </div>
          ) : (
            <div className="auth-form-card">
              <div className="auth-tabs">
                <button
                  className={`tab-btn ${authMode === 'login' ? 'active' : ''}`}
                  onClick={() => setAuthMode('login')}
                >
                  Login
                </button>
                <button
                  className={`tab-btn ${authMode === 'register' ? 'active' : ''}`}
                  onClick={() => setAuthMode('register')}
                >
                  Register (Unique Username)
                </button>
              </div>

              <form className="auth-inputs-form" onSubmit={handleAuthSubmit}>
                <input
                  type="text"
                  placeholder="Username (e.g. rakib - Min 3 chars)"
                  value={authUsername}
                  onChange={(e) => setAuthUsername(e.target.value)}
                  className="auth-input"
                  required
                />
                <input
                  type="password"
                  placeholder="Password (Min 6 chars)"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="auth-input"
                  required
                />
                <button type="submit" className="btn-auth-submit" disabled={authLoading}>
                  {authLoading ? '...' : authMode === 'register' ? 'Create Account' : 'Sign In'}
                </button>
              </form>
              <div className="auth-hint">
                💡 <em>ডেমো ইউজার: <code>rakib</code> | পাসওয়ার্ড: <code>password123</code> অথবা নতুন রেজিস্টার করুন।</em>
              </div>
            </div>
          )}
        </div>

        {/* API রুট কার্ড */}
        <div className="api-badge-card">
          <div className="badge-card-header">
            <strong>🎯 Middleware Protected Routes:</strong>
            <button className="btn-refresh-api" onClick={() => fetchTodos(true)}>
              🔄 Re-fetch
            </button>
          </div>
          <div className="endpoint-list">
            <span className="ep-tag ep-post">POST /api/auth/register</span>
            <span className="ep-tag ep-post">POST /api/auth/login</span>
            <span className="ep-tag ep-get">GET /api/todos (Public)</span>
            <span className="ep-tag ep-post">POST /api/todos [🔒 Auth]</span>
            <span className="ep-tag ep-patch">PATCH /api/todos/:id [🔒 Auth]</span>
            <span className="ep-tag ep-del">DELETE /api/todos/:id [🔒 Auth]</span>
          </div>
        </div>
      </header>

      {/* নতুন Todo ইনপুট ফর্ম */}
      <form className="todo-form" onSubmit={handleAddTodo}>
        <input
          type="text"
          className="todo-input"
          placeholder={
            currentUser
              ? `@${currentUser.username} হিসেবে নতুন কাজ লিখুন...`
              : 'টাস্ক যোগ করার জন্য প্রথমে উপরে লগইন করুন 🔒'
          }
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
        />
        <button type="submit" className="btn-add">
          + Add Todo
        </button>
      </form>

      {/* ফিল্টার কন্ট্রোল বার */}
      <div className="controls-bar">
        <div className="filter-group">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({todos.length})
          </button>
          <button
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active ({todos.length - completedCount})
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Done ({completedCount})
          </button>
        </div>

        <div className="todo-stats">
          {completedCount} of {todos.length} completed
        </div>
      </div>

      {/* টাস্কের লিস্ট */}
      <div className="todo-list">
        {filteredTodos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <p>কোনো টাস্ক পাওয়া যায়নি!</p>
          </div>
        ) : (
          filteredTodos.map((todo) => {
            const isEditing = editingId === todo.id;

            return (
              <div
                key={todo.id}
                className={`todo-item ${todo.done ? 'completed' : ''} ${
                  isEditing ? 'editing' : ''
                }`}
              >
                {/* চেকবক্স */}
                <div
                  className="toggle-checkbox"
                  onClick={() => handleToggleTodo(todo.id, todo.done)}
                  title={todo.done ? 'Mark as Pending' : 'Mark as Completed'}
                >
                  {todo.done && <span className="check-icon">✓</span>}
                </div>

                {/* টাস্ক টাইটেল */}
                {isEditing ? (
                  <div className="edit-box">
                    <input
                      type="text"
                      className="edit-input"
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveEdit(todo.id);
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                      autoFocus
                    />
                    <button
                      className="btn-edit-save"
                      onClick={() => handleSaveEdit(todo.id)}
                      title="Save"
                    >
                      ✓
                    </button>
                    <button
                      className="btn-edit-cancel"
                      onClick={() => setEditingId(null)}
                      title="Cancel"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div
                    className="todo-title-wrapper"
                    onClick={() => handleToggleTodo(todo.id, todo.done)}
                  >
                    <span className="todo-title">{todo.title}</span>
                    {todo.username && (
                      <span className="todo-author">by @{todo.username}</span>
                    )}
                  </div>
                )}

                {/* অ্যাকশন বাটনসমূহ */}
                {!isEditing && (
                  <div className="action-buttons">
                    <button
                      className={`btn-action btn-edit ${
                        todo.done ? 'disabled' : ''
                      }`}
                      onClick={() => handleStartEdit(todo)}
                      title={
                        todo.done
                          ? 'কমপ্লিট হওয়া টাস্ক এডিট করা যাবে না'
                          : 'Edit Todo'
                      }
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-action btn-delete"
                      onClick={() => handleDeleteTodo(todo.id)}
                      title="Delete Todo"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
