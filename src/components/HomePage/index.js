import {React} from "react";
import Header from "../Header";
import Heading from "../Heading";
import Display from "../display-card";
import items from "../ItemsTable/items";
import PaginationFooter from "../Pagination";
function Home()
{
    return(
        <div class="bg-light">
    <Header/>
    <Heading/>
    <Display/>
    <PaginationFooter totalItems={items.length} itemsOnPage={8} itemString={"Items Avaialable"}/>
    </div>);
}
export default Home;