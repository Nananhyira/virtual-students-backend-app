const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const studentModel = require("./studentModel");
const server = express();

// controllers
const handlePostRequest = (req, res) => {
	const { name, age, gen, email } = req.body;
	const newStudent = new studentModel({ name, age, gen, email });
	newStudent
		.save()
		.then((student) => {
			res.send({ message: "new student saved successfully", data: newStudent });
		})
		.catch((err) => {
			console.log(err);
		});
};
const handleGetRequest = (req, res) => {
	studentModel
		.find()
		.then((student) => {
			res.json({ message: "these are all the students ", data: student });
		})
		.catch((err) => {
			console.log(err);
		});
};
const handlePutRequest = (req, res) => {
	const { id, name, gen, age, email } = req.body;
	studentModel
		.findById(id)
		.then((student) => {
			if (student) {
				student.name = name;
				student.email = email;
				student.age = age;
				student.gen = gen;
				student.save();
				res.json({message:"student  details updated succesfully", data:student});
			}
			res.json("student  details does not exist");
		})
		.catch((err) => {
			console.log(err);
		});
};
const handleDeleteRequest = (req, res) => {
	const { id } = req.body;
	studentModel
		.findByIdAndRemove(id)
		.then((deleted) => {
			if (deleted) {
				res.json("student removed succesfully");
			} else {
				res.json("student  doesn't exist");
			}
		})

		.catch((err) => {
			console.log(err);
		});
};

// middleware
server.use(bodyParser.json());
// routes
server.post("/student", handlePostRequest);
server.get("/students", handleGetRequest);
server.delete("/student", handleDeleteRequest);
server.put("/student", handlePutRequest);

mongoose.set("strictQuery", false);
mongoose
	.connect(
		"mongodb+srv://irene:GGAvJej7EFsfZL3R@cluster0.qtpcln3.mongodb.net/gen22?retryWrites=true&w=majority"
	)
	.then(() => {
		server.listen(3000, () => {
			console.log("server is listening on port 5000");
		});
	})
	.catch((error) => {
		console.log(error);
	});
