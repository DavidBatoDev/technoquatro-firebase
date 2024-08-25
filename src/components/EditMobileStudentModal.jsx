import React, { useEffect, useState } from 'react'
import { Modal, IconButton, hexToRgb } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import CloseIcon from '@mui/icons-material/Close'
import TrashIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { app, db} from '../firebase'
import { doc, setDoc } from 'firebase/firestore'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { CircularProgress } from '@mui/material'


const mobileStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '350px',
    maxWidth: 600,
    bgcolor: '#fff',
    borderRadius: 8,
    outline: 'none',
    textAlign: 'center',
    height: '625px',
    padding: '10px'
  };


const EditMobileStudentModal = ({ selectedStudent, handleEditModalClose, openEditModal}) => {
    const [formBody, setFormBody] = useState(null)
    const [images, setImages] = useState([])
    const [imageUploadError, setImageUploadError] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (images.length > 0) {
            handleImageSubmit()
        }
    }, [images])

    const addAnotherRole = () => {
        setFormBody({
            ...formBody,
            roles: formBody.roles.concat('')
        })
    }

    const handleRemoveImage = (index) => {
        setFormBody({
            ...formBody,
            img_urls: formBody.img_urls.filter((_, i) => i !== index)
        })
    }

    const handleRemoveRole = (index) => {
        setFormBody({
            ...formBody,
            roles: formBody.roles.filter((_, i) => i !== index)
        })
    }

    const handleImageSubmit = (e) => {
        if (images.length === 0) {
            setImageUploadError('Please select images to upload')
            setImages([])
        }
        else if (images.length > 6 || formBody.img_urls.length + images.length > 6) {
            setImageUploadError('You can only upload 6 images')
            setImages([])
        } else {
            setUploading(true)
            const promises = []
            for (let i = 0; i < images.length; i++) {
               promises.push(storeImage(images[i]))
            }
            Promise.all(promises)
            .then((urls) => {
                setFormBody({...formBody, img_urls: formBody.img_urls.concat(urls)})
                setImageUploadError(null)
                setUploading(false)
                setImages([])
            }).catch((error) => {
                setImageUploadError(error.message)
                setImages([])
                console.log(error)
            })
        }
    }

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app)
            const fileName = new Date().getTime() + file.name
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            },
            (error) => {
                reject(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                    resolve(downloadURL)
                })
            }
            )
        })
    }

    useEffect(() => {
        if(selectedStudent) {
            setFormBody(selectedStudent)
        } else {
            setFormBody(null)
        }
    }, [openEditModal])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (formBody.img_urls.length === 0) return setError('Please upload images') 
            setLoading(true)
            setError(null)
            const studentRef = doc(db, 'studentsData', formBody.id)
            await setDoc(studentRef, formBody)
            handleEditModalClose()
            setLoading(false)
        } catch (error) {
            setError(error.message)
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <Modal
          open={openEditModal}
          onClose={handleEditModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          closeAfterTransition
          className='md:hidden'
        >
          <div style={mobileStyle} className='bg-black'>
            {loading ? (
                <div className='h-full w-full flex justify-center items-center'>
                    <CircularProgress />
                </div>
            ) : (
                <form
                onSubmit={e => handleSubmit(e)}
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    '&::-webkit-scrollbar': {
                    display: 'none'
                    }
                }}
                    className='w-full h-full bg-black p-3 overflow-y-auto'
                >
                    <div className='absolute top-0 right-0 z-30'>
                    <IconButton onClick={handleEditModalClose}>
                        <ArrowBackIcon className='text-white' />
                    </IconButton>
                    </div>
                    <p className='text-white text-start mb-3 font-semibold'>
                        Images:
                        <small className='text-red-500'>{imageUploadError}</small>
                    </p>
                    {/* Images */}
                    <div className='grid grid-cols-3 gap-2'>
                            {formBody?.img_urls.map((image, index) => (
                                <div key={image} className='relative border border-white'>
                                    <img src={image}
                                    alt={`image${index}`}
                                    className='h-32 w-32 object-cover' />
                                    <div className='flex justify-center items-center absolute right-1 top-1 bg-white rounded-full w-6 h-6'>
                                        <TrashIcon onClick={() => handleRemoveImage(index)}
                                            className='text-red-500 cursor-pointer'/>
                                    </div>
                                </div>
                            ))}
                            {uploading && (
                                <div className='flex justify-center items-center border cursor-pointer border-white rounded h-32'>
                                    <CircularProgress />
                                </div>
                            )}
                            <label htmlFor='img_urls' className='relative border cursor-pointer border-white rounded h-32'>
                                <AddIcon className='text-gray-400 border rounded-full text-5xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'/>
                            </label>
                            <input id='img_urls' 
                                onChange={e => setImages(e.target.files)} hidden 
                                type="file" accept='image/*' multiple name='img_urls' 
                                className='flex-[2] max-w-48' 
                            />
                        </div>
                        {/* <button disabled={uploading || loading} type='button' onClick={handleImageSubmit} 
                        className='hover:bg-opacity-80 w-full bg-white text-black p-2 rounded mt-2'>
                            {uploading ? 'Uploading' : 'Upload Images'}
                        </button> */}
                    {/* Roles */}
                    <div className='mt-2'>
                        <p className='text-white font-semibold text-start'>Roles:</p>
                        {formBody?.roles.map((role, index) => (
                            <div key={index} className='flex justify-between items-center mt-1'>
                                <input 
                                type="text" 
                                placeholder='Add Role...'
                                value={role}
                                onChange={(e) => {
                                    const newRoles = formBody.roles.map((r, i) => i === index ? e.target.value : r)
                                    setFormBody({...formBody, roles: newRoles})
                                }}
                                className='w-10/12 bg-black text-white p-2 border rounded'
                                />
                                <IconButton onClick={() => handleRemoveRole(index)}>
                                    <TrashIcon className='text-red-500' />
                                </IconButton>
                            </div>
                        ))}
                        <button 
                        type='button'
                        onClick={addAnotherRole}
                        className='w-full bg-white text-black p-2 rounded mt-2'>Add Role</button>
                    </div>
                    {/* Bio */}
                    <div className='mt-1 w-full'>
                        <p className='text-white font-semibold text-start'>Bio:</p>
                        <textarea 
                        name="" 
                        id=""
                        value={formBody?.description}
                        onChange={(e) => setFormBody({...formBody, description: e.target.value})}
                        className='w-full h-32 bg-black text-white p-2 border rounded'
                        >
                        </textarea>
                    </div>
                    <div>
                        <button className='w-full bg-white text-black p-2 rounded mt-3'>Save Changes</button>
                    </div>
                </form>
            )}
          </div>
        </Modal>
  )
}

export default EditMobileStudentModal