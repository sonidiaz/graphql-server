
import mongoose from 'mongoose';
import { Clientes } from './db.js'
import { rejects } from 'assert';

export const resolvers = {
    Query:{
      getClientes: (root, {limite}) => {
        return Clientes.find({}).limit(limite);
      },
      getCliente: (root, {id}) => {
        return new Promise((resolve, objetc) => {
          Clientes.findById(id, (error, cliente)  => {
            if(error) rejects(error)
            else resolve(cliente);
          })
        })
      }
    },
    Mutation:{
      crearCliente: (root, {input}) => {
        const nuevoCliente = new Clientes({
            id : input.id,
            nombre : input.nombre,
            apellido : input.apellido,
            empresa : input.empresa,
            emails : input.emails,
            edad : input.edad,
            tipo : input.tipo,
            pedidos : input.pedidos
        });
        nuevoCliente.id = nuevoCliente._id;

        return new Promise((resolve, reject) => {
          nuevoCliente.save(error => {
            if(error) rejects(error);
            else resolve(nuevoCliente);
          })
        });
      },
      actualizarCliente: (root, {input}) => {
        return new Promise((resolve, reject) => {
          Clientes.findOneAndUpdate({_id: input.id }, input , {new:true}, (error, cliente) => {
            if(error) reject(error)
            else resolve(cliente)
          })
        })
      },
      eliminarCliente: (root, {id}) => {  
        return new Promise((resolve, reject) => {
          Clientes.findOneAndRemove({_id: id}, (error) => {
            if(error) rejects(error)
            else resolve('Se elimino correctamente el cliente.')
          })
        })
      }
    }
}
