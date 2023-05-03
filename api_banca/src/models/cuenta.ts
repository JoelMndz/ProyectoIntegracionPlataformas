import {Schema, model} from 'mongoose';

const cuentaSchema = new Schema({
  numero: String,
  titular: String,
  usuarioId:{
    type: Schema.Types.ObjectId
  },
  tipo:{
    type: String,
    enum: ['ahorro','corriente'],
    default: 'ahorro',
  },
  saldo:{
    type: Number,
    default: 0
  },
  movimientos:[{
    numero: String,
    monto: Number,
    tipo:{
      type: String,
      enum:['deposito','retiro','transferencia']
    },
    fecha: Date,
    nombreBeneficiario: String,
    cuentaBeneficiario: String,
    saldoDisponible: Number
  }],
  activa:{
    type: Boolean,
    default: true
  },
  fechaCreacion:{
    type: Date,
    default: Date.now()
  },
});

export const CuentaModel = model('cuentas',cuentaSchema);