import { IconType } from "react-icons";
import { BsSnow } from "react-icons/bs";
import { FaSkiing } from "react-icons/fa";
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";

interface categoriesProps{
    id: number;
    label: string;
    icon: IconType;
    description: string;
}


export const categories: categoriesProps[] = [{
    id:1,
    label: "Beach",
    icon: TbBeach,
    description: "Enjoy the seaside view",
},
    {
    id:2,
    label: "Windmill",
    icon: GiWindmill,
    description: "Harnessing wind energy aesthetically",
    },
        {
    id:3,
    label: "Countryside",
    icon: TbMountain,
    description: "Explore the great peaks of the country",
},
    {
    id:4,
    label: "Modern",
    icon: MdOutlineVilla,
    description: "Modernized property for the people",
    },
        {
    id:5,
    label: "Pools",
    icon: TbPool,
    description: "Swim and relax at these luxurious pools",
    },
    {  
    id:6,
    label: "Islands",
    icon: GiIsland,
    description: "Taking you to the natural paradise",
    },
        {  
    id:7,
    label: "Camping",
    icon: GiForestCamp,
    description: "Be one with nature by taking some camping activities here",
    },
        {  
    id:8,
    label: "Ski",
    icon: FaSkiing,
    description: "Hit the slopes of the mountain like never before",
    },
    {
    id:9,
    label: "Castles",
    icon: GiCastle,
    description: "Throwback to medieval age with these famous citadels", 
    },
        {
    id:10,
    label: "Arctic",
    icon: BsSnow,
    description:"Watch the glamorous northern lights from these snowy fields",
    },
        {  
    id:11,
    label: "Lake",
    icon: GiBoatFishing,
    description:"Lost in the serenity of still waters",
    },        {  
    id:12,
    label: "Cave",
    icon: GiCaveEntrance,
    description:"Remarkable geological artifacts preserved through time",
    }, {  
    id:13,
    label: "Dessert",
    icon: GiCactus,
    description:"Explore the natural wonders of the wild wild West",
    },
    {  
    id:14,
    label: "Lux",
    icon: IoDiamond,
    description:"Get the best deals from an urban lifestyle",
    },
      {  
    id:15,
    label: "Barns",
    icon: GiBarn,
    description:"Harvesting happiness, one crop at a time",
    },  


]