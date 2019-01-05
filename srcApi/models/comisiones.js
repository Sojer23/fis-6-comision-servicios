/**
 * Define el schema del modelo comision de la API.
 */
var mongoose = require('mongoose');

var comisionSchema = new mongoose.Schema({
    investigadorID: String,
    destino: String,
    fechaInicio: Date,
    fechaFin: Date,
    sustitutoID: String,
    razon: String,
    coste: Number,
    proyectoID: String,
    estado: String
});

comisionSchema.methods.cleanup = function() {
    return {investigadorID : this.investigadorID,
        destino : this.destino,
        fechaInicio: this.fechaInicio,
        fechaFin: this.fechaFin,
        sustitutoID: this.sustitutoID,
        razon: this.razon,
        coste: this.coste,
        proyectoID: this.proyectoID,
        estado: this.estado};
}

var Comision = mongoose.model('Comision', comisionSchema);

module.exports.mongoose = mongoose;
module.exports.Comision = Comision;