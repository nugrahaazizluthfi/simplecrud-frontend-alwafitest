import React from "react";
import MyLayout from "../components/Layout";
import {
    Switch,
    Route
} from "react-router-dom";
import Home from "./home";
import Meals from "./meals";
import AddMeals from "./meals/add_meals";

const AlWafiTes = () => {
    return (
        <React.Fragment>
            <MyLayout>
                <Switch>
                    <Route path="/meals/add">
                        <AddMeals />
                    </Route>
                    <Route path="/meals">
                        <Meals />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </MyLayout>
        </React.Fragment>
    )
}

export default AlWafiTes;