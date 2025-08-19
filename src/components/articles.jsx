import React, { useState, useMemo } from "react";

const Articles = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: 'lastEdited', direction: 'desc' });

  const articlesData = [
    { id: 1, title: "Getting Started with React Hooks", status: "published", lastEdited: "2024-01-15T10:30:00" },
    { id: 2, title: "Advanced JavaScript Patterns", status: "draft", lastEdited: "2024-01-14T15:45:00" },
    { id: 3, title: "CSS Grid vs Flexbox: A Complete Guide", status: "published", lastEdited: "2024-01-13T09:20:00" },
    { id: 4, title: "Node.js Best Practices 2024", status: "pending", lastEdited: "2024-01-12T14:10:00" },
    { id: 5, title: "Building Responsive Web Applications", status: "published", lastEdited: "2024-01-11T11:25:00" },
    { id: 6, title: "Understanding Async/Await in JavaScript", status: "inactive", lastEdited: "2024-01-10T16:40:00" },
    { id: 7, title: "Modern CSS Techniques for Developers", status: "draft", lastEdited: "2024-01-09T13:55:00" },
    { id: 8, title: "API Design Principles and Best Practices", status: "published", lastEdited: "2024-01-08T08:15:00" },
    { id: 9, title: "React Performance Optimization Tips", status: "pending", lastEdited: "2024-01-07T12:30:00" },
    { id: 10, title: "TypeScript for JavaScript Developers", status: "published", lastEdited: "2024-01-06T17:20:00" },
    { id: 11, title: "Database Design Fundamentals", status: "draft", lastEdited: "2024-01-05T10:45:00" },
    { id: 12, title: "Docker Container Best Practices", status: "published", lastEdited: "2024-01-04T14:30:00" },
    { id: 13, title: "Git Workflow Strategies for Teams", status: "inactive", lastEdited: "2024-01-03T09:10:00" },
    { id: 14, title: "Web Security Essentials", status: "pending", lastEdited: "2024-01-02T15:25:00" },
    { id: 15, title: "GraphQL vs REST API Comparison", status: "published", lastEdited: "2024-01-01T11:40:00" },
    { id: 16, title: "Frontend Testing Strategies", status: "draft", lastEdited: "2023-12-31T13:15:00" },
    { id: 17, title: "Microservices Architecture Guide", status: "published", lastEdited: "2023-12-30T16:50:00" },
    { id: 18, title: "Progressive Web Apps Development", status: "inactive", lastEdited: "2023-12-29T10:05:00" },
    { id: 19, title: "Cloud Computing Fundamentals", status: "draft", lastEdited: "2023-12-28T14:35:00" },
    { id: 20, title: "Mobile-First Design Principles", status: "published", lastEdited: "2023-12-27T12:20:00" },
    { id: 21, title: "Machine Learning for Web Developers", status: "pending", lastEdited: "2023-12-26T09:30:00" },
    { id: 22, title: "Serverless Functions with AWS Lambda", status: "published", lastEdited: "2023-12-25T15:45:00" },
    { id: 23, title: "Web Accessibility Guidelines", status: "draft", lastEdited: "2023-12-24T11:10:00" },
    { id: 24, title: "DevOps Tools and Practices", status: "published", lastEdited: "2023-12-23T13:25:00" },
    { id: 25, title: "Blockchain Technology Overview", status: "inactive", lastEdited: "2023-12-22T16:40:00" },
  ];

  const statusConfig = {
    published: { color: "#22c55e", bg: "#dcfce7", label: "Published" },
    draft: { color: "#eab308", bg: "#fef3c7", label: "Draft" },
    inactive: { color: "#ef4444", bg: "#fee2e2", label: "Inactive" },
    pending: { color: "#3b82f6", bg: "#dbeafe", label: "Pending" }
  };

  const filteredAndSortedArticles = useMemo(() => {
    let filtered = articlesData.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || article.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'lastEdited') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [searchTerm, statusFilter, sortConfig]);

  const totalItems = filteredAndSortedArticles.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArticles = filteredAndSortedArticles.slice(startIndex, endIndex);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const containerStyle = {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "2rem",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    paddingBottom: "1rem",
    borderBottom: "2px solid #e0e0e0",
  };

  const titleStyle = {
    fontSize: "2.5rem",
    color: "#1f1f2e",
    margin: 0,
    fontWeight: "700",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "2rem",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    marginBottom: "2rem",
  };

  const filtersStyle = {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
    flexWrap: "wrap",
    alignItems: "center",
  };

  const inputStyle = {
    padding: "0.75rem 1rem",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.3s ease",
    minWidth: "200px",
  };

  const selectStyle = {
    ...inputStyle,
    minWidth: "150px",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 1rem center",
    backgroundSize: "1rem",
    paddingRight: "3rem",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "1rem",
    marginBottom: "2rem",
  };

  const thStyle = {
    padding: "1rem",
    textAlign: "left",
    borderBottom: "2px solid #f0f0f0",
    backgroundColor: "#f9fafb",
    fontWeight: "600",
    color: "#374151",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    position: "relative",
  };

  const tdStyle = {
    padding: "1rem",
    borderBottom: "1px solid #f0f0f0",
    verticalAlign: "middle",
  };

  const statusBadgeStyle = (status) => ({
    display: "inline-flex",
    alignItems: "center",
    padding: "0.375rem 0.75rem",
    borderRadius: "50px",
    fontSize: "0.75rem",
    fontWeight: "600",
    color: statusConfig[status].color,
    backgroundColor: statusConfig[status].bg,
    border: `1px solid ${statusConfig[status].color}30`,
  });

  const paginationStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "2rem",
    flexWrap: "wrap",
    gap: "1rem",
  };

  const paginationButtonsStyle = {
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
  };

  const pageButtonStyle = (isActive = false, isDisabled = false) => ({
    padding: "0.5rem 1rem",
    border: "1px solid #e0e0e0",
    borderRadius: "6px",
    backgroundColor: isActive ? "#1f1f2e" : "#fff",
    color: isActive ? "#fff" : isDisabled ? "#999" : "#1f1f2e",
    cursor: isDisabled ? "not-allowed" : "pointer",
    transition: "all 0.3s ease",
    fontWeight: isActive ? "600" : "400",
    opacity: isDisabled ? 0.5 : 1,
  });

  const sortIconStyle = (column) => ({
    marginLeft: "0.5rem",
    fontSize: "0.75rem",
    color: sortConfig.key === column ? "#1f1f2e" : "#999",
  });

  const statsStyle = {
    color: "#666",
    fontSize: "0.9rem",
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>My Articles</h1>
      </div>

      <div style={cardStyle}>
        {/* Filters */}
        <div style={filtersStyle}>
          <input
            type="text"
            placeholder="🔍 Search articles..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            style={inputStyle}
          />
          
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            style={selectStyle}
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>

          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value));
              setCurrentPage(1);
            }}
            style={selectStyle}
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th 
                  style={thStyle} 
                  onClick={() => handleSort('title')}
                >
                  Title
                  <span style={sortIconStyle('title')}>
                    {sortConfig.key === 'title' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕️'}
                  </span>
                </th>
                <th 
                  style={thStyle} 
                  onClick={() => handleSort('status')}
                >
                  Status
                  <span style={sortIconStyle('status')}>
                    {sortConfig.key === 'status' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕️'}
                  </span>
                </th>
                <th 
                  style={thStyle} 
                  onClick={() => handleSort('lastEdited')}
                >
                  Last Edited
                  <span style={sortIconStyle('lastEdited')}>
                    {sortConfig.key === 'lastEdited' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕️'}
                  </span>
                </th>
                <th style={{...thStyle, cursor: 'default'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentArticles.map((article) => (
                <tr 
                  key={article.id}
                  style={{
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f9fafb";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <td style={{...tdStyle, fontWeight: "600", color: "#1f1f2e"}}>
                    {article.title}
                  </td>
                  <td style={tdStyle}>
                    <span style={statusBadgeStyle(article.status)}>
                      <span style={{ marginRight: "0.375rem" }}>
                        {article.status === 'published' && '✅'}
                        {article.status === 'draft' && '📝'}
                        {article.status === 'inactive' && '⭕'}
                        {article.status === 'pending' && '⏳'}
                      </span>
                      {statusConfig[article.status].label}
                    </span>
                  </td>
                  <td style={{...tdStyle, color: "#666"}}>
                    {formatDate(article.lastEdited)}
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        style={{
                          padding: "0.25rem 0.75rem",
                          border: "1px solid #e0e0e0",
                          borderRadius: "4px",
                          backgroundColor: "#fff",
                          color: "#666",
                          cursor: "pointer",
                          fontSize: "0.875rem",
                          transition: "all 0.3s ease",
                        }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        style={{
                          padding: "0.25rem 0.75rem",
                          border: "1px solid #e0e0e0",
                          borderRadius: "4px",
                          backgroundColor: "#fff",
                          color: "#666",
                          cursor: "pointer",
                          fontSize: "0.875rem",
                          transition: "all 0.3s ease",
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={paginationStyle}>
          <div style={statsStyle}>
            Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} articles
          </div>

          <div style={paginationButtonsStyle}>
            <button
              style={pageButtonStyle(false, currentPage === 1)}
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>

            {getPageNumbers().map((pageNumber) => (
              <button
                key={pageNumber}
                style={pageButtonStyle(pageNumber === currentPage)}
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}

            <button
              style={pageButtonStyle(false, currentPage === totalPages)}
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;