// run with node toJSON
// from ./src/locales/toJSON 
// create an en.json with all files and folders under ./src/components/* listed in JSON format 

const srcFolder = "../components/";
const fs = require("fs");

const fsToJson = folder => {
	const fsObj = new Object();
	fs.readdirSync(folder).forEach(item => {
		// Format the file name to camelCase to save in the JSON tree
		let fixedItem = item;
		const charsToUppercase = [];
		for (let i = 0; i < item.length; i++) {
			if (item[i] === "-") {
				charsToUppercase.push(i + 1);
			}
		}
		for (let j = 0; j < charsToUppercase.length; j++) {
			fixedItem =
				fixedItem.slice(0, charsToUppercase[j]) +
				fixedItem.charAt(charsToUppercase[j]).toUpperCase() +
				item.slice(charsToUppercase[j]+1);
		}
		fixedItem = fixedItem.replace(/-/g, "");
		fixedItem = fixedItem.charAt(0).toLowerCase() + fixedItem.slice(1);

		// if isFolder else isFile
		if (fs.lstatSync(folder + item).isDirectory()) {
			const newFolder = folder + item + "/";
			fsObj[fixedItem] = fsToJson(newFolder);
		} else {
			fixedItem = fixedItem.slice(0, -4);
			fsObj[fixedItem] = {};
		}
	});
	return fsObj;
};

const obj = fsToJson(srcFolder);

fs.writeFile("en.json", JSON.stringify(obj), err => {
	JSON.stringify(obj);
});
