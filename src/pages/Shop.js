import React, {useState,useEffect} from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import * as animationData from '../lodder.json.js';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
const Shop = () => {
    
    useEffect(() => {
        fetchItems();
    },[])

    const [items,setItems] = useState([]);
    const [isLodding, setIsLoding] = useState(true);
    
    const fetchItems = async () => {
        const data = await fetch(
            'https://fortnite-api.theapinetwork.com/upcoming/get'
        );
        const items = await data.json();
        setItems(items.items);
        setIsLoding(false);
    }
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <div>
        {isLodding ? (
            <div>
            <Segment>
              <Dimmer active>
                <Loader indeterminate>Preparing Files</Loader>
              </Dimmer>
        
              <Image src='/images/wireframe/short-paragraph.png' />
            </Segment>
          </div>
         ) : (
             <div>
                {items.map(item => (
                    <h1 key={item.itemid}>
                        <Link to={`/shop/${item.itemid }`}>{item.name}</Link>
                    </h1>
                ))}
             </div>
             )
        
        
        }
        </div>
        
    );
};

export default Shop;