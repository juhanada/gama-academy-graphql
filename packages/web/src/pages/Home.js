import React, { useState } from 'react'
import { ClientList } from '../components/ClientList';
import { ClientEdit } from '../components/ClientEdit';

function Home() {
    const [clientID, setClientID] = useState(null);

    return(
        <main>
            <ClientList onSelectClient={setClientID}/>
            <ClientEdit clientID={clientID}/>
        </main>
    );
}

export default Home; 


        
