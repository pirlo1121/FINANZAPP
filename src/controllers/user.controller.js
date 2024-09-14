import Usuario from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { generateToken } from "../helpers/token.js";

export async function createUser(req, res) {
  const { nombre, email, password, salario, tope , ingresosExtras } = req.body;
  try {
    const newUser = new Usuario({nombre, email, password, salario, tope, ingresosExtras });
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
export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await Usuario.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ ok: false, message: 'Contraseña incorrecta' });
    }
    const data = user.toObject()
    delete data.password
    // console.log(data)

    const payload = {...data}

    const token = generateToken(payload);

    return res.json({ ok: true, token });
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'Error en el servidor' });
  }
}