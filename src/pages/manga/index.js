import React, { useEffect, useState } from 'react';
import { useGlobal } from 'reactn'
import { Redirect } from 'react-router-dom'

import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import MangaCreate from './olustur'
import MangaUpdate from './duzenle'
import MangaDelete from './sil'
import MangaFeatured from './one-cikarilanlar';

import { a11yProps, TabPanel } from "../../components/pages/default-components";
import { useTranslation } from 'react-i18next';

export default function VerticalTabs() {
    const { t } = useTranslation("pages")
    const theme = useTheme()
    const [value, setValue] = useState(0)
    const [adminPermList] = useGlobal('adminPermList')
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!adminPermList["add-manga"] && !adminPermList["update-manga"] && !adminPermList["delete-manga"] && !adminPermList["featured-manga"]) {
            setError(true)
        }
    }, [adminPermList])

    function handleChange(event, newValue) {
        setValue(newValue)
    }

    return (
        <>
            {error ? <Redirect to="/" /> : ""}
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="Yatay menüler"
                >
                    <Tab disabled={!adminPermList["add-manga"]} style={!adminPermList["add-manga"] ? { display: "none" } : null} label={t("common.index.create")} {...a11yProps(0)} />
                    <Tab disabled={!adminPermList["update-manga"]} style={!adminPermList["update-manga"] ? { display: "none" } : null} label={t("common.index.update")} {...a11yProps(1)} />
                    <Tab disabled={!adminPermList["delete-manga"]} style={!adminPermList["delete-manga"] ? { display: "none" } : null} label={t("common.index.delete")} {...a11yProps(2)} />
                    <Tab disabled={!adminPermList["featured-manga"]} style={!adminPermList["featured-manga"] ? { display: "none" } : null} label={t("common.index.feature")} {...a11yProps(3)} />
                </Tabs>
            </AppBar>

            {adminPermList["add-manga"] && value === 0 ?
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <MangaCreate />
                </TabPanel>
                : <></>}
            {adminPermList["update-manga"] && value === 1 ?
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <MangaUpdate />
                </TabPanel>
                : <></>}
            {adminPermList["delete-manga"] && value === 2 ?
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <MangaDelete />
                </TabPanel>
                : <></>}
            {adminPermList["featured-manga"] && value === 3 ?
                <TabPanel value={value} index={3} dir={theme.direction}>
                    <MangaFeatured />
                </TabPanel>
                : <></>}
        </>
    );
}