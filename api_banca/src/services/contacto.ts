import { ContactoModel } from "../models";
import { contactoValidation } from "../validations";

interface IRequestRegistrar {
  nombreCompleto: string;
  numeroCuenta: string;
  usuarioId: string,
}

export const ContactoService = {
  registrar: async (entidad: IRequestRegistrar) => {

    const { error } = contactoValidation.validacionRegistro.validate(entidad);
    if (error) {
      throw new Error(error.message);
    }

    const contactoNuevo = await ContactoModel.create({
      nombreCompleto: entidad.nombreCompleto,
      numeroCuenta: entidad.numeroCuenta,
      usuarioId: entidad.usuarioId,
    });
    return contactoNuevo;
  },

  listar: async (usuarioId: string) => {
    const contactos = await ContactoModel.find({ usuarioId });
    return contactos;
  },

  eliminar: async (usuarioId: string, contactoId: string) => {
    const contacto = await ContactoModel.findOne({
      usuarioId,
      _id: contactoId,
    });

    if (!contacto) {
      throw new Error("El contacto no existe!");
    }

    await ContactoModel.findByIdAndDelete(contactoId);
    return contacto;
  },
};
