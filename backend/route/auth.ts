import express ,{Request, Response}from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";



const router = express.Router();
/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with email, password, name, role and company name (if employer)
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/RegisterRequest"
 *           example:
 *             email: obasanyagala@gmail.com
 *             password: obasanya234
 *             name: Emminent Obasanya
 *             role: employer
 *             company_name: Microsoft
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/user"
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

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

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a user
 *     description: Login a user with email, password and role
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 example: employer
 *           example:
 *             email: obasanyagala@gmail.com
 *             password: obasanya234
 *             role: employer
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/user"
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

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

  /**
 * @swagger
 * /api/v1/auth/{id}/reset-password:
 *   put:
 *     summary: Reset user password
 *     description: Reset a user's password using user ID
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 example: newPassword123
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */


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