import React, { useState } from "react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "Taisha Tasnim",
    email: "Taisha.tasnim@gmail.com",
    profilePicture: null,
    dateJoined: "January 15, 2020",
    status: "published", 
    phone: "+8801703720057",
    bio: "Software developer with 5+ years of experience in React and Node.js. Passionate about creating user-friendly applications and learning new technologies.",
    location: "Mohammadpur, Dhaka, Bangladesh",
    website: "taishatasnim.com"
  });

  const [editData, setEditData] = useState({ ...profileData });
  const [imagePreview, setImagePreview] = useState(null);

  const statusConfig = {
    published: { color: "#22c55e", bg: "#dcfce7", label: "Published" },
    draft: { color: "#eab308", bg: "#fef3c7", label: "Draft" },
    inactive: { color: "#ef4444", bg: "#fee2e2", label: "Inactive" },
    pending: { color: "#3b82f6", bg: "#dbeafe", label: "Pending" }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profileData });
    setImagePreview(profileData.profilePicture);
  };

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
    setImagePreview(null);
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
    setImagePreview(null);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImagePreview(imageUrl);
        handleInputChange('profilePicture', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const containerStyle = {
    maxWidth: "900px",
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
    padding: "2.5rem",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    marginBottom: "2rem",
  };

  const profileHeaderStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "2.5rem",
    paddingBottom: "2rem",
    borderBottom: "1px solid #f0f0f0",
  };

  const avatarContainerStyle = {
    position: "relative",
    marginRight: "2rem",
  };

  const avatarStyle = {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    backgroundColor: "#1f1f2e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "2.5rem",
    fontWeight: "bold",
    overflow: "hidden",
    border: "4px solid #f0f0f0",
  };

  const avatarImageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const uploadButtonStyle = {
    position: "absolute",
    bottom: "0",
    right: "0",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "#1f1f2e",
    border: "3px solid #fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#fff",
    fontSize: "18px",
  };

  const profileInfoStyle = {
    flex: 1,
  };

  const nameStyle = {
    fontSize: "2.2rem",
    margin: "0 0 0.5rem 0",
    color: "#1f1f2e",
    fontWeight: "700",
  };

  const emailStyle = {
    color: "#666",
    fontSize: "1.2rem",
    margin: "0 0 1rem 0",
  };

  const joinDateStyle = {
    color: "#999",
    fontSize: "1rem",
    margin: "0 0 1rem 0",
  };

  const statusBadgeStyle = (status) => ({
    display: "inline-flex",
    alignItems: "center",
    padding: "0.5rem 1rem",
    borderRadius: "50px",
    fontSize: "0.875rem",
    fontWeight: "600",
    color: statusConfig[status].color,
    backgroundColor: statusConfig[status].bg,
    border: `2px solid ${statusConfig[status].color}20`,
  });

  const fieldGroupStyle = {
    marginBottom: "2rem",
  };

  const labelStyle = {
    display: "block",
    fontWeight: "600",
    color: "#1f1f2e",
    marginBottom: "0.75rem",
    fontSize: "1.1rem",
  };

  const valueStyle = {
    color: "#666",
    fontSize: "1.1rem",
    lineHeight: "1.6",
  };

  const inputStyle = {
    width: "100%",
    padding: "1rem",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.3s ease",
    fontFamily: "inherit",
  };

  const selectStyle = {
    ...inputStyle,
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 1rem center",
    backgroundSize: "1rem",
    paddingRight: "3rem",
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: "120px",
    resize: "vertical",
  };

  const buttonGroupStyle = {
    display: "flex",
    gap: "1rem",
    marginTop: "2.5rem",
  };

  const buttonStyle = (primary = false) => ({
    padding: "1rem 2rem",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backgroundColor: primary ? "#1f1f2e" : "#e0e0e0",
    color: primary ? "#fff" : "#666",
  });

  const hiddenInputStyle = {
    position: "absolute",
    opacity: 0,
    pointerEvents: "none",
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Profile</h1>
        {!isEditing && (
          <button
            style={buttonStyle(true)}
            onClick={handleEdit}
          >
            ✏️ Edit Profile
          </button>
        )}
      </div>

      <div style={cardStyle}>
        <div style={profileHeaderStyle}>
          <div style={avatarContainerStyle}>
            <div style={avatarStyle}>
              {(isEditing ? imagePreview : profileData.profilePicture) ? (
                <img 
                  src={isEditing ? imagePreview : profileData.profilePicture} 
                  alt="Profile" 
                  style={avatarImageStyle}
                />
              ) : (
                getInitials(isEditing ? editData.fullName : profileData.fullName)
              )}
            </div>
            {isEditing && (
              <>
                <label style={uploadButtonStyle}>
                  📷
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={hiddenInputStyle}
                  />
                </label>
              </>
            )}
          </div>
          
          <div style={profileInfoStyle}>
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  style={{ ...inputStyle, fontSize: "1.8rem", marginBottom: "1rem", fontWeight: "700" }}
                  placeholder="Full Name"
                />
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  style={{ ...inputStyle, fontSize: "1.1rem", marginBottom: "1rem" }}
                  placeholder="Email Address"
                />
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{ ...labelStyle, marginBottom: "0.5rem" }}>Status</label>
                  <select
                    value={editData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    style={selectStyle}
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <h2 style={nameStyle}>{profileData.fullName}</h2>
                <p style={emailStyle}>{profileData.email}</p>
                <p style={joinDateStyle}>📅 Member since {profileData.dateJoined}</p>
                <div style={statusBadgeStyle(profileData.status)}>
                  <span style={{ marginRight: "0.5rem" }}>
                    {profileData.status === 'published' && '✅'}
                    {profileData.status === 'draft' && '📝'}
                    {profileData.status === 'inactive' && '⭕'}
                    {profileData.status === 'pending' && '⏳'}
                  </span>
                  {statusConfig[profileData.status].label}
                </div>
              </>
            )}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>📞 Phone Number</label>
            {isEditing ? (
              <input
                type="tel"
                value={editData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                style={inputStyle}
                placeholder="Phone Number"
              />
            ) : (
              <p style={valueStyle}>{profileData.phone}</p>
            )}
          </div>

          <div style={fieldGroupStyle}>
            <label style={labelStyle}>📍 Location</label>
            {isEditing ? (
              <input
                type="text"
                value={editData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                style={inputStyle}
                placeholder="Location"
              />
            ) : (
              <p style={valueStyle}>{profileData.location}</p>
            )}
          </div>
        </div>

        <div style={fieldGroupStyle}>
          <label style={labelStyle}>🌐 Website</label>
          {isEditing ? (
            <input
              type="url"
              value={editData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              style={inputStyle}
              placeholder="Website URL"
            />
          ) : (
            <p style={valueStyle}>
              <a href={profileData.website} target="_blank" rel="noopener noreferrer" style={{ color: "#1f1f2e", textDecoration: "none" }}>
                {profileData.website} 🔗
              </a>
            </p>
          )}
        </div>

        <div style={fieldGroupStyle}>
          <label style={labelStyle}>📝 Bio</label>
          {isEditing ? (
            <textarea
              value={editData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              style={textareaStyle}
              placeholder="Tell us about yourself..."
            />
          ) : (
            <p style={valueStyle}>{profileData.bio}</p>
          )}
        </div>

        {isEditing && (
          <div style={buttonGroupStyle}>
            <button
              style={buttonStyle(true)}
              onClick={handleSave}
            >
              💾 Save Changes
            </button>
            <button
              style={buttonStyle(false)}
              onClick={handleCancel}
            >
              ❌ Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;