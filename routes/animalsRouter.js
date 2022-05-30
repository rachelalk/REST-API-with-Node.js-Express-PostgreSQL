// Must use a REST API server with routes to manage requests and serve responses
//     -get
//         -SELECT * FROM animals;
//     -get with id
//         -SELECT id FROM animals
//         WHERE id= params.id;
//     -get by animal_name
//         -SELECT animal_name
//         FROM animals;
//     -push
//     -put
//     -delete

//Import pool
import express from "express";
const animalsRouter = express.Router();

import {
	getAnimalById,
	getAnimalByName,
	getAllAnimals,
	createNewAnimal,
	deleteAnimalByID,
	getAnimalByConservationStatus,
} from "../models/animalModels.js";

//Select all from animals

// animalsRouter.get("/", async function (req, res) {
// 	const result = await query(`SELECT * FROM animals;`);
// 	const responseObject = {
// 		success: true,
// 		message: "Displaying all animals data",
// 		payload: result.rows,
// 	};
// 	res.json(responseObject);
// });

//search by animal id
animalsRouter.get("/:id", async function (req, res) {
	const id = req.params.id;

	const responseObject = {
		success: true,
		message: `Displaying animal with id ${id}`,
		payload: await getAnimalById(id),
	};
	res.json(responseObject);
});

//search animal by animal_name if no name display all
animalsRouter.get("/", async function (req, res) {
	const name = req.query.name;
	const conservationStatus = req.query.status;
	if (name) {
		const responseObject = {
			success: true,
			message: `Displaying ${name}`,
			payload: await getAnimalByName(name),
		};
		res.json(responseObject);
	}
	if (conservationStatus) {
		const responseObject = {
			success: true,
			message: `Displaying animals with conservation status: ${conservationStatus}`,
			payload: await getAnimalByConservationStatus(conservationStatus),
		};
		res.json(responseObject);
	} else {
		const responseObject = {
			success: true,
			message: "Displaying all animals data",
			payload: await getAllAnimals(),
		};
		res.json(responseObject);
	}
});

//add new animal
animalsRouter.post("/", async function (req, res) {
	console.log(req.body);
	const body = req.body;

	const responseObject = {
		success: true,
		message: "Create new animal data",
		payload: await createNewAnimal(body),
	};
	res.json(responseObject);
});

//delete by ID
animalsRouter.delete("/:id", async function (req, res) {
	const id = req.params.id;
	const responseObject = {
		success: true,
		message: `Deleted animal with id ${id}. Displaying remaining data.`,
		payload: await deleteAnimalByID(id),
	};
	res.json(responseObject);
});

//Check that we are communicating with the server
// await pool.connect();
// const result = await pool.query("SELECT NOW()");
// console.log(result.rows);
// await pool.end();

export default animalsRouter;
