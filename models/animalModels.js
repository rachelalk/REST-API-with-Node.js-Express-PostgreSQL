// - import query from index.js
// - import and export the function into models and into Router.
// - create async functions to handle each CRUD request.
// - checked to see if anything needs to be handled by function we are creating
// - ascertain what can be handled by function in models instead of router
// - call function within 'Payload:' in router. NB. remember to 'await' function.
// - Remember to return result inside your functions.
// -

import { query } from "../db/index.js";

export async function getAnimalById(id) {
	const result = await query(`SELECT * FROM animals WHERE id = ${id};`);
	return result.rows;
}

export async function getAnimalByName(name) {
	const result = await query(
		`SELECT * FROM animals WHERE animal_name LIKE '%${name.toLowerCase()}%';`
	);
	return result.rows;
}

export async function getAllAnimals() {
	const result = await query(`SELECT * FROM animals;`);
	return result.rows;
}

export async function createNewAnimal(body) {
	await query(
		`INSERT INTO animals (animal_name, conservation_status, approx_population, region, weight, image) VALUES ($1, $2, $3, $4, $5, $6)`,
		[
			body.animal_name,
			body.conservation_status,
			body.approx_population,
			body.region,
			body.weight,
			body.image,
		]
	);
	const result = await query(`SELECT * FROM animals;`);
	return result.rows;
}

export async function deleteAnimalByID(id) {
	await query(`DELETE FROM animals WHERE id = ${id};`);
	const result = await query(`SELECT * FROM animals;`);
	return result.rows;
}

export async function getAnimalByConservationStatus(conservationStatus) {
	const result = await query(
		`SELECT * FROM animals WHERE conservation_status = '${conservationStatus.toLowerCase()}';`
	);
	return result.rows;
}
