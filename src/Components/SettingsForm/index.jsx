import { useContext } from "react";
import { SettingsContext } from "../../Context/Settings";
import { createStyles, Grid, NumberInput, TextInput, Text, Switch } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
    h1: {
        backgroundColor: theme.colors.gray[8],
        color: theme.colors.gray[0],
        fontSize: theme.fontSizes.lg,
        width: '80%',
        margin: 'auto',
        padding: theme.spacing.md,
        marginTop: theme.spacing.md,
    }
}));

function SettingsForm() {
    const { classes } = useStyles();
    const {
        displayCount,
        showComplete,
        sort,
        setDisplayCount,
        setShowComplete,
        setSort,
    } = useContext(SettingsContext);
    console.log({sort}, {showComplete}, {displayCount});
    const handleSubmit = () => {

    }

    return (
        <>
            <h1 className={classes.h1}><IconSettings /> Manage Settings</h1>
            <Grid style={{width:'80%', margin:'auto'}}>
                <Grid.Col span={6}>
                    <form onSubmit={handleSubmit}>
                        <Text fontSize="xl" weight="bold">Update Settings</Text>
                        <Switch 
                        checked={showComplete}
                        onChange={(e) => setShowComplete(e.currentTarget.checked)}
                        label="Show Completed Todos"
                        />
                        <NumberInput
                        value={displayCount}
                        label="Items Per Page"
                        onChange={setDisplayCount}
                        />
                        <TextInput
                            placeholder={sort}
                            label="Sort Keyword"
                            onChange={(e) => setSort(e.currentTarget.value)}
                        />
                    </form>
                </Grid.Col>
                <Grid.Col span={6}></Grid.Col>
            </Grid>
        </>
    )

}

export default SettingsForm;