import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/usercontent';
import { useNavigate } from 'react-router-dom';

export default function Albums() {

    const navigate = useNavigate()

    const { user } = useContext(UserContext);
    const [albumsList, setAlbumList] = useState([])
    const [currentPhotos, setCurrentPhotos] = useState([])
    const [currentFourPhotos, setCurrentFourPhotos] = useState([])
    const [activeIndex, setActiveIndex] = useState()
    const [numPhotos, setNumPhotos] = useState(4)



    const userlocal = JSON.parse(localStorage.getItem('onlineUser'));
    const userId = userlocal.id


    useEffect(() => {
        fetchAlbums()

    }, [])

    const fetchAlbums = async () => {
        const data = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
        const albums = await data.json()
        albums.sort((album1, album2) => { return album2.title > album1.title ? -1 : 1; });
        setAlbumList(albums)
    }

    const fecthPhotos = async (albumId, currentIndex) => {
        setNumPhotos(4)
        if (numPhotos === 4) {
            setActiveIndex(currentIndex)
            const dataPhoto = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
            const photos = await dataPhoto.json()
            let data = [];
            console.log(numPhotos)
            for (let i = 0; i < numPhotos; i++) {
                let newPhoto = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}&&id=${photos[i].id}`);
                let onePhoto = await newPhoto.json();
                data.push(...onePhoto);
            }
            setCurrentFourPhotos(data)
        }

    }

    const addMorePhotos = async (albumId, currentIndex) => {
        setNumPhotos(prev => prev + 4)
        setActiveIndex(currentIndex)
        const dataPhoto = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
        const photos = await dataPhoto.json()
        setCurrentPhotos(photos)
        let newArr = []
        for (let i = 0; i < numPhotos; i++) {
            let addNewPhoto = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}&&id=${photos[i].id}`);
            let addFourPhoto = await addNewPhoto.json();
            newArr.push(...addFourPhoto);
        }
        setCurrentFourPhotos(newArr)
    }




    return (
        <>
            <h1>Choose your favorite albums:</h1>
            <div>
                {albumsList.map((album, i) => {
                    return (
                        <div key={album.id}>
                            <br />
                            <a className="albumName" onClick={() => fecthPhotos(album.id, i)}>{album.title}</a>
                            <br />
                            {activeIndex === i ? <div>{currentFourPhotos.map((photo) => { return <img className='imgPhotos' src={photo.thumbnailUrl} /> })}
                                <button className='btn' onClick={() => addMorePhotos(album.id, i)}>add more photos</button>
                            </div> : ''}
                        </div>
                    )
                })
                }
            </div>



        </>
    )
}