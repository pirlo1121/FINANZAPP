import Finanzas from "../models/user.model.js";

export async function addUser(req, res) {
  const { nombre, salario, tope , ingresosExtras, gastosFijos, gastosEsporadicos } = req.body;
  try {
    const nuevaFinanza = new Finanzas({
      nombre,
      salario,
      tope,
      ingresosExtras,
      gastosFijos,
      gastosEsporadicos
    });
    await nuevaFinanza.save();
    res.json(nuevaFinanza);
  } catch (err) {
    res.status(500).send('Server Error');
  }
}

export async function addexpends(req, res){
  const { nombre } = req.params;
  const  newgasto  = req.body;
  try {
    const user = await Finanzas.findOne({ nombre });
    if (!user)  return res.status(404).json({ mensaje: 'Usuario no encontrado' }); 

    const total = user.gastosEsporadicos.reduce((acc, gasto) => acc + gasto.monto, 0) ?? 0;
    const gastosFijos = user.gastosFijos.reduce((acc, gasto) => acc + gasto.monto, 0) ?? 0;
    const totalIngresos = user.salario + user.ingresosExtras.reduce((acc, value )=> acc+ value, 0);
    const totalGastos = total + newgasto.monto + gastosFijos;

    if(totalGastos > totalIngresos) return res.json({msg: 'has superado el limite en gastos de tu salario'})
    
    user.gastosEsporadicos.push(newgasto) 
    user.save()
    res.json({ok: true, user})
    
  } catch (error) {
    console.log(error)
    throw new Error('hay un error mano')
    
  }
}

export async function getFinanzas(req, res) {
  const { nombre } = req.params;
  try {
    const finanza = await Finanzas.findOne({ nombre });
    if (!finanza) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const totalGastosFijos = finanza.gastosFijos.reduce((acc, gasto) => acc + gasto.monto, 0) ?? 0;
    const totalGastosEsporadicos = finanza.gastosEsporadicos.reduce((acc, gasto) => acc + gasto.monto, 0) ?? 0;
    const totalGastos = totalGastosFijos + totalGastosEsporadicos;
    const extra = finanza.ingresosExtras.reduce((acc, value )=> acc+ value, 0);
    const totalDisponible = (finanza.salario + extra) - totalGastos;
    let mensaje = 'aun no superas el tope en gastos';
    if(totalGastos>= finanza.tope){ mensaje = 'has superado el tope de tus ingresos'}
    res.json({
      nombre: finanza.nombre,
      totalGastos,
      totalDisponible,
      mensaje
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
}

export async function expendsMonth(req, res){
  const {nombre} = req.params
  try {
    const user = await Finanzas.findOne({nombre});
    if(!user) return res.send('usuario inexistente')



    const totalgastos = user.gastosEsporadicos.reduce((acc, gasto) => acc + gasto.monto, 0)
    console.log(`total gastoos: ${totalgastos}`)

    res.json({ok: true, msg: 'papi vamo bien'})



    
  } catch (error) {
    console.error(error)
    
  }

}