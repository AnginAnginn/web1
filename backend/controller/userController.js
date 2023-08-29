const User = require ("../models/userModel");
const bcrypt = require ("bcrypt")

// get all user
const getUser = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: err.message})
    }
};

// get user by ID
const getUserId = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: err.message})
    }
}

// create user
const createUser =  async (req, res) => {
    try {
      const { username, password, role } = req.body;
 
      // Periksa apakah username sudah digunakan sebelumnya
       const existingUser = await User.findOne({ username });
  
       // Jika username sudah ada, berikan respon error
       if (existingUser) {
         return res.status(400).json({ error: 'Username sudah digunakan' });
       }
  
       if(password.includes(' ')){
         return res.status(400).json({error: "tidak boleh spasi"})
       }

       // Hash password sebelum disimpan ke database
       const hashedPassword = await bcrypt.hash(password, 10);
  
       // Simpan user baru ke database
       const newUser = new User({
         username : username,
         password: hashedPassword,
         role : role
       });
  
       await newUser.save();
  
       // Jika register berhasil, Anda bisa mengirimkan data user apa saja yang ingin Anda kirimkan sebagai respon
       return res.status(201).json({ message: 'Register berhasil', newUser });
     } catch (error) {
       // Tangani kesalahan jika ada
       console.error('Error saat register:', error);
       return res.status(500).json({ error: 'Terjadi kesalahan saat register' });
     }
   };

// login user
const login = async (req, res) => {
    const { username, password, role } = req.body;

    try {
      // Cari user berdasarkan username
      const user = await User.findOne({ username });
 
      // Jika user tidak ditemukan, berikan respon error
      if (!user) {
        return res.status(404).json({ error: 'Username tidak ditemukan' });
      }
 
      // Periksa apakah password cocok dengan hash yang ada di database
      const isPasswordMatch = await bcrypt.compare(password, user.password);
 
      // Jika password tidak cocok, berikan respon error
      if (!isPasswordMatch) {
        return res.status(401).json({ error: 'Password salah' });
      }
      
      if (user) {
        return res.status(200).json({
          _id : user._id,
          username : user.username,
          role : user.role,
        });
      }
      // Jika login berhasil, Anda bisa mengirimkan data user apa saja yang ingin Anda kirimkan sebagai respon
      // res.json({
      //   _id : user._id,
      //   username : user.username,
      //   role : user.role,
      // })
    } catch (error) {
      // Tangani kesalahan jika ada
      console.error('Error saat login:', error);
      return res.status(500).json({ error: 'Terjadi kesalahan saat login' });
    }
  };

// update user
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({message: "user terupdate", user});
    } catch (error) {
        res.status(500).json({message: err.message});
    }
};  
  
// delete akun
const deleteUser = async (req,res) => {
    user = await User.findByIdAndDelete(req.params.id);
    res.json({message : "user terhapus", user})
};


module.exports = {getUser, getUserId, createUser, login, deleteUser, updateUser};