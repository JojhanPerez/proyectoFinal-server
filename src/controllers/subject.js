const Subject = require("../models/subject.model");

const addSubject = (req, res) => {
    const subject = new Subject(req.body);

    subject
        .save()
        .then((data) => {
            res.status(200).json({ message: "Asignatura añadida con exito" });
            console.log(data);
        })
        .catch((err) => {
            res.status(500).json({ message: "Error al crear la asignatura" });
            console.log(err);
        });
};

const getSubjects = (req, res) => {
    Subject.find()
        .then((subjects) => res.status(200).json(subjects))
        .catch((err) => {
            res.status(404).json({ message: "No se encontraron asignaturas" });
            console.log(err);
        });
};

const updateSubject = (req, res) => {
    const subjectData = req.body;
    const params = req.params;

    Subject.findByIdAndUpdate(
        { _id: params.id },
        subjectData,
        (err, subjectUpdate) => {
            err
                ? res.status(500).send({ message: "Error del servidor." })
                : !subjectUpdate
                    ? res.status(404).send({ message: "No se encontró la asignatura." })
                    : res
                        .status(200)
                        .send({ message: "Asignatura actualizada correctamente" });
        }
    );
};

const deleteSubject = (req, res) => {
    const { id } = req.params;
    Subject.findByIdAndDelete(id, (err, subjectDelete) => {
        err
            ? res.status(500).send({ message: "Error del servidor" })
            : !subjectDelete
                ? res.status(404).send({ message: "No se encontró la asignatura" })
                : res.status(200).send({ message: "Asignatura eliminada" });
    });
};

module.exports = {
    addSubject,
    getSubjects,
    updateSubject,
    deleteSubject,
};
