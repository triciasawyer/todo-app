import { useContext, useState } from 'react';
import { SettingsContext } from '../../Context/Settings'
import { Badge, Card, CloseButton, Text, Group, Pagination } from '@mantine/core';
import Auth from '../Auth';
import { Else, If, Then } from 'react-if';
import { AuthContext } from '../../Context/Auth';

function List({ list, toggleComplete, deleteItem }) {
    const { isLoggedIn, can } = useContext(AuthContext);
    const {
        displayCount,
        showComplete,
        sort,
    } = useContext(SettingsContext);
    const [activePage, setPage] = useState(1);

    const renderableList = showComplete ? list : list.filter(item => !item.complete);
    const pageCount = Math.ceil(renderableList.length / displayCount);

    const listStart = displayCount * (activePage - 1);
    const listEnd = listStart + displayCount;
    const displayList = renderableList.slice(listStart, listEnd);


    return (
        <>
            {displayList.map(item => (
                <Card mb='sm' shadow='mad' withBorder key={item.id}>
                    <Card.Section withBorder>
                        <Group position="apart">
                            <Group>
                                <If condition={isLoggedIn && can('update')}>
                                    <Then>
                                        <Badge
                                            onClick={() => toggleComplete(item.id)}
                                            color={item.complete ? 'red' : 'green'}
                                            variant="filled"
                                            m="3px"
                                        >
                                            {item.complete ? 'Complete' : 'Pending'}
                                        </Badge>
                                    </Then>
                                    <Else>
                                        <Badge
                                            color={item.complete ? 'red' : 'green'}
                                            variant="filled"
                                            m="3px">
                                            {item.complete ? 'complete' : 'Pending'}
                                        </Badge>
                                    </Else>
                                </If>
                                <Text>{item.assignee}</Text>
                            </Group>
                            <Auth capability="delete">
                                <CloseButton
                                    onClick={() => deleteItem(item.id)}
                                    title="Close ToDo item"
                                />
                            </Auth>
                        </Group>
                    </Card.Section>
                    <Text mt="sm" align="left">{item.text}</Text>
                    <Text align="right"><small>Difficulty: {item.difficulty}</small></Text>
                </Card>
            ))}
            <Pagination value={activePage} onChange={setPage} total={pageCount} />
        </>
    )
}

export default List;