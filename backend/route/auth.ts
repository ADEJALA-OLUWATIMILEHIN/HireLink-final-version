import express ,{Request, Response}from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



const router = express.Router();

router.post("/register",async(req:Request,res:Response)=>{
    const {email,password,name,role,company_name,} = req.body;

    // Registration logic goes here
    if(!email || !password || !role  || !name || (role === "employer" && !company_name)){
        return res.status(400).json({
            message: "All fields are required"
        })
    }
    try{
        // const existingUser = await User.findOne({where: {email}});
        // if(existingUser){
        //   return res.status(400).json({
        //     message: "User with this email already exists"
        //   })
        // }
      
         const  hashedPassword = await bcrypt.hash(password, 10);
          const newUser = await User.create({
            email,
            password: hashedPassword,
            name,
            role,
            company_name: role === "employer" ? company_name : null
        });
      
        const editedResponse ={
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
        }
      
        return res.status(201).json({
          message: "User registered successfully",
          user: editedResponse
        })
      }catch(error){
        return res.status(500).json({
          message: "Internal server error",
          error: error
        })
      }
      });



router.post("/login",async(req:Request,res:Response)=>{
    const {email, password,role} = req.body;

    // Login logic goes here
    if(!email || !password || !role){
        return res.status(400).json({
            message: "Email and password are required"
        })
    }
   
    try{
        const user = await User.findOne({where: {email, role}});
        if(!user){
          return res.status(400).json({
            message: "Invalid email or role"
          })
        }
      
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
          return res.status(400).json({
            message: "Invalid email or password"
          })
        }
      
        const token = jwt.sign(
          {id: user.id, email: user.email, role: user.role},
          process.env.jwt_secret as string,
          {expiresIn: "1h"}
        );
      
        return res.status(200).json({
          message: "Login successful",
          token: token
        })
      }catch(error){
        console.log(error);
        return res.status(500).json({
          message: "Internal server error",
          error: error
        })
      }
});    


  router.put("/:id/reset-password", async(req: Request, res: Response) => {
      const{password} = req.body;
      const{id} = req.params;
      if(!password){
        return res.status(400).json({
          message: "Password is required"
        })
      }
      try{
    const hashedPassword  = await bcrypt.hash(password, 10);
    const user = await User.findByPk(id);
   if(!user){
        return res.status(404).json({
          message: "User not found"
        });
      }
      user.password = hashedPassword;
       await user.save();  
       return res.status(200).json({
        message: "Password reset successful"
      });
    } catch(error){
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
        error: error
      })
    }
});
       // either these
// router.post("/login", async (req: Request, res: Response) => {
//   const {email, password} = req.body;
  
//   if (!email || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//       }
      
//       const user = await User.findOne({ where: { email } })
  
//       if (!user) {
//         return res.status(400).json({ message: "User does not exist" });
//       }
  
//       const isPasswordValid = await bcrypt.compare(password, user.password);
  
//       if (!isPasswordValid) {
//         return res.status(400).json({ message: "Invalid password" });
//       }
  
//       const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
//         expiresIn:  "1d",
//       });
  
//       res.status(200).json({ user: {
//         id: user.id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//       }, token });
//   })

export default router;