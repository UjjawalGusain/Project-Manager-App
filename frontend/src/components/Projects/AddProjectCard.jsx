import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { USER_ENDPOINTS } from '../../services/apiService';
import MainDetails from './AddProjectDetails/MainDetails';
import OptionalDetails from './AddProjectDetails/OptionalDetails';
import FilesDetails from './AddProjectDetails/FilesDetails';

function AddProjectCard() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('repoId', data.repoId);
    formData.append('url', data.url);
    formData.append('description', data.description);
    formData.append('domain', data.domain);
    formData.append('techStack', data.techStack);
    formData.append('stars', data.stars);
    formData.append('ownersUsernames', data.ownersUsernames);

    for (let i = 0; i < data.videos.length; i++) {
      formData.append('videos', data.videos[i]);
    }

    for (let i = 0; i < data.images.length; i++) {
      formData.append('images', data.images[i]);
    }

    if (data.thumbnail[0]) {
      formData.append('thumbnail', data.thumbnail[0]);
    }

    try {
      const response = await axios.post(USER_ENDPOINTS.ADD_PROJECT, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      console.log('Project added successfully:', response.data);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex flex-col w-1/2 h-full border border-home-gold rounded-2xl items-center justify-center bg-gray-800 bg-opacity-75 shadow-lg transition-transform duration-300 ease-in-out hover:shadow-2xl transform hover:scale-105 p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  w-full">
          {/* Carousel-like navigation */}
          <MainDetails register={register} errors={errors} />
          <OptionalDetails register={register} errors={errors} />
          <FilesDetails register={register} />

          {/* Submit Button */}
          <button type="submit" className="bg-home-gold text-white p-3 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-110 active:scale-95 shadow-md">
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProjectCard;