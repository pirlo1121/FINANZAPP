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
    
  } catch (err) {
    console.log(error)
    res.status(500).send('Server Error');
  }
}

export async function getExpends(req, res) {
  try {
    const { tipo } = req.query;
    const id = req.params.id;

    if (!id) return res.status(400).json({ error: 'ID de usuario no proporcionado' });

    if (!tipo || !['fijos', 'esporadicos', 'todos'].includes(tipo)) {
        return res.status(400).json({ error: 'Tipo de gasto no válido' });
    }

    const filtro = { usuarioId: id };
    if (tipo !== 'todos') {
        filtro.tipo = tipo;
    }
    const gastos = await Gasto.find(filtro).select("monto tipo descripcion");
    const user = await Usuario.findById({_id: id}).select("nombre salario tope")

      // Validación de monto
      const sumaTotal = gastos.reduce((acc, item) => {
          if (typeof item.monto !== 'number' || isNaN(item.monto)) {
              return acc;
          }
          return acc + item.monto;
      }, 0);
      let msg = 'aun no superas tu tope mensual'
      if( sumaTotal > user.tope) msg = 'superaste tu tope mensual de gastos' ;
      
      const total = user.salario - sumaTotal;
 
      return res.json({ gastos, sumaTotal, total, msg });

  } catch (err) {
      console.error(err); // Log del error para depuración
      res.status(500).send('Server Error');
  }
}

export async function updateExpend(req, res){
  const id = req.params.id;
  const data = req.body;

  try {
    const expend = await Gasto.findById({_id: id})

    expend.descripcion = data.descripcion || expend.descripcion
    expend.monto = data.monto || expend.monto
    expend.tipo = data.tipo || expend.tipo

    expend.save()
    res.status(200).json({ok: true, expend})

  } catch (err) {
    res.status(500).send('Server Error');
  }

}

export async function deleteExpend(req,res) {
  const id = req.params.id;
  try {
    if(!id) return res.json({ok: false, msg: 'error al obtener id'})
    const expend = await Gasto.findByIdAndDelete({_id:id});

    return res.status(200).json({ok: true, expend})

  } catch (error) {
    console.log(error);
    res.send('server error')
  }
  
}