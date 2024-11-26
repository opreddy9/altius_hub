import React, { useState } from 'react';
import axios from '../services/userService';

const UserProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    profilePicture: null,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', formData.name);
    form.append('bio', formData.bio);
    if (formData.profilePicture) form.append('profilePicture', formData.profilePicture);

    try {
      const response = await axios.put('/profile', form);
      alert(response.data.message);
    } catch (error) {
      setErrors(error.response.data.errors || {});
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input name="name" value={formData.name} onChange={handleChange} required />
      <textarea name="bio" value={formData.bio} onChange={handleChange} />
      <input type="file" name="profilePicture" onChange={handleFileChange} />
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default UserProfile;
