import { useContext, useState } from 'react';
import { SettingsContext } from '../../Context/Settings';
import { Button, createStyles, Grid, NumberInput, TextInput, Text, Switch, Card } from "@mantine/core";
import { IconSettings } from '@tabler/icons-react';
import { When } from 'react-if';

const useStyles = createStyles((theme) => ({
    h1: {
        backgroundColor: theme.colors.gray[8],
        color: theme.colors.gray[0],
        fontSize: theme.fontSizes.lg,
        width: '80%',
        margin: 'auto',
        padding: theme.spacing.md,
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.md,
    },
    settings: {
        fontWeight: '400',
        fontSize: theme.fontSizes.sm,
    }
}));

function SettingsForm() {
    const { classes } = useStyles();
    const [show, setShow] = useState(false);
    const {
        displayCount,
        showComplete,
        sort,
        setDisplayCount,
        setShowComplete,
        setSort,
        saveLocally,
    } = useContext(SettingsContext);
    
    console.log({ sort }, { showComplete }, { displayCount });
    const handleSubmit = (e) => {
        e.preventDefault();
        saveLocally();
        setShow(true);
        e.target.reset();
    }

    return (
        <>
            <h1 className={classes.h1}><IconSettings /> Manage Settings</h1>
            <Grid style={{ width: '80%', margin: 'auto' }}>
                <Grid.Col xs={12} sm={6}>
                    <Card withBorder>
                        <form onSubmit={handleSubmit}>
                            <Text fontSize="xl" weight="bold">Update Settings</Text>
                            <Switch
                                checked={showComplete}
                                onChange={(e) => setShowComplete(e.currentTarget.checked)}
                                label="Show Completed ToDos"
                                m='xs'
                                className={classes.settings}
                            />
                            <NumberInput
                                value={displayCount}
                                label="Items Per Page"
                                onChange={setDisplayCount}
                                className={classes.settings}
                            />
                            <TextInput
                                placeholder={sort}
                                label="Sort Keyword"
                                onChange={(e) => setSort(e.currentTarget.value)}
                                className={classes.settings}
                            />
                            <Button mt='sm' type="submit" style={{ margin: 10 }}>Show New Settings</Button>
                        </form>
                    </Card>
                </Grid.Col>
                <Grid.Col xs={12} sm={6}>
                    <When condition={show}>
                        <Card withBorder>
                            <Card.Section>
                                <Text m='xl' fontSize="xl" weight="bold">Update Settings</Text>
                            </Card.Section>
                            <Text m='sm'>{showComplete ? 'Show' : 'Hide'} Completed Todos</Text>
                            <Text m='sm'>Items Per Page: {displayCount}</Text>
                            <Text m='sm'>Sort Keyword: {sort}</Text>
                        </Card>
                    </When>
                </Grid.Col>
            </Grid>
        </>
    )

}

export default SettingsForm;