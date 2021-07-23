import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';

const GET_CLIENT_LIST = gql`
    query GET_CLIENT_LIST ($skip: Int!, $take: Int!) {
        clients (
            options: {
                skip: $skip
                take: $take
            }
        ){
            items {
                id
                name
                email
            }
            totalItems
        }
    }
`;


export function ClientList({ onSelectClient }) {
    const {
        data,
        error,
        loading, 
        fetchMore,
    } = useQuery(GET_CLIENT_LIST, {
        fetchPolicy: 'cache-and-network',
        variables: {
            skip: 0,
            take: 10
        }
    });
    
    const clients = data?.clients.items?? [];
    
    const handleSelectClient = (client) => () => onSelectClient?.(client.id);

    const handleLoadMore = () => {
        // console.log('fetchmore')
        fetchMore({
            variables: {
                skip: data.clients.items.length,
                take: 10
            },
            updateQuery: (result, { fetchMoreResult }) => {
                if (!fetchMoreResult) return result;

                return {
                    ...result,
                    clients: {
                        ...result.clients,
                        items: result.clients.items.concat(fetchMoreResult.clients.items),
                        totalItems: fetchMoreResult.clients.totalItems
                    }
                }
            }
        })
    }
    

    if (error) return <section><strong>Erro ao buscar os clients</strong></section>
    if (loading && !data) return <section><p>Carregando...</p></section>

    return (
        <section>
            <ul> {clients.map((client) => (
                <li key={client.id} onClick={handleSelectClient(client)}>
                    <p>{client.name}</p>
                    <p>{client.email}</p>
                </li>
            ))}
            </ul>
            <button disabled={loading} onClick={handleLoadMore} type="button">Carregar mais</button>
        </section>
    );
}
