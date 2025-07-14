import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import Contador from "./Contador";
//create your first component
const Home = () => {
	return (
		<div className="container">

			<Contador></Contador>
        
		</div>
	);
};

export default Home;