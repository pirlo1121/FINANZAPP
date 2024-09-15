import Gasto from "../models/expends.model.js"
import Usuario from "../models/user.model.js";

export async function addExpends(req, res){
  const usuarioId = req.params.id;
  const  { descripcion, monto, tipo }  = req.body;
  try {
    const user = await Usuario.findById({_id: usuarioId});

    if (!user)  return res.status(404).json({ mensaje: 'Usuario no encontrado' }); 
    const newGasto = { usuarioId, descripcion, monto, tipo} 
    const gasto = await Gasto.create(newGasto)


    return res.status(200).json({ok: true, gasto})
    
  } catch (error) {
    console.log(error)
    throw new Error('hay un error mano')
    
  }
}


export async function expends(req, res) {
  try {
    const { tipo } = req.query;
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ error: 'ID de usuario no proporcionado' });
    }

    if (!tipo || !['fijos', 'esporadicos', 'todos'].includes(tipo)) {
        return res.status(400).json({ error: 'Tipo de gasto no válido' });
    }

    const filtro = { usuarioId: id };
    if (tipo !== 'todos') {
        filtro.tipo = tipo;
    }
    const gastos = await Gasto.find(filtro).select("monto tipo descripcion");

      // Validación de monto
      const sumaTotal = gastos.reduce((acc, item) => {
          if (typeof item.monto !== 'number' || isNaN(item.monto)) {
              return acc;
          }
          return acc + item.monto;
      }, 0);

      return res.json({ gastos, sumaTotal });

  } catch (err) {
      console.error(err); // Log del error para depuración
      res.status(500).send('Server Error');
  }
}


// export async function expendsMonth(req, res){
//     const {nombre} = req.params
//     try {
//       const user = await Finanzas.findOne({nombre});
//       if(!user) return res.send('usuario inexistente')
  
  
  
//       const totalgastos = user.gastosEsporadicos.reduce((acc, gasto) => acc + gasto.monto, 0)
//       console.log(`total gastoos: ${totalgastos}`)
  
//       res.json({ok: true, msg: 'papi vamo bien'})
  
//     } catch (error) {
//       console.error(error)
      
//     }
  
//   }