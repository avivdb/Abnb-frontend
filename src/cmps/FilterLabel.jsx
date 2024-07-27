import React, { useEffect, useState } from 'react';
import iconAmazingView from '../assets/img/icons/asset7.jpeg';
import iconAmazingPools from '../assets/img/icons/asset8.jpeg';
import iconBeachFront from '../assets/img/icons/asset9.jpeg';
import iconNew from '../assets/img/icons/asset10.jpeg';
import iconContainers from '../assets/img/icons/asset11.jpeg';
import iconOMG from '../assets/img/icons/asset12.jpeg';
import iconLakeFront from '../assets/img/icons/asset13.jpeg';
import iconCastles from '../assets/img/icons/asset14.jpeg';
import iconCabins from '../assets/img/icons/asset15.jpeg';
import iconTrending from '../assets/img/icons/asset16.jpeg';
import iconDesign from '../assets/img/icons/asset17.jpeg';
import iconIslands from '../assets/img/icons/asset18.jpeg';
import iconLuxe from '../assets/img/icons/asset19.jpeg';
import iconCountrySide from '../assets/img/icons/asset20.jpeg';
import iconTreehouses from '../assets/img/icons/asset21.jpeg';
import iconMasions from '../assets/img/icons/asset22.jpeg';
import iconFarms from '../assets/img/icons/asset23.jpeg';
import iconBoats from '../assets/img/icons/asset24.jpeg';
import iconOffTheGrid from '../assets/img/icons/asset25.jpeg';
import iconHistoricalHomes from '../assets/img/icons/asset26.jpeg';
import iconNationalParks from '../assets/img/icons/asset27.jpeg';
import iconTopCities from '../assets/img/icons/asset28.jpeg';
import iconVineyards from '../assets/img/icons/asset29.jpeg';
import iconPlay from '../assets/img/icons/asset30.jpeg';
import iconCamping from '../assets/img/icons/asset31.jpeg';
import iconDomes from '../assets/img/icons/asset32.jpeg';
import iconEarthHomes from '../assets/img/icons/asset33.jpeg';
import iconTropical from '../assets/img/icons/asset34.jpeg';
import iconCreativeSpaces from '../assets/img/icons/asset35.jpeg';
import iconTinyHomes from '../assets/img/icons/asset36.jpeg';
import iconGrandPiano from '../assets/img/icons/asset37.jpeg';
import iconAFrames from '../assets/img/icons/asset38.jpeg';
import iconBedAndBreakfasts from '../assets/img/icons/asset39.jpeg';
import iconDesert from '../assets/img/icons/asset40.jpeg';
import iconChefsKitchens from '../assets/img/icons/asset41.jpeg';
import iconSkiing from '../assets/img/icons/asset42.jpeg';
import iconCaves from '../assets/img/icons/asset43.jpeg';
import iconDammusi from '../assets/img/icons/asset44.jpeg';
import iconSkiInOut from '../assets/img/icons/asset45.jpeg';
import iconBarns from '../assets/img/icons/asset46.jpeg';
import iconArctic from '../assets/img/icons/asset47.jpeg';
import iconSurfing from '../assets/img/icons/asset48.jpeg';
import iconRooms from '../assets/img/icons/asset49.jpeg';
import iconCycladicHomes from '../assets/img/icons/asset50.jpeg';
import iconYurts from '../assets/img/icons/asset51.jpeg';
import iconHouseBoats from '../assets/img/icons/asset52.jpeg';
import iconGolfing from '../assets/img/icons/asset53.jpeg';
import iconTopOfTheWorld from '../assets/img/icons/asset54.jpeg';
import iconWindmills from '../assets/img/icons/asset55.jpeg';
import iconCasasParticulares from '../assets/img/icons/asset56.jpeg';
import iconTowers from '../assets/img/icons/asset57.jpeg';
import iconRyokans from '../assets/img/icons/asset58.jpeg';
import iconCampers from '../assets/img/icons/asset59.jpeg';
import iconHanoks from '../assets/img/icons/asset60.jpeg';
import iconMinsus from '../assets/img/icons/asset61.jpeg';
import iconShepherdsHuts from '../assets/img/icons/asset62.jpeg';
import iconAdapted from '../assets/img/icons/asset63.jpeg';
import iconTrulli from '../assets/img/icons/asset64.jpeg';
import iconRiads from '../assets/img/icons/asset65.jpeg';
import iconLake from '../assets/img/icons/asset66.jpeg';
import iconBeach from '../assets/img/icons/asset67.jpeg';
import arrowForward from "../assets/img/icons/arrowforward.svg"
import arrowBack from "../assets/img/icons/arrowback.svg"
import iconFilterAdvanced from "../assets/img/icons/filterAdvancedicon.svg"

import { useSelector } from 'react-redux';
import { setFilterBy } from "../store/actions/stay.actions";
import { getParams } from '../services/util.service';
import { useLocation, useNavigate } from 'react-router';
import ModalComponent from './ModalComponent';
import { FilterAdvanced } from './FilterAdvanced';

const icons = [
    { src: iconAmazingView, label: 'Amazing Views' },
    { src: iconAmazingPools, label: 'Amazing Pools' },
    { src: iconBeachFront, label: 'Beachfront' },
    { src: iconNew, label: 'New' },
    { src: iconContainers, label: 'Containers' },
    { src: iconOMG, label: 'OMG!' },
    { src: iconLakeFront, label: 'Lakefront' },
    { src: iconCastles, label: 'Castles' },
    { src: iconCabins, label: 'Cabins' },
    { src: iconTrending, label: 'Trending' },
    { src: iconDesign, label: 'Design' },
    { src: iconIslands, label: 'Islands' },
    { src: iconLuxe, label: 'Luxe' },
    { src: iconCountrySide, label: 'Countryside' },
    { src: iconTreehouses, label: 'Treehouses' },
    { src: iconMasions, label: 'Mansions' },
    { src: iconFarms, label: 'Farms' },
    { src: iconBoats, label: 'Boats' },
    { src: iconOffTheGrid, label: 'Off-the-grid' },
    { src: iconHistoricalHomes, label: 'Historical homes' },
    { src: iconNationalParks, label: 'National parks' },
    { src: iconTopCities, label: 'Top Cities' },
    { src: iconVineyards, label: 'Vineyards' },
    { src: iconPlay, label: 'Play' },
    { src: iconCamping, label: 'Camping' },
    { src: iconDomes, label: 'Domes' },
    { src: iconEarthHomes, label: 'Earth Homes' },
    { src: iconTropical, label: 'Tropical' },
    { src: iconCreativeSpaces, label: 'Creative Spaces' },
    { src: iconTinyHomes, label: 'Tiny Homes' },
    { src: iconGrandPiano, label: 'Grand Piano' },
    { src: iconAFrames, label: 'A-frames' },
    { src: iconBedAndBreakfasts, label: 'B&Bs' },
    { src: iconDesert, label: 'Desert' },
    { src: iconChefsKitchens, label: 'Chef\'s Kitchens' },
    { src: iconSkiing, label: 'Skiing' },
    { src: iconCaves, label: 'Caves' },
    { src: iconDammusi, label: 'Dammusi' },
    { src: iconSkiInOut, label: 'Ski-in/out' },
    { src: iconBarns, label: 'Barns' },
    { src: iconArctic, label: 'Arctic' },
    { src: iconSurfing, label: 'Surfing' },
    { src: iconRooms, label: 'Rooms' },
    { src: iconCycladicHomes, label: 'Cycladic Homes' },
    { src: iconYurts, label: 'Yurts' },
    { src: iconHouseBoats, label: 'Houseboats' },
    { src: iconGolfing, label: 'Golfing' },
    { src: iconTopOfTheWorld, label: 'Top of the World' },
    { src: iconWindmills, label: 'Windmills' },
    { src: iconCasasParticulares, label: 'Casas Particulares' },
    { src: iconTowers, label: 'Towers' },
    { src: iconRyokans, label: 'Ryokans' },
    { src: iconCampers, label: 'Campers' },
    { src: iconHanoks, label: 'Hanoks' },
    { src: iconMinsus, label: 'Minsus' },
    { src: iconShepherdsHuts, label: 'Shepherd\'s Huts' },
    { src: iconAdapted, label: 'Adapted' },
    { src: iconTrulli, label: 'Trulli' },
    { src: iconRiads, label: 'Riads' },
    { src: iconLake, label: 'Lake' },
    { src: iconBeach, label: 'Beach' },
]

export function FilterLabel() {

    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        handleResize()
        handleEventListener()
    }, [])

    const handleResize = () => {
        const width = window.innerWidth;
        const itemWidth = 90;
        const calculatedItemsPerPage = Math.floor(width / itemWidth) - 2
        setItemsPerPage(calculatedItemsPerPage > 0 ? calculatedItemsPerPage : 10)
    }

    const handleEventListener = () => {
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }

    const totalPages = Math.ceil(icons.length / itemsPerPage)

    const handleNextPage = () => {
        setCurrentPage((prevPage) => (prevPage + 1) % totalPages)
    }

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages)
    }

    const startIndex = currentPage * itemsPerPage
    const endIndex = (startIndex + itemsPerPage) > icons.length ? icons.length : startIndex + itemsPerPage
    let currentItems

    if (endIndex - startIndex < itemsPerPage) {
        currentItems = icons.slice(endIndex - itemsPerPage, endIndex)
    } else currentItems = icons.slice(startIndex, endIndex)

    function handleChange(label) {
        setFilterBy({ ...filterBy, label: label })
        const params = getParams(filterBy)
        console.log('params', params)
        navigate(`/s/${params}`);
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <section className="filter-label full">
            <ul className="label-list">
                {currentItems.map((icon, index) => (
                    <li className="label" key={index} onClick={() => handleChange(icon.label)}>
                        <img className="label-img" src={icon.src} alt={icon.label} />
                        <p className="label-name">{icon.label}</p>
                    </li>
                ))}
            </ul>
            {(currentPage < totalPages - 1) && <button className="pagination next-page-btn" onClick={handleNextPage}><img src={arrowForward} alt="Next" /></button>}
            {(currentPage !== 0) && <button className="pagination prev-page-btn" onClick={handlePrevPage}><img src={arrowBack} alt="Back" /></button>}
            {location.pathname.startsWith('/s/') && <button className='filter-advanced-btn' onClick={openModal}><img src={iconFilterAdvanced} alt="" /> Filters</button>}
            <ModalComponent isOpen={isModalOpen} onRequestClose={closeModal}>
                <FilterAdvanced />
            </ModalComponent>
        </section>
    )
}
