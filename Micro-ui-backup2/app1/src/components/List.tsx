import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { setItems, addFavorite, removeFavorite, setScrollPosition, setPage } from '../store/actions';

const ListPage = () => {
    //   const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Get favorites and scroll position from the Redux store
    const items = useSelector((state: any) => state.app1.items);
    const favorites = useSelector((state: any) => state.app1.favorites); // Access app1 state
    const scrollPosition = useSelector((state: any) => state.app1.scrollPosition); // Access app1 scroll position
    const page = useSelector((state: any) => state.app1.page); // Get page from Redux

    const listRef = useRef<HTMLUListElement | null>(null);

    // Load items from API
    const loadItems = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `https://jsonplaceholder.typicode.com/albums/1/photos?_page=${page}&_limit=10`
            );
            dispatch(setItems({ data: response.data, page }));
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Toggle favorites: Add or remove from favorites
    const toggleFavorite = (item: any) => {
        if (favorites.some((fav: any) => fav.id === item.id)) {
            dispatch(removeFavorite(item)); // Remove from Redux store
        } else {
            dispatch(addFavorite(item)); // Add to Redux store
        }
    };

    // Handle scroll to trigger loading more items
    const handleScroll = (e: React.UIEvent<HTMLElement>) => {
        const target = e.target as HTMLElement;
        // Get the total scroll height and the current scroll position
        const threshold = 0.6;  // Trigger when user reaches 80% of the way down
        const bottom = target.scrollHeight - target.scrollTop === target.clientHeight;

        // Check if user has scrolled to the bottom or reached the threshold
        if (!isLoading && (bottom || target.scrollTop / target.scrollHeight > threshold)) {
            //   setPage((prev) => prev + 1); // Load more data when near the bottom
            dispatch(setPage(page + 1));
        }

        // Save scroll position when scrolling
        if (listRef.current) {
            dispatch(setScrollPosition(listRef.current.scrollTop)); // Update scroll position in Redux
        }
    };

    // Fetch data when page is changed
    useEffect(() => {
        loadItems();
    }, [page]);

    // Restore scroll position when page is loaded
    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = scrollPosition; // Restore scroll position of the list
        }
    }, [scrollPosition]);

    return (
        <div className="lists-wrapper">
            <h1>List of Items</h1>

            <Link to="/" className='primary-button'>&lt; Back to Dashboard</Link>

            <ul className="items-list" ref={listRef} onScroll={handleScroll}>
                {items?.map((item) => (
                    <li key={item.id}>
                        <div className="items-image">
                            <img
                                src={item.thumbnailUrl}
                                alt={item.title}
                                onError={(e) => (e.currentTarget.src = 'https://picsum.photos/seed/picsum/400/250')}
                            />
                        </div>
                        <div className="items-description">
                            <h3>{item.title}</h3>
                            <p>ID: {item.id}</p>
                            <button data-testId={favorites.some((fav: any) => fav.id === item.id) ? `remove-from-favorites-${item?.id}` : `add-to-favorites-${item?.id}`}  className={`primary-button cta-favourite ${favorites.some((fav) => fav.id === item?.id) ? 'added' : ''}`} onClick={() => toggleFavorite(item)}>
                                {favorites.some((fav: any) => fav.id === item.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {isLoading && <p>Loading more items...</p>}
        </div>
    );
};

export default ListPage;