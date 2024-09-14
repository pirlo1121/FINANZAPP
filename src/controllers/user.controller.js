import Usuario from "../models/user.model.js";

export async function createUser(req, res) {
  const { nombre, email, salario, tope , ingresosExtras } = req.body;
  try {
    const newUser = new Usuario({nombre, email, salario, tope, ingresosExtras });
    await newUser.save();
    return res.json({ok: true, newUser});
  } catch (err) {
    res.status(500).send('Server Error');
  }
}

export async function getUser(req, res){
  const userId = req.params.id
  try {
    const user = await Usuario.findById({_id : userId})
    return res.json({ok: true, user})
  } catch (error) {
    console.log(error)
    return res.status(500).send('hubo un error')
  }

}

